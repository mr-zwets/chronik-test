import type { Network, NetworkProvider, Utxo } from './interfaces';
import { ChronikClientNode } from 'chronik-client-cashtokens';

const chronikUrls = ["https://bch.paybutton.org"]

// TODO: check if this function actually works
export function getNftCapabilityName(capabilities: number): 'none' | 'mutable' | 'minting' {
  const capabilityBits = capabilities & 0x0f;

  switch (capabilityBits) {
    case 0x00:
      return 'none';
    case 0x01:
      return 'mutable';
    case 0x02:
      return 'minting';
    default:
      throw new Error(`Unsupported NFT capability bitflag: ${capabilityBits}`);
  }
}

export class ChronikNetworkProvider implements NetworkProvider {
  // TODO: accept chronikUrl as a constructor parameter
  constructor(
    public network: Network,
    private chronik = new ChronikClientNode(chronikUrls)
    
  ) {}

  async getUtxos(address: string): Promise<Utxo[]> {
    const { utxos } = await this.chronik.address(address).utxos();
    return utxos.map((utxo) => ({
      txid: utxo.outpoint.txid,
      vout: utxo.outpoint.outIdx,
      satoshis: BigInt(utxo.value),
      token: utxo.token ? {
        amount: BigInt(utxo.token.amount),
        category: utxo.token.tokenId,
        nft: (utxo.token.capabilities != undefined || utxo.token.commitment != undefined) ? {
          capability: getNftCapabilityName(utxo.token.capabilities),
          commitment: utxo.token.commitment,
        } : undefined,
      } : undefined,
    }))
  }

  async getBlockHeight(): Promise<number> {
    const { tipHeight } = await this.chronik.blockchainInfo();
    return tipHeight;
  }

  async getRawTransaction(txid: string): Promise<string> {
    const { rawTx } = await this.chronik.rawTx(txid);
    return rawTx;
  }

  async sendRawTransaction(txHex: string): Promise<string> {
    const { txid } =  await this.chronik.broadcastTx(txHex);
    return txid
  }
}