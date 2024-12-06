import dotenv from "dotenv";
dotenv.config();
import { clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const keyPair = process.env.PRIVATE_KEY;

if (!keyPair) {
    console.log("Private Key not found");
    process.exit(1);
}

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const connection = new Connection(clusterApiUrl("devnet"));
const OWNER = getKeypairFromEnvironment("PRIVATE_KEY");
const tokenAccount = new PublicKey("G38XGmnYfW23uMSBzpeNSvKBnoZ4NfhEN3hkFy7JtNLL");

const recepientAccount = new PublicKey("23wRQUTNurqBjnRYpwiSGKaUUAZTzi5so5mmhTgaJbWf")

// associated token account
const ata = await getOrCreateAssociatedTokenAccount(connection, OWNER, tokenAccount, recepientAccount);


console.log(`Associated Token Account: ${ata.address.toBase58()}`);

const link = getExplorerLink("address", ata.address.toBase58(), "devnet");

console.log(`View ATA on Solana Explorer: ${link}`);