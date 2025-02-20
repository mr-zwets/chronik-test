// chronik indexer docs at https://docs.chronik.xyz/
import { ChronikClientNode } from 'chronik-client-cashtokens';

const chronikUrls = ["https://chronik.pay2stay.com/bch"]
const chronik = new ChronikClientNode(chronikUrls);

console.log('\nchronik.tx(txid)')
const txid = "7340905f484ef2f59a5b96b64e15efe2a040126b671851f18c0817b9ceee440d"
const txDetails = await chronik.tx(txid);
console.log(JSON.stringify(txDetails, undefined, 2))

console.log('\nchronik.tokenId(tokenId).history')
const furuTokenId = "d9ab24ed15a7846cc3d9e004aa5cb976860f13dac1ead05784ee4f4622af96ea"
const furuTokenHistory = await chronik.tokenId(furuTokenId).history()
console.log('tokenHistory numTxs:' + furuTokenHistory.numTxs)
