const axios = require("axios");
export default async function getSigns(req, res) {
  try {
    const { sign } = req.body;
    const apiUrl = "https://api.openai.com/v1/completions";
    const prompt = `write a daily horoscope for ${sign} zodiac sign. Make it at least 50 words long. `;
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    const data = {
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 100,
      echo: false,
    };
    let jsonData;

    const response = await axios.post(apiUrl, data, config);
    jsonData = response.data;
    // check the status
    console.log(response.status);
    // check the data
    console.log(response.data);
    //return the data
    res.status(200).json(jsonData);
  } catch (error) {
    //check the error status
    console.log(error.response.status);
    //check the error data
    console.log(error.response.data);
    //check the error
    console.log(error);
    // return the error
    res.status(500).json({ error: error.response.data });
  }
}
