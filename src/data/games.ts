export type Game = {
  slug: string;
  title: string;
  category: "Arcade" | "Puzzle" | "Action" | "Runner";
  description: string;
  players: string;
  rating: string;
  accent: string;
  icon: string;
  featured?: boolean;
  controls: string;
  objective: string;
};

export const games: Game[] = [
  { slug: "neon-dash", title: "Neon Dash", category: "Runner", description: "A fast, luminous reflex challenge. Jump the gaps, dodge the hazards, and chase a new high score.", players: "1 player", rating: "4.9", accent: "violet", icon: "⚡", featured: true, controls: "Space / ↑ to jump · P to pause", objective: "Survive for as long as you can and collect the glowing orbs." },
  { slug: "pixel-blaster", title: "Pixel Blaster", category: "Action", description: "Defend the grid from waves of pixel invaders in this bite-sized arcade shooter.", players: "1 player", rating: "4.8", accent: "blue", icon: "🚀", featured: true, controls: "← → to move · Space to fire", objective: "Destroy incoming targets and avoid letting them reach your ship." },
  { slug: "block-party", title: "Block Party", category: "Puzzle", description: "Drop, stack, and clear. A familiar block-stacking puzzle with a clean, modern arcade feel.", players: "1 player", rating: "4.7", accent: "pink", icon: "🧩", featured: true, controls: "← → move · ↑ rotate · ↓ drop", objective: "Complete horizontal lines to clear blocks and build your score." },
  { slug: "orbit-breaker", title: "Orbit Breaker", category: "Arcade", description: "Keep the ball alive, break every target, and find your rhythm.", players: "1 player", rating: "4.6", accent: "orange", icon: "🪐", controls: "Mouse / touch to move the paddle", objective: "Bounce the ball into targets without letting it fall." },
  { slug: "skyline-sprint", title: "Skyline Sprint", category: "Runner", description: "A little speed, a lot of sky, and one more run to beat your record.", players: "1 player", rating: "4.8", accent: "green", icon: "🏙️", controls: "Space / ↑ to jump", objective: "Jump over obstacles and keep your run going." },
  { slug: "gem-garden", title: "Gem Garden", category: "Puzzle", description: "Match bright gems, make satisfying combos, and unwind one move at a time.", players: "1 player", rating: "4.5", accent: "pink", icon: "💎", controls: "Tap or click gems", objective: "Match three or more gems to score points." },
  { slug: "comet-club", title: "Comet Club", category: "Action", description: "Steer through a field of comets and see how long your reflexes can hold.", players: "1 player", rating: "4.7", accent: "blue", icon: "☄️", controls: "Arrow keys to steer", objective: "Avoid the comets and survive as the pace increases." },
  { slug: "tiny-racers", title: "Tiny Racers", category: "Arcade", description: "A colorful time trial built for quick races and instant rematches.", players: "1 player", rating: "4.6", accent: "orange", icon: "🏎️", controls: "← → steer · ↑ accelerate", objective: "Stay on track and finish before the timer runs out." },
];

export const categories = [
  { name: "All games", value: "All", icon: "🎮" },
  { name: "Arcade", value: "Arcade", icon: "🕹️" },
  { name: "Action", value: "Action", icon: "💥" },
  { name: "Puzzle", value: "Puzzle", icon: "🧩" },
  { name: "Runner", value: "Runner", icon: "⚡" },
] as const;

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}
