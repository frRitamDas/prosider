export type Game = {
  slug: string;
  title: string;
  category: "PC" | "Neo Geo" | "Capcom" | "Arcade" | "Flash";
  genre: string;
  description: string;
  players: string;
  accent: string;
  icon: string;
  featured?: boolean;
  year?: string;
  sourcePath: string;
  engine: string;
  note?: string;
};

export const games: Game[] = [
  { slug: "vice-city", title: "Grand Theft Auto: Vice City", category: "PC", genre: "Open world", description: "Take over the neon streets of 1980s Vice City in a browser-based WebAssembly port.", players: "1 player", accent: "vice", icon: "🌴", featured: true, year: "2002", sourcePath: "/vice-city", engine: "reVC · WebAssembly", note: "Requires a capable desktop browser and WebGL 2." },
  { slug: "minecraft", title: "Minecraft", category: "PC", genre: "Sandbox", description: "Build, mine and survive in block worlds with the browser-based 1.8.8 community port.", players: "1 player", accent: "craft", icon: "⛏️", featured: true, year: "2011", sourcePath: "/minecraft", engine: "EaglercraftX · WebAssembly" },
  { slug: "gta3", title: "Grand Theft Auto III", category: "PC", genre: "Open world", description: "Explore Liberty City in the classic open-world action game running through a browser port.", players: "1 player", accent: "city", icon: "🚕", featured: true, year: "2001", sourcePath: "/gta3", engine: "re3 · WebAssembly", note: "Best with keyboard and mouse." },
  { slug: "simpsons", title: "The Simpsons: Hit & Run", category: "PC", genre: "Action · Racing", description: "Drive around Springfield in a community WebAssembly port of the cult classic.", players: "1 player", accent: "simpsons", icon: "🚙", year: "2003", sourcePath: "/simpsons", engine: "Native WebAssembly", note: "Threaded WebAssembly support may be required." },
  { slug: "gta-5", title: "Grand Theft Auto V", category: "PC", genre: "Open world", description: "A community WebAssembly/WebGPU port with a large initial asset download.", players: "1 player", accent: "city", icon: "🏙️", year: "2013", sourcePath: "/gta-5", engine: "Community RAGE port", note: "Third-party hosted; desktop Chrome or Edge with WebGPU is recommended." },
  { slug: "metal-slug", title: "Metal Slug", category: "Neo Geo", genre: "Run & gun", description: "The legendary arcade run-and-gun debut. Fight through enemy lines and rescue prisoners.", players: "1–2 players", accent: "metal", icon: "💥", featured: true, year: "1996", sourcePath: "/retro-games/metal-slug", engine: "FinalBurn Neo" },
  { slug: "street-fighter-ii-hyper-fighting", title: "Street Fighter II: Hyper Fighting", category: "Capcom", genre: "Fighting", description: "Classic head-to-head arcade combat from the golden age of fighting games.", players: "1–2 players", accent: "fighter", icon: "🥊", year: "1992", sourcePath: "/retro-games/street-fighter-ii-hyper-fighting", engine: "FinalBurn Neo" },
  { slug: "ultimate-mortal-kombat-3", title: "Ultimate Mortal Kombat 3", category: "Arcade", genre: "Fighting", description: "Fast-paced arcade fighting with a roster of iconic kombatants.", players: "1–2 players", accent: "mortal", icon: "⚔️", year: "1995", sourcePath: "/retro-games/ultimate-mortal-kombat-3", engine: "FinalBurn Neo" },
  { slug: "pac-man-arcade-1980", title: "Pac-Man", category: "Arcade", genre: "Maze · Action", description: "The arcade icon: clear the maze, collect pellets and stay ahead of the ghosts.", players: "1–2 players", accent: "pacman", icon: "🟡", featured: true, year: "1980", sourcePath: "/retro-games/pac-man-arcade-1980", engine: "FinalBurn Neo" },
  { slug: "canabalt", title: "Canabalt", category: "Flash", genre: "Endless runner", description: "Leap between rooftops in the minimalist game that helped define the endless runner.", players: "1–2 players", accent: "canabalt", icon: "🏃", featured: true, year: "2009", sourcePath: "/flash-games/canabalt", engine: "Ruffle · Flash" },
  { slug: "alien-hominid", title: "Alien Hominid", category: "Flash", genre: "Run & gun", description: "A hand-drawn, fast-moving action platformer with a wonderfully chaotic sense of humor.", players: "1 player", accent: "alien", icon: "👽", featured: true, year: "2002", sourcePath: "/flash-games/alien-hominid", engine: "Ruffle · Flash" },
  { slug: "bloxorz", title: "Bloxorz", category: "Flash", genre: "Puzzle", description: "Roll a block through tricky floating platforms and get it into the square hole.", players: "1 player", accent: "bloxorz", icon: "🧊", year: "2007", sourcePath: "/flash-games/bloxorz", engine: "Ruffle · Flash" },
  { slug: "happy-wheels", title: "Happy Wheels", category: "Flash", genre: "Physics · Simulation", description: "A physics-based obstacle course classic with community-built levels.", players: "1 player", accent: "wheels", icon: "🚲", year: "2010", sourcePath: "/flash-games/happy-wheels", engine: "Ruffle · Flash" },
  { slug: "bloons-td-4", title: "Bloons Tower Defense 4", category: "Flash", genre: "Tower defense", description: "Build a defense, upgrade your towers and stop waves of balloons.", players: "1 player", accent: "bloons", icon: "🎈", year: "2009", sourcePath: "/flash-games/bloons-td-4", engine: "Ruffle · Flash" },
  { slug: "age-of-war", title: "Age of War", category: "Flash", genre: "Strategy", description: "Evolve your army through the ages and outsmart the opposing base.", players: "1 player", accent: "war", icon: "🛡️", year: "2007", sourcePath: "/flash-games/age-of-war", engine: "Ruffle · Flash" },
  { slug: "helicopter-game", title: "Helicopter Game", category: "Flash", genre: "Arcade", description: "Hold to climb, release to descend and guide your helicopter through the tunnel.", players: "1 player", accent: "heli", icon: "🚁", year: "2004", sourcePath: "/flash-games/helicopter-game", engine: "Ruffle · Flash" }
];

export const categories = [
  { name: "All games", value: "All", icon: "⌘" },
  { name: "PC games", value: "PC", icon: "▣" },
  { name: "Neo Geo", value: "Neo Geo", icon: "◆" },
  { name: "Capcom", value: "Capcom", icon: "✦" },
  { name: "Arcade", value: "Arcade", icon: "▦" },
  { name: "Flash", value: "Flash", icon: "⚡" }
] as const;

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}
