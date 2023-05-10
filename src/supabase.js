const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { createClient } = require("@supabase/supabase-js");
const { VectorDBQAChain } = require("langchain/chains");
const { OpenAI } = require("langchain/llms/openai");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const {
    JSONLoader,
    JSONLinesLoader,
} = require("langchain/document_loaders/fs/json");
const { Document } = require("langchain/document");
const { RecursiveCharacterTextSplitter, CharacterTextSplitter } = require("langchain/text_splitter");
const animal_json = require("./filtered-data/unfiltered_animal_data.json");
const { type } = require("os");

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// First, follow set-up instructions at
// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase

const privateKey = process.env.SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const returnResult = async () => {
    const client = createClient(url, privateKey);
    let loadedDocs = await loadDocs();
    const vectorStore = await SupabaseVectorStore.fromDocuments(
        loadedDocs,
        new OpenAIEmbeddings(),
        {
            client,
            tableName: "documents",
            queryName: "match_documents",
        }
    );

    // console.log("vector", vectorStore)
    const resultOne = await vectorStore.similaritySearch("Hello world", 1);

    console.log(resultOne);
    // return vectorStore;

};

async function loadDocs() {

    // const loader = new JSONLoader("/Users/arken/chalak/chalak-bot-data/src/filtered-data/unfiltered_animal_data.json");

    // const docs = await loader.load();
    let arrayofDocuments = []
    for (let i = 0; i < animal_json.length; i++) {
        let doc = new Document({ pageContent: animal_json[0]["general-Info"], metadata: { animal_name: animal_json[0]["animal-Name"] } })
        arrayofDocuments.push(doc);
        // console.log(doc)
    }


    const splitter = new CharacterTextSplitter({
        separator: "\n\n",
        chunkSize: 7,
        chunkOverlap: 3,
    });
    const docOutput = await splitter.splitDocuments(arrayofDocuments);

    let arrayOfDocs = Object.values(docOutput);
    console.log("document", arrayOfDocs.length);
    // let final = Array.of(arrayOfDocs)

    // console.log("type of", arrayOfDocs.map(() => { console.log("map") }));
    console.log("Return   log")
    return arrayOfDocs.splice(0, arrayOfDocs.length - 100);

}

// async function loadQuerry() {
//     const model = new OpenAI();
//     const chain = VectorDBQAChain.fromLLM(model, returnResult(), {
//         k: 1,
//         returnSourceDocuments: true,
//     });
//     const response = await chain.call({ query: "What is pinecone?" });
//     console.log(response);
// }

// loadQuerry()
returnResult()
// loadDocs()