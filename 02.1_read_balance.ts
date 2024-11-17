import dotenv from 'dotenv';
dotenv.config();
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const keyPair = process.env.KEYPAIR || null;
console.log(`The keypair is: ${keyPair}`);

if (keyPair === null) {
  console.log('No keypair found in the environment variables');
  process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet"));
const address = getKeypairFromEnvironment(keyPair);

const balance  = await connection.getBalance(address.publicKey);
const solBalance = balance / LAMPORTS_PER_SOL;


console.log(`The balance of the address ${address.toBase58()} is ${solBalance}`);