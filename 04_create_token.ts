import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const keyPair = process.env.KEYPAIR || null;

if (keyPair === null) {
  console.log("No keypair found in the environment variables");
  process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet"));
const OWNER = getKeypairFromEnvironment("KEYPAIR");


const token = await createMint(
    connection,
    OWNER,
    OWNER.publicKey,
    null,
    2
);

const link = getExplorerLink("address", token.toString(), "devnet");
console.log(`The token was created with address: ${token.toBase58()}`);
console.log(`You can view the transaction at: ${link}`);