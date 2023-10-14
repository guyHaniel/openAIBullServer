import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

async function testOpenAI() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt:
        "Translate the following English text to French: 'Hello, how are you?'",
      max_tokens: 150,
    });
    // const completionText = response.choices[0].text.trim();
    // console.log('Completion:', completionText);
    // console.log('OpenAI Response:', response);
    // console.log(response.data.choices[0].text);
  } catch (error) {
    console.error('OpenAI Test Error:', error);
  }
}

testOpenAI();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// console.log(process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({ message: 'Hello from the bull' });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({ bot: response.choices[0].text.trim() });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () =>
  console.log("Server is on at http://localhost:5000 brev. It's looking good")
);
