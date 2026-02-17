
import { useMutation, useQueries } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";

////api call to get number of games as initial data just as mounts for first time 
export async function fetchGames(limit: number = 40) {
  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  if (!API_KEY) throw new Error('RAWG_API_KEY not defined');

  try {
    const response  =await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${limit}`)
 if(response.status===200){
 
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

/////api call for searching and live from all games in database
export const searchingLive = async (input: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY

  const response = await axios.get(
    "https://api.rawg.io/api/games",
    {
      params: {
        key: API_KEY,
        search: input,
        page_size: 4,
      },
    }
  )
  return response.data
}