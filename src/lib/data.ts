export const sliderData = [
  {
    id: 1,
    imageId: "slider-1",
    title: "SUA RÁDIO, SEU CAMINHO",
    description: "A melhor programação, onde você estiver.",
    link: "/schedule"
  },
  {
    id: 2,
    imageId: "slider-2",
    title: "PEÇA SUA MÚSICA",
    description: "Sua voz na nossa rádio. Participe!",
    link: "/requests"
  },
  {
    id: 3,
    imageId: "slider-3",
    title: "ÚLTIMAS NOTÍCIAS",
    description: "Fique por dentro do mundo da música.",
    link: "/news"
  }
];

export const news = [
  {
    id: 1,
    title: "Local Band 'The Vibe' Releases New Album",
    category: "Music",
    date: "2 hours ago",
    content: "The much-anticipated album from The Vibe has finally dropped, and it's everything fans were hoping for. A mix of rock, funk, and soul, this album is set to top the charts.",
    imageId: "news-1",
  },
  {
    id: 2,
    title: "Rádio Conectar Celebrates 10 Years on Air",
    category: "Station News",
    date: "1 day ago",
    content: "A decade of music, news, and community. We're looking back at our favorite moments and looking forward to many more years of broadcasting.",
    imageId: "news-2",
  },
  {
    id: 3,
    title: "The Rise of Lo-Fi: How Background Music Took Center Stage",
    category: "Trends",
    date: "2 days ago",
    content: "Once a niche genre, lo-fi hip hop has become a global phenomenon. We explore its origins and why it resonates with so many listeners.",
    imageId: "news-3",
  },
  {
    id: 4,
    title: "Annual City Music Festival Dates Announced",
    category: "Events",
    date: "3 days ago",
    content: "Get ready for three days of non-stop music! The city's annual music festival is back with a star-studded lineup.",
    imageId: "news-4",
  },
  {
    id: 5,
    title: "Vinyl's Big Comeback: Why Analog is Thriving in a Digital World",
    category: "Music",
    date: "4 days ago",
    content: "Sales of vinyl records have been soaring. We talk to collectors and artists about the appeal of this classic format.",
    imageId: "news-5",
  },
  {
    id: 6,
    title: "Meet Our New Host for the Morning Show",
    category: "Station News",
    date: "5 days ago",
    content: "We're excited to welcome DJ Spark to the Rádio Conectar family! Get to know the new voice of your morning commute.",
    imageId: "news-6",
  },
];

export const topCharts = [
  { rank: 1, title: "Crimson Waves", artist: "The Red Tides", votes: 12543 },
  { rank: 2, title: "Midnight Drive", artist: "Neon Dreams", votes: 11876 },
  { rank: 3, title: "Echoes in the Rain", artist: "Lost Frequencies", votes: 10543 },
  { rank: 4, title: "Grotesk Heart", artist: "Space Cadets", votes: 9876 },
  { rank: 5, title: "Digital Love", artist: "Daft Punk", votes: 9234 },
  { rank: 6, title: "Starlight", artist: "Muse", votes: 8765 },
  { rank: 7, title: "Magenta Mountain", artist: "King Gizzard", votes: 8123 },
  { rank: 8, title: "Solar Power", artist: "Lorde", votes: 7854 },
  { rank: 9, title: "City Lights", artist: "The Weeknd", votes: 7345 },
  { rank: 10, title: "Interstellar", artist: "Hans Zimmer", votes: 6987 },
];

