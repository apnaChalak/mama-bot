const { PineconeClient } = require("@pinecone-database/pinecone");
const dotenv = require("dotenv");
const { Document } = require("langchain/document");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PineconeStore } = require("langchain/vectorstores/pinecone");

const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const {
    JSONLoader,
    JSONLinesLoader,
} = require("langchain/document_loaders/fs/json");


async function newFunction() {
    // const loader = new DirectoryLoader(
    //     "./src/filtered-data",
    //     {
    //         ".json": (path) => new JSONLoader(path, "/texts"),

    //     }
    // );
    const loader = new JSONLoader("/Users/arken/chalak/chalak-bot-data/src/filtered-data/filtered_animal_data.json");

    const docs = await loader.load();
    console.log(docs[6].metadata);

}
newFunction();


//commented seciton

// {
//     ".json": (path) => new JSONLoader(path, "/texts"),
//         ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
//             ".txt": (path) => new TextLoader(path),
//                 ".csv": (path) => new CSVLoader(path, "text"),
//     }