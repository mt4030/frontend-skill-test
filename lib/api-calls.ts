import axios from "axios";
export async function fetchGames(limit: number = 200) {
  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  if (!API_KEY) throw new Error('RAWG_API_KEY not defined');

  try {
    const response  =await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${limit}`)
 if(response.status===200){
  console.log('RAWG API response:', response.data); // Log the entire response for debugging
  return response.data
 }
 else{
   console.error('Failed to fetch data:', response.statusText);
 }
  } catch (err) {
    console.error('RAWG fetch error:', err);
    return []; 
  }
}
