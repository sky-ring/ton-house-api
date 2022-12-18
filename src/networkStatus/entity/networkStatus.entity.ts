export class NetworkStatus {
  blockHeight: number;

  blockTime: number;

  /**
   * Transactions Per Second
   */
  tps: number;

  blocksCount: number;

  constructor(data: Partial<NetworkStatus>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
