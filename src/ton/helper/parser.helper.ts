import { Validator, ValidatorsInfo } from '../../validator/entity';
import { Cell } from 'ton';

export const bytesToCell = (bytes: string): Cell => {
  const buf = Buffer.from(bytes, 'base64');
  return Cell.fromBoc(buf)[0];
};

export const parseValidators = (configCell: Cell): ValidatorsInfo => {
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
    const weight = s.readUint(64);
    // address or not by tag
    const address = tag == 0x73 ? s.readBitString(256) : null;
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
};
