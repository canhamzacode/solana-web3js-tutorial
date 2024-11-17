import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey('my_address');

const balance  = await connection.getBalance(address);
const solBalance = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the address ${address.toBase58()} is ${solBalance}`);