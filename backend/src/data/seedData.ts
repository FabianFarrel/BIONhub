// Seed data for BIONhub using REAL titles (movies, TV series, music).
// Posters/backdrops use TMDB's public image CDN (image.tmdb.org) and trailers
// are official YouTube links. If any poster path 404s over time, swap the
// image path with a current one from TMDB.

export interface SeedContent {
  title: string;
  type: "movie" | "tv" | "music";
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  genres: string[];
  releaseYear: number;
  creator: string;
  runtime: string;
}

const IMG = "https://image.tmdb.org/t/p/w500";
const BD = "https://image.tmdb.org/t/p/w1280";

export const seedContent: SeedContent[] = [
  // ============================ MOVIES ============================
  {
    title: "Resident Evil",
    type: "movie",
    overview:
      "A special military unit fights a powerful, out-of-control supercomputer and hundreds of scientists who have mutated into flesh-eating creatures after a laboratory accident.",
    posterUrl: "https://picsum.photos/seed/residentevil-poster/500/750",
    backdropUrl: "https://picsum.photos/seed/residentevil-bd/1280/720",
    trailerUrl: "https://www.youtube.com/watch?v=vioN2zBuFHE",
    genres: ["Horror", "Action", "Sci-Fi"],
    releaseYear: 2002,
    creator: "Dir. Paul W. S. Anderson",
    runtime: "1h 40m",
  },
  {
    title: "The Notebook",
    type: "movie",
    overview:
      "In 1940s South Carolina, mill worker Noah Calhoun and rich debutante Allie are deeply in love. Forced apart, they rekindle a love that endures through war, distance, and time.",
    posterUrl: `${IMG}/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg`,
    backdropUrl: `${BD}/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=FC6biTjEyZw",
    genres: ["Romance", "Drama"],
    releaseYear: 2004,
    creator: "Dir. Nick Cassavetes",
    runtime: "2h 3m",
  },
  {
    title: "Inception",
    type: "movie",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    posterUrl: `${IMG}/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg`,
    backdropUrl: `${BD}/s3TBrRGB1iav7gFOCNx3H31MoES.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    genres: ["Sci-Fi", "Action", "Thriller"],
    releaseYear: 2010,
    creator: "Dir. Christopher Nolan",
    runtime: "2h 28m",
  },
  {
    title: "Interstellar",
    type: "movie",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity\u2019s survival as Earth becomes uninhabitable.",
    posterUrl: `${IMG}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
    backdropUrl: `${BD}/xJHokMbljvjADYdit5fK5VQsXEG.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    releaseYear: 2014,
    creator: "Dir. Christopher Nolan",
    runtime: "2h 49m",
  },
  {
    title: "Parasite",
    type: "movie",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    posterUrl: `${IMG}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,
    backdropUrl: `${BD}/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    genres: ["Thriller", "Drama", "Comedy"],
    releaseYear: 2019,
    creator: "Dir. Bong Joon-ho",
    runtime: "2h 12m",
  },
  {
    title: "Dune: Part Two",
    type: "movie",
    overview:
      "Paul Atreides unites with the Fremen while seeking revenge against the conspirators who destroyed his family, torn between love and the fate of the universe.",
    posterUrl: `${IMG}/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg`,
    backdropUrl: `${BD}/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    genres: ["Sci-Fi", "Adventure"],
    releaseYear: 2024,
    creator: "Dir. Denis Villeneuve",
    runtime: "2h 46m",
  },

  // ============================ TV SERIES ============================
  {
    title: "WandaVision",
    type: "tv",
    overview:
      "Wanda Maximoff and Vision live idealized suburban lives, but begin to suspect that everything is not as it seems across different sitcom-inspired decades.",
    posterUrl: `${IMG}/glKDfE6btIRcVB5zrjspRIs4r52.jpg`,
    backdropUrl: "https://picsum.photos/seed/wandavision-bd/1280/720",
    trailerUrl: "https://www.youtube.com/watch?v=sj9J2ecsSpo",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    releaseYear: 2021,
    creator: "Created by Jac Schaeffer",
    runtime: "1 Season",
  },
  {
    title: "Stranger Things",
    type: "tv",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    posterUrl: `${IMG}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,
    backdropUrl: `${BD}/56v2KjBlU4XaOv9rVYEQypROD7P.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    genres: ["Sci-Fi", "Horror", "Drama"],
    releaseYear: 2016,
    creator: "Created by The Duffer Brothers",
    runtime: "4 Seasons",
  },
  {
    title: "Breaking Bad",
    type: "tv",
    overview:
      "A high school chemistry teacher diagnosed with cancer turns to manufacturing and selling methamphetamine to secure his family\u2019s future.",
    posterUrl: `${IMG}/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`,
    backdropUrl: `${BD}/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    genres: ["Crime", "Drama", "Thriller"],
    releaseYear: 2008,
    creator: "Created by Vince Gilligan",
    runtime: "5 Seasons",
  },
  {
    title: "Loki",
    type: "tv",
    overview:
      "After stealing the Tesseract, Loki is brought to the Time Variance Authority and forced to help fix the timeline he threatened across the multiverse.",
    posterUrl: `${IMG}/voHUmluYmKyleFkTu3lOXQG702u.jpg`,
    backdropUrl: "https://picsum.photos/seed/loki-bd/1280/720",
    trailerUrl: "https://www.youtube.com/watch?v=nW948Va-l10",
    genres: ["Sci-Fi", "Adventure", "Fantasy"],
    releaseYear: 2021,
    creator: "Created by Michael Waldron",
    runtime: "2 Seasons",
  },
  {
    title: "The Last of Us",
    type: "tv",
    overview:
      "Twenty years after a fungal outbreak ravages civilization, hardened survivor Joel is hired to smuggle 14-year-old Ellie out of a quarantine zone.",
    posterUrl: `${IMG}/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg`,
    backdropUrl: `${BD}/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=uLtkt8BonwM",
    genres: ["Drama", "Horror", "Adventure"],
    releaseYear: 2023,
    creator: "Created by Craig Mazin & Neil Druckmann",
    runtime: "2 Seasons",
  },
  {
    title: "Wednesday",
    type: "tv",
    overview:
      "Wednesday Addams navigates her years as a student at Nevermore Academy, mastering her emerging psychic ability and solving a supernatural mystery.",
    posterUrl: `${IMG}/9PFonBhy4cQy7Jz20NpMygczOkv.jpg`,
    backdropUrl: `${BD}/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=Di310WS8zLk",
    genres: ["Comedy", "Horror", "Mystery"],
    releaseYear: 2022,
    creator: "Created by Al Gough & Miles Millar",
    runtime: "1 Season",
  },

  // ============================ MUSIC ============================
  {
    title: "Blinding Lights",
    type: "music",
    overview:
      "A synth-driven 80s-inspired pop hit by The Weeknd from the album After Hours, known for its retro neon aesthetic and relentless momentum.",
    posterUrl: "https://picsum.photos/seed/blindinglights/500/500",
    backdropUrl: "https://picsum.photos/seed/blindinglights-bd/1280/720",
    trailerUrl: "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
    genres: ["Pop", "Synthwave"],
    releaseYear: 2020,
    creator: "The Weeknd",
    runtime: "3:20",
  },
  {
    title: "Shape of You",
    type: "music",
    overview:
      "A tropical house and dancehall-influenced pop single by Ed Sheeran from the album \u00f7 (Divide), one of the best-selling singles of all time.",
    posterUrl: "https://picsum.photos/seed/shapeofyou/500/500",
    backdropUrl: "https://picsum.photos/seed/shapeofyou-bd/1280/720",
    trailerUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    genres: ["Pop", "Dancehall"],
    releaseYear: 2017,
    creator: "Ed Sheeran",
    runtime: "3:53",
  },
  {
    title: "Bohemian Rhapsody",
    type: "music",
    overview:
      "Queen\u2019s genre-defying six-minute epic blending ballad, opera, and hard rock \u2014 one of the greatest and most theatrical rock songs ever recorded.",
    posterUrl: "https://picsum.photos/seed/bohemianrhapsody/500/500",
    backdropUrl: "https://picsum.photos/seed/bohemianrhapsody-bd/1280/720",
    trailerUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    genres: ["Rock", "Classic Rock"],
    releaseYear: 1975,
    creator: "Queen",
    runtime: "5:55",
  },
  {
    title: "Someone Like You",
    type: "music",
    overview:
      "A stripped-back piano ballad by Adele from the album 21, celebrated for its raw emotional vocal performance and heartbreak storytelling.",
    posterUrl: "https://picsum.photos/seed/someonelikeyou/500/500",
    backdropUrl: "https://picsum.photos/seed/someonelikeyou-bd/1280/720",
    trailerUrl: "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
    genres: ["Soul", "Pop"],
    releaseYear: 2011,
    creator: "Adele",
    runtime: "4:45",
  },
];
