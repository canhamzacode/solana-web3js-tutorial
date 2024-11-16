import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`Public key: ${keypair.publicKey.toBase58()}`);
console.log(`Private key: ${keypair.secretKey.toString()}`); 
console.log(`This is the keypair: ${keypair}`);
//  The  Keypair  class is used to generate a new keypair. The  generate()  method creates a new keypair and returns it. The keypair has two properties:  publicKey  and  secretKey . The  publicKey  property is the public key of the keypair, and the  secretKey  property is the private key. 
//  The  toBase58()  method is used to convert the public key to a base58 string. The  toString()  method is used to convert the private key to a string. 
//  The output of the above code will be: 
//  Public key: