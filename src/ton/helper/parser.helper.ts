import { Validator, ValidatorsInfo } from '../../validator/entity';
import { bnToAddress, Cell } from 'ton';

export class TonParser {
  private static tonParser: TonParser;

  private toHexArray = [];
  private toByteMap = {};

  private constructor() {
    // creating look up tables
    for (let ord = 0; ord <= 0xff; ord++) {
      let s = ord.toString(16);
      if (s.length < 2) {
        s = '0' + s;
      }
      this.toHexArray.push(s);
      this.toByteMap[s] = ord;
    }
  }

  public static getInstance(): TonParser {
    if (!TonParser.tonParser) {
      TonParser.tonParser = new TonParser();
    }
    return TonParser.tonParser;
  }

  private hexToBytes(s: string) {
    s = s.toLowerCase();
    const length2 = s.length;
    if (length2 % 2 !== 0) {
      throw new Error('hex string must have length a multiple of 2');
    }
    const length = length2 / 2;
    const result = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      const i2 = i * 2;
      const b = s.substring(i2, i2 + 2);
      if (!this.toByteMap.hasOwnProperty(b))
        throw new Error('invalid hex character ' + b);
      result[i] = this.toByteMap[b];
    }
    return result;
  }

  private crc16(data: Int8Array): ArrayLike<number> {
    const poly = 0x1021;
    let reg = 0;
    const message = new Uint8Array(data.length + 2);
    message.set(data);
    for (const byte of message) {
      let mask = 0x80;
      while (mask > 0) {
        reg <<= 1;
        if (byte & mask) {
          reg += 1;
        }
        mask >>= 1;
        if (reg > 0xffff) {
          reg &= 0xffff;
          reg ^= poly;
        }
      }
    }
    return new Uint8Array([Math.floor(reg / 256), reg % 256]);
  }

  private stringToBase64(s: string) {
    return Buffer.from(s, 'binary').toString('base64');
  }

  parseNullAdress(address: string): string {
    const addr = new Int8Array(34);

    const bounceable_tag = 0x11;
    addr[0] = bounceable_tag;

    const arr = address.split(':');
    if (arr.length !== 2) throw new Error('Invalid address ' + address);

    const wc = parseInt(arr[0]);
    addr[1] = wc;

    if (wc !== 0 && wc !== -1) throw new Error('Invalid address wc ' + address);

    const hex = arr[1];

    if (hex.length !== 64) throw new Error('Invalid address hex ' + address);

    const hashPart = this.hexToBytes(hex);
    addr.set(hashPart, 2);

    const addressWithChecksum = new Uint8Array(36);
    addressWithChecksum.set(addr);
    addressWithChecksum.set(this.crc16(addr), 34);
    let addressBase64 = this.stringToBase64(
      String.fromCharCode.apply(null, new Uint8Array(addressWithChecksum)),
    );
    addressBase64 = addressBase64.replace(/\+/g, '-').replace(/\//g, '_');

    return addressBase64;
  }

  static bytesToCell(bytes: string): Cell {
    const buf = Buffer.from(bytes, 'base64');
    return Cell.fromBoc(buf)[0];
  }

  static parseValidators(configCell: Cell): ValidatorsInfo {
    const s1 = configCell.beginParse();
    let tag = s1.readUint(8);
    const utimeSince = s1.readUint(32).toNumber();
    const utimeUntill = s1.readUint(32).toNumber();
    const total = s1.readUint(16).toNumber();
    const main = s1.readUint(16).toNumber();
    const totalWeight = s1.readUint(64).toString();

    const readFunc = tag == 0x12 ? s1.readOptDict : s1.readDict;

    const list = readFunc(16, (s) => {
      tag = s.readUint(8);
      s.readUint(32); // pubkey prefix 8e81278a
      const publicKey = s.readUint(256);
      const weight = s.readUint(64).toString();
      // address or not by tag
      const address = tag == 0x73 ? s.readUint(256).toString(16) : null;
      return { address, publicKey, weight };
    });

    const validators: Validator[] = Array.from(list?.values() ?? []).map(
      (validator) =>
        new Validator({
          address: validator.address?.toString() ?? 'NA',
          publicKey: validator.publicKey.toString(),
          weight: validator.weight.toString(),
        }),
    );

    const info = new ValidatorsInfo({
      main: main,
      total: total,
      totalWeight: totalWeight,
      timeSince: utimeSince,
      timeUntill: utimeUntill,
      validators,
    });

    return info;
  }
}
