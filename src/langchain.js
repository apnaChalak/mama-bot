const { PineconeClient } = require("@pinecone-database/pinecone");
const dotenv = require("dotenv");
const { Document } = require("langchain/document");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { RecursiveCharacterTextSplitter, CharacterTextSplitter } = require("langchain/text_splitter");

const animal_json = require("./filtered-data/unfiltered_animal_data.json")
dotenv.config();

const client = new PineconeClient();


const main = async () => {
    await client.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT,
    });

    const existingIndex = await client.listIndexes()
    console.log(existingIndex)
    // const PINECONE_INDEX = await client.createIndex({
    //     createRequest: {
    //         name: "openai",
    //         dimension: 1536,
    //     },
    // })
    let arrayofDocuments = []
    for (let i = 0; i < animal_json.length; i++) {
        let doc = new Document({ pageContent: animal_json[0]["general-Info"], metadata: { animal_name: animal_json[0]["animal-Name"] } })
        arrayofDocuments.push(doc);
        // console.log(doc)
    }
    console.log()

    // const splitter = new CharacterTextSplitter({
    //     separator: "\n\n",
    //     chunkSize: 7,
    //     chunkOverlap: 3,
    // });
    // const docOutput = await splitter.splitDocuments(arrayofDocuments);
    // const pineconeIndex = client.Index(existingIndex[0]);
    // console.log("pinecone index", pineconeIndex)
    // // const docs = [
    // //     new Document({
    // //         metadata: { foo: "bar" },
    // //         pageContent: "pinecone is a vector db",
    // //     }),
    // //     new Document({
    // //         metadata: { foo: "bar" },
    // //         pageContent: "the quick brown fox jumped over the lazy dog",
    // //     }),

    // // ];

    // let vectorIndex = await PineconeStore.fromDocuments(docOutput, new OpenAIEmbeddings(), {
    //     pineconeIndex,
    // });

    // /* Search the vector DB independently with meta filters */
    // const results = await vectorIndex.similaritySearch("general", 1, {
    //     animal_name: "NAMAKKAL",
    // });
    // console.log(results);
    // /*
    // [
    //   Document {
    //     pageContent: 'pinecone is a vector db',
    //     metadata: { foo: 'bar' }
    //   }
    // ]
    // */

    // /* Use as part of a chain (currently no metadata filters) */
    // const model = new OpenAI();
    // const chain = VectorDBQAChain.fromLLM(model, vectorIndex, {
    //     k: 1,
    //     returnSourceDocuments: true,
    // });
    // const response = await chain.call({ query: "What is namakkal buffolo feed?" });
    // console.log(response);
}

main()