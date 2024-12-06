import dotenv from "dotenv";
dotenv.config();
import { clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { mintTo } from "@solana/spl-token";

const keyPair = process.env.PRIVATE_KEY;

if (!keyPair) {
    console.log("Private Key not found");
    process.exit(1);
}

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const connection = new Connection(clusterApiUrl("devnet"));
const OWNER = getKeypairFromEnvironment("PRIVATE_KEY");
const tokenAccount = new PublicKey("G38XGmnYfW23uMSBzpeNSvKBnoZ4NfhEN3hkFy7JtNLL");

const recepientAta = new PublicKey("Hx5i3anfuQMMvXPdWVzjZzC1zB7hE5AWuBZE7H58ksne")

const MINOR_UNITS_PER_MINOR_UNIT = Math.pow(10, 2);

const signature = await mintTo(connection, OWNER, tokenAccount, recepientAta, OWNER,20 * MINOR_UNITS_PER_MINOR_UNIT);

const link = getExplorerLink("transaction", signature.toString(),"devnet");
console.log(`Sucessful ${link}`)
