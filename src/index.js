const fs = require("fs");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const mainFuction = async () => {
    try {
        let data = {
            file: fs.createReadStream("/Users/arken/chalak/chalak-bot-data/filtered-data/filtered_animal_data.jsonl"),
            purpose: "fine-tune"
        }
        // console.log("filepath: ", jsonlFil)
        const file = await axios.post("https://api.openai.com/v1/files", data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }

        })


        console.log("Files created", file);
        // const responseModel = await openai.createFineTune({
        //     training_file: file,
        //     model: "ada",
        //     learning_rate_multiplier: 0.2,
        //     suffix: "mama-bot"
        // });

        // console.log("response model created", responseModel);
        // const completion = await openai.createChatCompletion({
        //     model: responseModel,
        //     max_tokens: 50,
        //     messages: [{ role: "user", content: "what is the most common diesese in bufflao nnamed bhadawari" }],
        // });
        // console.log("chat completeiong", completion.data.choices[0].message);
    } catch (error) {
        console.log("error: ", error.message)
    }

}


const createVectorEmbedding = async () => {

}


const createChatCompletion = async () => {

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 50,
        messages: [{ role: "user", content: "what is the most common diesese in bufflao named bhadawari in india" }],
    });
    console.log(completion.data.choices[0].message);
}

mainFuction();

// createChatCompletion();



