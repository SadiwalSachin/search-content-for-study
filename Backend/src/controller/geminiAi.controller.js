import genertaeContentByGeminiAI from "../utility/Geminiai.js";

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

export {contentGenerateViaGemini}
