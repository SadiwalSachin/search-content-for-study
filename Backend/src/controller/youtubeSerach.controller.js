import axios from "axios";

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
          key: process.env.YT_API_KEY,
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

export default searchContentOnYoutube;
