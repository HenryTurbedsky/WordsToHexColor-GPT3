const { Configuration, OpenAIApi } = require("openai");

// Creat a configuration object
const configuration = new Configuration({
  apiKey: process.env['API_KEY'],
});

// Create the OpenAIApi object
const openai = new OpenAIApi(configuration);

// Takes in a string of text, and returns a color code that GPT-3 
async function getColor(colorName) {
  
  if( colorName.length > 25)
  {
    return "Too Long";
  }
  
  // Send API call to GPT-3
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: "The following is a list of words and their associated colors.\n\nGrass, #7CFC00\nOrange, #FFA500\nLight Lavender, #9A9AEB\nAmazon, #ff9900\nRed mixed with Blue, #FF00FF\nArgentina, #75AADB\nDark Camel, #C66900\nRed mixed with Blue and Green, #FFFFFF\nBlue with a little green, #00FF50\nStarbucks, #00704a\nBlue mixed with Green, #008080\nStarbucks Blue, #009c89\nCanada, #c00000\nZeus, #00afd1\nGasoline, #006269\nCookie Dough, #F5CED3\nDawn, #FA7B62\nFanta, #F7941E\nTaco Bell, #702082\nRed mixed with Green, #FFFF00\nVoldemort, #000000\nLyft, #FF00BF\nRed with a little blue, #FF0050\ntissue paper red, #FFB4B4\nApple Snow, #FFDBDB\ndress suit, #00131C\nbirthday party, #CA3767\n"+colorName.trim()+",",
    temperature: 0,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  });

  // Just text response
  var text = response.data.choices[0].text.trim()
  
  // Checks if text isnt a Hex code
  if( text.length != 7 || text[0] != "#")
  {
    return "ERROR";
  }
  
  return text;
}

module.exports = { getColor };