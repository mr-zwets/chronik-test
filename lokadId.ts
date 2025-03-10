// chronik indexer docs at https://docs.chronik.xyz/
import { ChronikClientNode } from 'chronik-client-cashtokens';

const chronikUrls = ["https://bch.paybutton.org"]
const chronik = new ChronikClientNode(chronikUrls);

const utf8ToHex = (str:string) => Buffer.from(str, 'utf8').toString('hex');
const to4byteHex = (str:string) => str + "0".repeat(8 - str.length)

const lokadIdToFetch = "IPBC"
const lokadIdHex = to4byteHex(utf8ToHex(lokadIdToFetch))
console.log(lokadIdHex)

const lokadIdObj = chronik.lokadId(lokadIdHex)
console.log(await lokadIdObj.history())