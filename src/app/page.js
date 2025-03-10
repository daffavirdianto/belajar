async function getPopularMovies() {

  // fetch data from TMDB API
  // await menunggu hasil fetch data
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // Konversi Response json ke Obejct JS
  const data = await res.json();

  return data.results;
}

export default async function Home() {
  const movies = await getPopularMovies();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">🎬 Popular Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{movie.title}</h3>
            <p className="text-yellow-400 mt-1">⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </main>
  );
}