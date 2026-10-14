"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Gamepad2, Search, Sparkles, Trophy, Zap } from "lucide-react";
import { categories, games } from "@/data/games";

type GameCardProps = { game: (typeof games)[number] };
function GameCard({ game }: GameCardProps) {
  return <Link href={`/games/${game.slug}`} className="game-card" aria-label={`Play ${game.title}`}>
    <div className={`game-art art-${game.accent}`}><span className="art-tag">{game.category}</span><span className="art-emoji" aria-hidden="true">{game.icon}</span><span className="play-circle"><ArrowUpRight size={17}/></span></div>
    <div className="game-info"><div className="game-title-row"><span className="game-title">{game.title}</span><span className="rating">★ {game.rating}</span></div><p className="game-description">{game.description}</p><div className="game-meta"><span className="meta-category"><i className="tag-dot"/> {game.category}</span><span>{game.players}</span></div></div>
  </Link>;
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const filteredGames = useMemo(() => games.filter((game) => (activeCategory === "All" || game.category === activeCategory) && `${game.title} ${game.category} ${game.description}`.toLowerCase().includes(query.toLowerCase().trim())), [activeCategory, query]);
  const featured = games.filter((game) => game.featured);

  return <main><div className="site-shell">
    <header className="topbar"><Link href="/" className="brand" aria-label="ProSider home"><span className="brand-mark"><Gamepad2 size={22}/></span><span>Pro<em>Sider</em></span></Link>
      <nav className="navlinks" aria-label="Main navigation"><a className="active" href="#home">Discover</a><a href="#library">Games</a><a href="#categories">Categories</a><a href="#about">About</a></nav>
      <div className="top-actions"><a href="#library" className="icon-btn" aria-label="Search games"><Search size={18}/></a><a href="#library" className="pill-btn primary">Play now <ArrowUpRight size={15}/></a><button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span>{menuOpen ? "×" : "☰"}</span></button></div>
    </header>
    {menuOpen && <nav className="mobile-only category-row"><a className="category-chip" href="#home" onClick={() => setMenuOpen(false)}>Discover</a><a className="category-chip" href="#library" onClick={() => setMenuOpen(false)}>Games</a><a className="category-chip" href="#categories" onClick={() => setMenuOpen(false)}>Categories</a></nav>}

    <section className="hero" id="home"><div><div className="eyebrow"><span className="eyebrow-dot"/> Your next favorite game awaits</div><h1>Less scrolling.<br/><span className="gradient-text">More playing.</span></h1><p>Big arcade energy, tiny time commitment. Discover fun browser games, jump straight in, and make every break a good one.</p><div className="hero-actions"><a className="pill-btn primary" href="#library"><Gamepad2 size={17}/> Explore games <ArrowRight size={16}/></a><a className="secondary-btn" href="#featured">See what’s hot</a></div><div className="stats"><div className="stat"><Trophy size={16}/><span><strong>Instant</strong> play</span></div><div className="stat"><Zap size={16}/><span><strong>Zero</strong> downloads</span></div><div className="stat"><Sparkles size={16}/><span><strong>All fun</strong> vibes</span></div></div></div>
      <div className="hero-art" aria-label="ProSider featured game artwork"><span className="float-chip chip-one">✦ Pick-up-and-play</span><span className="float-chip chip-two">🎮 Game on</span><div className="hero-orb">🎮</div><span className="float-chip chip-three">⚡ Quick rounds</span><span className="float-chip chip-four">✧ Find your next fave</span></div></section>

    <section className="section" id="featured"><div className="section-head"><div><div className="section-kicker">Handpicked for you</div><h2>Featured games <span style={{color:"#8ea4ff"}}>✦</span></h2><div className="section-subtitle">The good stuff, right up front.</div></div><a className="text-link" href="#library">Explore all games <ArrowRight size={15}/></a></div><div className="featured-grid">{featured.map((game) => <GameCard key={game.slug} game={game}/>)}</div></section>

    <section className="section" id="library"><div className="section-head"><div><div className="section-kicker">The game shelf</div><h2>Find your next obsession</h2><div className="section-subtitle">Pick a vibe. Find a game. Get playing.</div></div></div>
      <div className="category-row" id="categories">{categories.map((category) => <button key={category.value} className={`category-chip ${activeCategory === category.value ? "selected" : ""}`} onClick={() => setActiveCategory(category.value)}>{category.icon} {category.name}</button>)}</div>
      <div className="catalogue-tools"><label className="searchbox"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games, genres, vibes..." aria-label="Search games"/></label><span className="result-count">{filteredGames.length} {filteredGames.length === 1 ? "game" : "games"} to explore</span></div>
      <div className="catalogue-grid">{filteredGames.length ? filteredGames.map((game) => <GameCard key={game.slug} game={game}/>) : <div className="empty-state"><strong>No games found just yet.</strong>Try another search or switch categories.</div>}</div>
    </section>
    <footer className="footer" id="about"><div><div className="footer-brand">ProSider ✦</div><p>Little games. Big main-character energy.</p></div><div className="footer-links"><a href="#home">Back to top ↑</a><a href="#library">Browse games</a><span>Made for play · © {new Date().getFullYear()} ProSider</span></div></footer>
  </div></main>;
}
