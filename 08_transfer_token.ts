import dotenv from "dotenv";
dotenv.config();
import { clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const keyPair = process.env.PRIVATE_KEY;

if (!keyPair) {
    console.log("Private Key not found");
    process.exit(1);
}


const connection = new Connection(clusterApiUrl("devnet"));
const OWNER = getKeypairFromEnvironment("PRIVATE_KEY");
const tokenAccount = new PublicKey("G38XGmnYfW23uMSBzpeNSvKBnoZ4NfhEN3hkFy7JtNLL");

const recepientAccount = new PublicKey("23wRQUTNurqBjnRYpwiSGKaUUAZTzi5so5mmhTgaJbWf");

const MINOR_UNITS_PER_MINOR_UNIT = Math.pow(10, 2);

const amount = 5;

console.log(`Sending ${amount} to ${recepientAccount}...`);

const sourceAta = await getOrCreateAssociatedTokenAccount(
    connection,
    OWNER,
    tokenAccount,
    OWNER.publicKey
);

// console.log(sourceAta.address);
// transfer must be from ata to ata

const recepientAta = await getOrCreateAssociatedTokenAccount(
    connection,
    OWNER,
    tokenAccount,
    recepientAccount
);

// console.log(recepientAta.address)

const signature = await transfer(
    connection,
    OWNER,
    sourceAta.address,
    recepientAta.address,
    OWNER,
    amount * MINOR_UNITS_PER_MINOR_UNIT
)

const link = getExplorerLink("transaction", signature.toString(), "devnet");

console.log(`Sucessful ${link}`)


// there are a few things to consider while doing this, 
/**
 * Both must be an ata if one of them isn't there will be an error
 * if the above is checked, you must be sure that the place you are transfering from has token. if it doesnt you can mint it 
 */