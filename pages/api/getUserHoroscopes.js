const axios = require("axios");
export default async function getSigns(req, res) {
  try {
    const { sign, birthdate, timeOfBirth, birthLocation, name } = req.body;
    const apiUrl = "https://api.openai.com/v1/completions";
    const prompt = `Task 1:Write a daily horoscope for someone who's name is ${name}, who's born at ${birthdate} at the time ${timeOfBirth} and at the place ${birthLocation}, who's sign is ${sign}, and be as specific and creative as possible. Include ${sign} zodiac traits into your horoscope telling. Do not mention the date, time and place in the text, but use them for interpretation. Task 2: Write a separate section on one zodiac sign ${name} would be compatible today, and one sign that would not be compatible, don't use 3rd person when writing. Explain why they would be compatible or not. Task 3: Write 6 different lucky numbers, max 2 digits. For each task, write minimum 500 words and divide the three tasks into sections. Task 1 shoul bear the title Daily Horoscope, and Task 2 should bear the title Compatibility Report. Task 3 should bear the title Lucky Numbers. Never refer to ${name} in third person. Finish your sentences, don't leave anything unfinished. `;
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
      max_tokens: 800,
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
