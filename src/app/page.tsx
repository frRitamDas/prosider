"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChevronRight, Gamepad2, Search, SlidersHorizontal, Sparkles, Swords, Monitor, Joystick, Zap } from "lucide-react";
import { categories, games } from "@/data/games";

function GameCard({ game, featured = false }: { game: (typeof games)[number]; featured?: boolean }) {
  return (
    <Link href={`/games/${game.slug}`} className={`library-card ${featured ? "library-card-featured" : ""}`}>
      <div className={`library-art art-${game.accent}`}>
        <span className="art-system">{game.category} <span>·</span> {game.engine.split(" · ")[0]}</span>
        {game.cover ? <img className="game-cover" src={game.cover} alt="" loading="lazy" /> : <span className="art-glyph" aria-hidden="true">{game.icon}</span>}
        <span className="art-open"><ArrowUpRight size={17}/></span>
        <span className="art-grid" />
      </div>
      <div className="library-card-copy">
        <div className="library-title-row"><h3>{game.title}</h3><span className="year-label">{game.year}</span></div>
        <p>{game.description}</p>
        <div className="library-card-foot"><span>{game.genre}</span><span>{game.players}</span></div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const filteredGames = useMemo(() => games.filter((game) =>
    (activeCategory === "All" || game.category === activeCategory) &&
    `${game.title} ${game.category} ${game.genre} ${game.description}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [activeCategory, query]);
  const featured = games.filter((game) => game.featured).slice(0, 4);
  const hasFilters = activeCategory !== "All" || query.trim().length > 0;
  const visibleGames = showAll || hasFilters ? filteredGames : filteredGames.slice(0, 8);

  return (
    <main className="pro-shell">
      <aside className="pro-sidebar">
        <Link href="/" className="pro-brand"><span className="pro-brand-symbol"><Gamepad2 size={20}/></span><span>pro<span className="brand-accent">sider</span><small>THE ARCADE LIBRARY</small></span></Link>
        <div className="side-label">DISCOVER</div>
        <nav className="side-nav">
          <a className="side-nav-item active" href="#discover"><span className="side-nav-icon"><Sparkles size={16}/></span> Discover <span className="nav-active-dot"/></a>
          <a className="side-nav-item" href="#library"><span className="side-nav-icon"><Gamepad2 size={16}/></span> All games <span className="side-count">{games.length}</span></a>
          <a className="side-nav-item" href="#systems"><span className="side-nav-icon"><Monitor size={16}/></span> Game systems</a>
          <a className="side-nav-item" href="#classics"><span className="side-nav-icon"><Joystick size={16}/></span> Retro classics</a>
        </nav>
        <div className="side-label side-label-spaced">COLLECTIONS</div>
        <nav className="side-nav">
          <button className={`side-nav-item ${activeCategory === "PC" ? "selected" : ""}`} onClick={() => {setActiveCategory("PC");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}}><span className="system-dot pc-dot"/> PC games <span className="side-count">5</span></button>
          <button className={`side-nav-item ${activeCategory === "Neo Geo" ? "selected" : ""}`} onClick={() => {setActiveCategory("Neo Geo");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}}><span className="system-dot neo-dot"/> Neo Geo</button>
          <button className={`side-nav-item ${activeCategory === "Capcom" ? "selected" : ""}`} onClick={() => {setActiveCategory("Capcom");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}}><span className="system-dot capcom-dot"/> Capcom arcade</button>
          <button className={`side-nav-item ${activeCategory === "Arcade" ? "selected" : ""}`} onClick={() => {setActiveCategory("Arcade");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}}><span className="system-dot arcade-dot"/> Arcade classics</button>
          <button className={`side-nav-item ${activeCategory === "Flash" ? "selected" : ""}`} onClick={() => {setActiveCategory("Flash");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}}><span className="system-dot flash-dot"/> Flash games</button>
        </nav>
        <div className="sidebar-bottom"><div className="sidebar-status"><span className="status-pulse"/> LIBRARY ONLINE</div><p>Classic games. Modern browser.</p><span className="sidebar-version">PROSIDER / 01.0</span></div>
      </aside>

      <div className="pro-main">
        <header className="pro-topbar">
          <div className="breadcrumb"><span>Library</span><ChevronRight size={14}/><strong>Discover</strong></div>
          <div className="topbar-right"><span className="topbar-note"><span className="status-pulse"/> No install required</span><a href="#library" className="topbar-browse">Browse library <ArrowUpRight size={14}/></a></div>
        </header>

        <section className="discover-hero" id="discover">
          <div className="hero-copy">
            <div className="eyebrow-line"><span className="eyebrow-mark"/> YOUR NEXT RUN STARTS HERE</div>
            <h1>Play the games<br/>you <em>grew up with.</em></h1>
            <p className="hero-description">From browser legends to arcade icons. A cleaner home for the classics — ready when you are.</p>
            <div className="hero-buttons"><a href="#library" className="hero-primary">Explore the library <ArrowRight size={16}/></a><a href="#systems" className="hero-secondary">Browse systems <ArrowDownRight size={16}/></a></div>
            <div className="hero-proof"><span><i/> Browser-based</span><span><i/> Keyboard friendly</span><span><i/> No account</span></div>
          </div>
          <div className="hero-showcase" aria-label="Featured games">
            <div className="showcase-top"><span>EDITOR'S PICKS</span><span className="showcase-index">01 — 04</span></div>
            <div className="showcase-art"><div className="showcase-ring ring-a"/><div className="showcase-ring ring-b"/><div className="showcase-orb">🕹️</div><span className="showcase-float float-a">8-BIT FOREVER</span><span className="showcase-float float-b">PRESS START <span>↗</span></span><div className="showcase-bottom"><span>THE CLASSICS NEVER LEFT.</span><span>PROSIDER®</span></div></div>
            <div className="showcase-games">{featured.slice(0,3).map((game,i)=><Link href={`/games/${game.slug}`} key={game.slug} className="showcase-mini"><span className={`mini-icon art-${game.accent}`}>{game.icon}</span><span className="mini-copy"><strong>{game.title}</strong><small>{game.category} / {game.genre}</small></span><ArrowUpRight size={15}/></Link>)}</div>
          </div>
        </section>

        <section className="system-strip" id="systems">
          <div className="system-strip-heading"><span>THE COLLECTION</span><span>01 / 05</span></div>
          <div className="system-tiles">
            <button onClick={()=>{setActiveCategory("PC");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}} className="system-tile"><span className="system-tile-icon">▣</span><span><strong>PC ports</strong><small>Open worlds & 3D</small></span><ArrowUpRight size={14}/></button>
            <button onClick={()=>{setActiveCategory("Neo Geo");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}} className="system-tile"><span className="system-tile-icon neo-icon">◆</span><span><strong>Neo Geo</strong><small>Fighters & run-and-gun</small></span><ArrowUpRight size={14}/></button>
            <button onClick={()=>{setActiveCategory("Capcom");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}} className="system-tile"><span className="system-tile-icon capcom-icon">✦</span><span><strong>Capcom</strong><small>Arcade legends</small></span><ArrowUpRight size={14}/></button>
            <button onClick={()=>{setActiveCategory("Arcade");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}} className="system-tile"><span className="system-tile-icon arcade-icon">▦</span><span><strong>Arcade</strong><small>Coin-op classics</small></span><ArrowUpRight size={14}/></button>
            <button onClick={()=>{setActiveCategory("Flash");setShowAll(true);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}} className="system-tile"><span className="system-tile-icon flash-icon"><Zap size={18}/></span><span><strong>Flash</strong><small>Browser-era favorites</small></span><ArrowUpRight size={14}/></button>
          </div>
        </section>

        <section className="library-section" id="library">
          <div className="library-section-head"><div><div className="eyebrow-line"><span className="eyebrow-mark"/> FIND YOUR NEXT FAVORITE</div><h2>The game library<span className="heading-count">{filteredGames.length.toString().padStart(2,"0")}</span></h2><p>Real titles from the classic browser and arcade era.</p></div><a href="https://wasmarcade.com/" target="_blank" rel="noreferrer" className="source-link">View full archive <ArrowUpRight size={14}/></a></div>
          <div className="library-toolbar"><label className="library-search"><Search size={17}/><input value={query} onChange={e=>{setQuery(e.target.value);setShowAll(true);}} placeholder="Search titles, systems, genres..." aria-label="Search the game library"/>{query && <button onClick={()=>setQuery("")} aria-label="Clear search">×</button>}</label><div className="toolbar-right"><span><SlidersHorizontal size={14}/> FILTER</span><button className={activeCategory==="All"?"filter-active":""} onClick={()=>{setActiveCategory("All");setShowAll(true);}}>All systems</button></div></div>
          <div className="filter-tabs">{categories.map(c=><button key={c.value} onClick={()=>{setActiveCategory(c.value);setShowAll(true);}} className={activeCategory===c.value?"filter-tab active":"filter-tab"}><span>{c.icon}</span>{c.name}</button>)}</div>
          <div className="library-results-line"><span>{hasFilters ? "FILTERED RESULTS" : "CURATED SELECTION"}</span><span>{visibleGames.length} / {filteredGames.length} TITLES</span></div>
          <div className="library-grid">{visibleGames.map(game=><GameCard key={game.slug} game={game}/>)}</div>
          {filteredGames.length===0 && <div className="library-empty"><Gamepad2 size={28}/><strong>No games match that search.</strong><span>Try another title or choose a different system.</span><button onClick={()=>{setQuery("");setActiveCategory("All");setShowAll(true);}}>Reset filters</button></div>}
          {!showAll && filteredGames.length>8 && <button className="load-more" onClick={()=>setShowAll(true)}>Load more titles <ArrowRight size={16}/></button>}
          {showAll && filteredGames.length>8 && <button className="load-more" onClick={()=>{setShowAll(false);document.getElementById("library")?.scrollIntoView({behavior:"smooth"});}}>Show fewer titles <ArrowRight size={16}/></button>}
        </section>

        <section className="archive-note" id="classics"><div className="archive-note-icon"><Swords size={21}/></div><div><strong>Built around the real classics.</strong><p>ProSider catalogues real games from the WASM Arcade library. Game engines and game data remain hosted by their respective providers; availability and requirements can vary by title.</p></div><a href="https://wasmarcade.com/about" target="_blank" rel="noreferrer">How it works <ArrowUpRight size={14}/></a></section>
        <footer className="pro-footer"><Link href="/" className="footer-wordmark">PROSIDER<span>®</span></Link><span>AN INDEPENDENT GAME LIBRARY</span><span>© {new Date().getFullYear()} PROSIDER</span><a href="https://wasmarcade.com/" target="_blank" rel="noreferrer">Source archive ↗</a></footer>
      </div>
    </main>
  );
}
