import genertaeContentByGeminiAI from "../utility/gemini.ai.js";
import axios from "axios";


const contentGenerateViaGemini = async (req, res) => {
  try {
    const {prompt} = req.body;
    console.log("prompt coming via user : " , prompt);
    const response = await genertaeContentByGeminiAI(prompt);

    res.json({success:true,message:"Content is generated",data:response});
  } catch (error) {
    console.log("Error while tring to generate content");
    console.log(error)
    res.json({success:false,message:"Content not generated"})
  }
}


const searchContentOnYoutube = async (req, res) => {
  const { query , type } = req.body;
  console.log(`User entered this : Query = ${query} and type = ${type}`)
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          key: process.env.YT_API_KEY,// iski api key daalni hai env me 
          type: type,
          maxResults:20
        },
      }
    );

    if(response){
        console.log("Data came from youtube in backend")
        console.log(response)
        res.json(response.data.items)
    }else{
        console.log("Error aa gya")
    }
  } catch (error) {}
};

export {contentGenerateViaGemini , searchContentOnYoutube}
