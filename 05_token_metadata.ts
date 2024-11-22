import { 
  createCreateMetadataAccountV3Instruction 
} from "@metaplex-foundation/mpl-token-metadata";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { 
  clusterApiUrl, Connection, PublicKey, Transaction 
} from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const connection = new Connection(clusterApiUrl("devnet"));
const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const OWNER = getKeypairFromEnvironment("KEYPAIR");
const tokenAccount = new PublicKey("arF5PNKaddQYhB99e9rndAcowJgyetRTwj9SU6RGdhT");

const metadataPDA = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
)[0];

const metadata = {
  name: "CanHamzaCode",
  symbol: "CHC",
  uri: "https://github.com/canhamzacode",
  sellerFeeBasisPoints: 0,
  creators: null,
  uses: null,
  collection: null
};

const transaction = new Transaction();

const addMetaDataToToken = createCreateMetadataAccountV3Instruction(
  {
    metadata: metadataPDA,
    mint: tokenAccount,
    mintAuthority: OWNER.publicKey,
    payer: OWNER.publicKey,
    updateAuthority: OWNER.publicKey,
  },
  {
    createMetadataAccountArgsV3: {
      data: metadata,
      isMutable: true,
      collectionDetails: null,
    },
  }
);

transaction.add(addMetaDataToToken);

(async () => {
  try {
    const signature = await connection.sendTransaction(transaction, [OWNER], {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });

    console.log(
      `Transaction successful: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
  } catch (error) {
    console.error("Failed to add metadata:", error.message);
  }
})();
