import dotenv from 'dotenv';
dotenv.config();
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

const keyPair = process.env.KEYPAIR || null;
console.log(`The keypair is: ${keyPair}`);

if (keyPair === null) {
  console.log('No keypair found in the environment variables');
  process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet"));
const senderAddress = getKeypairFromEnvironment(keyPair);
const receiverAddress = new PublicKey('receiver_address');


const amount = 1.5;
const transactionInstuction = SystemProgram.transfer({
  fromPubkey: senderAddress.publicKey,
  toPubkey: receiverAddress,
  lamports: amount * LAMPORTS_PER_SOL,
})

const transaction = new Transaction().add(transactionInstuction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderAddress]);

console.log(`The transaction was successful with signature: ${signature}`);

// const balance  = await connection.getBalance(address.publicKey);
// const solBalance = balance / LAMPORTS_PER_SOL;
// connection.sendTransaction()


// console.log(`The balance of the address ${address.toBase58()} is ${solBalance}`);