export const schedule = [
  {
    day: "Monday",
    shows: [
      { time: "06:00 - 10:00", title: "Morning Commute", host: "DJ Spark" },
      { time: "10:00 - 14:00", title: "Midday Mix", host: "Ana Beatriz" },
      { time: "14:00 - 18:00", title: "Afternoon Drive", host: "Carlos Silva" },
      { time: "18:00 - 22:00", title: "Evening Grooves", host: "DJ Luna" },
    ],
  },
  {
    day: "Tuesday",
    shows: [
      { time: "06:00 - 10:00", title: "Morning Commute", host: "DJ Spark" },
      { time: "10:00 - 14:00", title: "Throwback Tuesday", host: "Retro Rick" },
      { time: "14:00 - 18:00", title: "Afternoon Drive", host: "Carlos Silva" },
      { time: "18:00 - 22:00", title: "Rock Block", host: "Mariana Costa" },
    ],
  },
  {
    day: "Wednesday",
    shows: [
        { time: "06:00 - 10:00", title: "Morning Commute", host: "DJ Spark" },
        { time: "10:00 - 14:00", title: "Midday Mix", host: "Ana Beatriz" },
        { time: "14:00 - 18:00", title: "Afternoon Drive", host: "Carlos Silva" },
        { time: "18:00 - 22:00", title: "World Music Journey", host: "Leo Marques" },
    ],
  },
  {
    day: "Thursday",
    shows: [
        { time: "06:00 - 10:00", title: "Morning Commute", host: "DJ Spark" },
        { time: "10:00 - 14:00", title: "Indie Spotlight", host: "Sofia Lima" },
        { time: "14:00 - 18:00", title: "Afternoon Drive", host: "Carlos Silva" },
        { time: "18:00 - 22:00", title: "Electronic Fusion", host: "DJ Neon" },
    ],
  },
  {
    day: "Friday",
    shows: [
        { time: "06:00 - 10:00", title: "Morning Commute", host: "DJ Spark" },
        { time: "10:00 - 14:00", title: "Midday Mix", host: "Ana Beatriz" },
        { time: "14:00 - 18:00", title: "TGIF Party Starter", host: "DJ Fire" },
        { time: "18:00 - 22:00", title: "Top 10 Countdown", host: "Carlos Silva" },
    ],
  },
  {
    day: "Saturday",
    shows: [
      { time: "08:00 - 12:00", title: "Saturday Brunch", host: "Chef Anton" },
      { time: "12:00 - 16:00", title: "Weekend Requests", host: "DJ Luna" },
      { time: "16:00 - 20:00", title: "Classic Rock Rewind", host: "Retro Rick" },
      { time: "20:00 - 00:00", title: "Saturday Night Heat", host: "DJ Fire" },
    ],
  },
  {
    day: "Sunday",
    shows: [
      { time: "08:00 - 12:00", title: "Sunday Morning Easy", host: "Sofia Lima" },
      { time: "12:00 - 16:00", title: "Acoustic Sessions", host: "Leo Marques" },
      { time: "16:00 - 20:00", title: "The Jazz Cafe", host: "Mariana Costa" },
      { time: "20:00 - 00:00", title: "Chillout Zone", host: "DJ Luna" },
    ],
  },
];


export const podcasts = [
  {
    id: 1,
    title: "The Daily Riff",
    host: "Rockin' Rebecca",
    date: "July 22, 2024",
    description: "Daily deep dives into the greatest rock anthems of all time. Today: The story behind 'Stairway to Heaven'.",
    imageId: "podcast-1"
  },
  {
    id: 2,
    title: "Indie Insights",
    host: "Alex Chen",
    date: "July 21, 2024",
    description: "Interviews with the hottest new independent artists. This week, we chat with 'Glass Animals' about their new album.",
    imageId: "podcast-2"
  },
  {
    id: 3,
    title: "Beat Makers",
    host: "DJ Fresh",
    date: "July 20, 2024",
    description: "A look into the world of music production. We break down the techniques behind hip-hop's most iconic beats.",
    imageId: "podcast-3"
  },
  {
    id: 4,
    title: "Conectar Conversations",
    host: "Maria Silva",
    date: "July 19, 2024",
    description: "Our flagship weekly show, discussing the latest in music news, culture, and what's happening at the station.",
    imageId: "podcast-4"
  },
    {
    id: 5,
    title: "Vinyl Vibes",
    host: "Old School Oscar",
    date: "July 18, 2024",
    description: "Exploring the warm, rich sound of vinyl. Each episode features a classic album played in its entirety.",
    imageId: "podcast-5"
  },
  {
    id: 6,
    title: "Electronic Echoes",
    host: "Synthwave Sarah",
    date: "July 17, 2024",
    description: "A journey through the world of electronic music, from ambient to techno. Featuring guest mixes and artist spotlights.",
    imageId: "podcast-6"
  },
];
