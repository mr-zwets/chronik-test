// copied types for CashScript which are needed for the NetworkProvider interface
const literal = <L extends string>(l: L): L => l;
export const Network = {
  MAINNET: literal('mainnet'),
  TESTNET3: literal('testnet3'),
  TESTNET4: literal('testnet4'),
  CHIPNET: literal('chipnet'),
  MOCKNET: literal('mocknet'),
  REGTEST: literal('regtest'),
};

export type Network = (typeof Network)[keyof typeof Network];

export interface Utxo {
  txid: string;
  vout: number;
  satoshis: bigint;
  token?: TokenDetails;
}

export interface TokenDetails {
  amount: bigint;
  category: string;
  nft?: {
    capability: 'none' | 'mutable' | 'minting';
    commitment: string;
  };
}

export interface NetworkProvider {
  network: Network;
  getUtxos(address: string): Promise<Utxo[]>;
  getBlockHeight(): Promise<number>;
  getRawTransaction(txid: string): Promise<string>;
  sendRawTransaction(txHex: string): Promise<string>;
}
