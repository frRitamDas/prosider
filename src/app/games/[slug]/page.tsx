import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { games, getGame } from "@/data/games";
import GamePlayer from "@/components/GamePlayer";

export function generateStaticParams() { return games.map((game) => ({ slug: game.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  return game ? { title: game.title, description: game.description } : { title: "Game not found" };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();
  return <main><div className="site-shell"><header className="topbar"><Link href="/" className="brand"><span className="brand-mark"><Gamepad2 size={22}/></span><span>Pro<em>Sider</em></span></Link><nav className="navlinks"><Link href="/">Discover</Link><Link href="/#library">Games library</Link></nav><div className="top-actions"><Link className="pill-btn primary" href="/#library">More games ↗</Link></div></header>
    <section className="game-page"><Link href="/#library" className="back-link"><ArrowLeft size={15}/> Back to all games</Link><div className="player-layout"><div className="player-main"><GamePlayer game={game}/><section className="section" style={{paddingBottom:0}}><div className="section-kicker">About this game</div><h2>{game.title}</h2><p className="section-subtitle" style={{lineHeight:1.8,maxWidth:720}}>{game.description}</p></section></div><aside className="side-panel"><div><h3>How to play</h3><p>{game.objective}</p></div><div className="side-spacer"/><div><div className="section-kicker" style={{marginBottom:9}}>Controls</div><p>{game.controls}</p></div><div className="side-spacer"/><div><div className="side-stat-row"><span>Category</span><strong>{game.category}</strong></div><div className="side-stat-row"><span>Players</span><strong>{game.players}</strong></div><div className="side-stat-row"><span>Community rating</span><strong>★ {game.rating}</strong></div></div><div className="notice">ProSider originals are designed for quick browser play. Your high score is saved on this device when supported.</div></aside></div></section>
    <footer className="footer"><div><div className="footer-brand">ProSider ✦</div><p>Little games. Big main-character energy.</p></div><div className="footer-links"><Link href="/">Home</Link><Link href="/#library">Game library</Link></div></footer></div></main>;
}
