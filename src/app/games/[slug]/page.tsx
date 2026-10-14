import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Gamepad2, Info, Maximize2 } from "lucide-react";
import { games, getGame } from "@/data/games";

export function generateStaticParams() { return games.map((game) => ({ slug: game.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  return game ? { title: `${game.title} — Play online`, description: game.description } : { title: "Game not found" };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  const sourceUrl = `https://wasmarcade.com${game.sourcePath}`;
  return (
    <main className="pro-shell">
      <aside className="pro-sidebar">
        <Link href="/" className="pro-brand"><span className="pro-brand-symbol"><Gamepad2 size={20}/></span><span>pro<span className="brand-accent">sider</span><small>THE ARCADE LIBRARY</small></span></Link>
        <div className="side-label">GAME SESSION</div>
        <nav className="side-nav"><Link href="/" className="side-nav-item"><span className="side-nav-icon"><ArrowLeft size={16}/></span> Back to library</Link><a href="#game-player" className="side-nav-item active"><span className="side-nav-icon"><Gamepad2 size={16}/></span> Play game</a><a href="#game-details" className="side-nav-item"><span className="side-nav-icon"><Info size={16}/></span> Game details</a></nav>
        <div className="sidebar-bottom"><div className="sidebar-status"><span className="status-pulse"/> GAME SOURCE LINKED</div><p>Real game · Original provider</p><span className="sidebar-version">PROSIDER / PLAY</span></div>
      </aside>
      <div className="pro-main">
        <header className="pro-topbar"><div className="breadcrumb"><Link href="/">Library</Link><span>/</span><strong>{game.title}</strong></div><div className="topbar-right"><Link href="/" className="topbar-browse"><ArrowLeft size={14}/> Back to library</Link></div></header>
        <section className="play-page-content">
          <div className="play-title-row"><div><div className="eyebrow-line"><span className="eyebrow-mark"/> {game.category.toUpperCase()} / {game.engine.toUpperCase()}</div><h1>{game.title}</h1><p>{game.description}</p></div><a href={sourceUrl} target="_blank" rel="noreferrer" className="hero-primary open-source-button">Open game <ExternalLink size={15}/></a></div>
          <div className="play-window" id="game-player">
            <div className="play-window-bar"><div className="window-dots"><i/><i/><i/></div><span>GAME SESSION <b>•</b> {game.category.toUpperCase()}</span><a href={sourceUrl} target="_blank" rel="noreferrer" aria-label="Open the game in a new tab"><Maximize2 size={15}/></a></div>
            <div className="external-game-frame"><iframe src={sourceUrl} title={`${game.title} on WASM Arcade`} allow="autoplay; fullscreen; gamepad; pointer-lock; clipboard-read; clipboard-write" allowFullScreen loading="eager" referrerPolicy="strict-origin-when-cross-origin" /></div>
            <div className="frame-fallback"><span>The game is hosted by WASM Arcade. If it does not appear inside this frame, launch it directly.</span><a href={sourceUrl} target="_blank" rel="noreferrer">Play on original site <ArrowUpRight size={15}/></a></div>
          </div>
          <div className="play-info-grid" id="game-details">
            <section className="play-detail-card"><div className="detail-card-label">ABOUT THIS GAME</div><h2>{game.title}</h2><p>{game.description}</p><div className="detail-chips"><span>{game.genre}</span><span>{game.players}</span>{game.year&&<span>{game.year}</span>}</div></section>
            <section className="play-detail-card"><div className="detail-card-label">TECHNICAL DETAILS</div><div className="detail-row"><span>System</span><strong>{game.category}</strong></div><div className="detail-row"><span>Engine</span><strong>{game.engine}</strong></div><div className="detail-row"><span>Provider</span><strong>WASM Arcade</strong></div><div className="detail-row"><span>Hosting</span><strong>External</strong></div>{game.note&&<p className="detail-note">{game.note}</p>}</section>
          </div>
          <div className="source-disclaimer"><Info size={17}/><p><strong>Source transparency.</strong> ProSider is an independent catalogue and is not affiliated with WASM Arcade or the original publishers. The game runs on the original provider's page; if their site prevents embedding, use the direct-play link above.</p></div>
          <div className="back-library-row"><Link href="/" className="hero-secondary"><ArrowLeft size={15}/> Return to game library</Link><a href="https://wasmarcade.com/" target="_blank" rel="noreferrer" className="source-link">Explore full WASM Arcade archive <ArrowUpRight size={14}/></a></div>
        </section>
        <footer className="pro-footer"><Link href="/" className="footer-wordmark">PROSIDER<span>®</span></Link><span>AN INDEPENDENT GAME LIBRARY</span><span>© {new Date().getFullYear()} PROSIDER</span><a href="https://wasmarcade.com/" target="_blank" rel="noreferrer">Source archive ↗</a></footer>
      </div>
    </main>
  );
}
