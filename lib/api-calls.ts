export async function fetchGames(limit: number = 30) {
  const API_KEY = process.env.RAWG_API_KEY;
  if (!API_KEY) throw new Error('RAWG_API_KEY not defined');

  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${limit}`,
 );

    if (!res.ok) throw new Error(`RAWG fetch failed: ${res.status}`);

    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error('RAWG fetch error:', err);
    return []; // fallback so app won't crash
  }
}
