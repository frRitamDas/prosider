"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, RotateCcw, Volume2, VolumeX, Play, Pause } from "lucide-react";
import type { Game } from "@/data/games";

type Props = { game: Game };
type State = "idle" | "running" | "paused" | "over";
type Entity = { x:number; y:number; w:number; h:number; vx:number; vy:number; color:string };

export default function GamePlayer({ game }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef<State>("idle");
  const keysRef = useRef<Set<string>>(new Set());
  const entitiesRef = useRef<Entity[]>([]);
  const frameRef = useRef(0);
  const scoreRef = useRef(0);
  const [state, setState] = useState<State>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [saved, setSaved] = useState(false);

  const setGameState = useCallback((next: State) => { stateRef.current = next; setState(next); }, []);

  useEffect(() => {
    try { setBest(Number(localStorage.getItem(`prosider-best-${game.slug}`) || 0)); } catch { /* storage may be unavailable */ }
  }, [game.slug]);

  const start = useCallback(() => {
    if (stateRef.current === "over") { scoreRef.current = 0; setScore(0); frameRef.current = 0; entitiesRef.current = []; }
    if (game.slug === "pixel-blaster") entitiesRef.current = [];
    setGameState("running");
  }, [game.slug, setGameState]);

  const reset = useCallback(() => { scoreRef.current=0; setScore(0); frameRef.current=0; entitiesRef.current=[]; keysRef.current.clear(); setSaved(false); setGameState("idle"); }, [setGameState]);

  const toggleFullscreen = useCallback(async () => {
    try { if (!document.fullscreenElement) await wrapRef.current?.requestFullscreen(); else await document.exitFullscreen(); } catch { /* Fullscreen may be blocked by browser policy */ }
  }, []);

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;
    let width = 960, height = 540;
    const resize = () => { const rect = wrap.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2); width = Math.max(320, rect.width); height = Math.max(220, rect.height); canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr); ctx.setTransform(dpr,0,0,dpr,0,0); };
    const observer = new ResizeObserver(resize); observer.observe(wrap); resize();
    const palette: Record<string,string> = { violet:"#9b8cff", blue:"#66d9ff", pink:"#ff82ca", orange:"#ffb46d", green:"#76edb7" };
    const accent = palette[game.accent] || palette.blue;
    const draw = (time: number) => {
      ctx.clearRect(0,0,width,height);
      const grad = ctx.createLinearGradient(0,0,width,height); grad.addColorStop(0,"#0b1124"); grad.addColorStop(1,"#10182e"); ctx.fillStyle=grad; ctx.fillRect(0,0,width,height);
      ctx.strokeStyle="rgba(150,175,255,.075)"; ctx.lineWidth=1;
      for(let x=0;x<width;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();}
      for(let y=0;y<height;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke();}
      const glow = (x:number,y:number,r:number,color:string) => { const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color+"44");g.addColorStop(1,color+"00");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill(); };
      glow(width*.5,height*.5,Math.min(width,height)*.5,accent);
      if(stateRef.current === "running") frameRef.current++;
      const frame = frameRef.current;
      const roundRect = (x:number,y:number,w:number,h:number,r:number,color:string) => {ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();};
      if(game.slug === "neon-dash" || game.slug === "skyline-sprint") {
        const ground = height*.78; ctx.fillStyle="#202a47";ctx.fillRect(0,ground,width,height-ground);ctx.fillStyle=accent;ctx.fillRect(0,ground,width,3);
        for(let i=0;i<12;i++){const bx=(i*113-frame*3%(width+113)+width+113)%(width+113);ctx.fillStyle="rgba(140,165,255,.10)";ctx.fillRect(bx,ground-30-(i%3)*24,30,30+(i%3)*24);}
        const player={x:width*.18,y:ground-28,w:24,h:28}; let jump=0;
        if(stateRef.current==="running" && keysRef.current.has(" ") && frame%45<13) jump=Math.sin((frame%45)/13*Math.PI)*65;
        if(stateRef.current==="running" && keysRef.current.has("ArrowUp") && frame%45<13) jump=Math.sin((frame%45)/13*Math.PI)*65;
        ctx.shadowBlur=20;ctx.shadowColor=accent;roundRect(player.x,player.y-jump,player.w,player.h,7,accent);ctx.shadowBlur=0;
        const obsX=width-((frame*5)%(width+60));const obsY=ground-22;roundRect(obsX,obsY,18,22,4,"#ff6d9d");
        if(stateRef.current==="running" && obsX<player.x+player.w && obsX+18>player.x && jump<15){setGameState("over");saveBest(scoreRef.current);}
        if(stateRef.current==="running" && frame%10===0){scoreRef.current++;setScore(scoreRef.current);}
        ctx.fillStyle="#dce5ff";ctx.font="600 18px Space Grotesk, sans-serif";ctx.fillText(`SCORE  ${scoreRef.current}`,24,35);
      } else if(game.slug === "pixel-blaster") {
        const shipX=Math.max(24,Math.min(width-24,width*.5+(keysRef.current.has("ArrowLeft")?-1:0)*frame*2+(keysRef.current.has("ArrowRight")?1:0)*frame*2));
        if(stateRef.current==="running" && frame%55===1) entitiesRef.current.push({x:Math.random()*(width-30)+15,y:-15,w:18,h:18,vx:0,vy:1.6+Math.random(),color:"#ff7da9"});
        if(stateRef.current==="running" && keysRef.current.has(" ") && frame%10===0) entitiesRef.current.push({x:shipX,y:height*.79,w:4,h:14,vx:0,vy:-7,color:accent});
        entitiesRef.current=entitiesRef.current.filter(e=>e.y<height+30&&e.y>-40);
        for(const e of entitiesRef.current){e.y+=e.vy;if(e.vy<0){for(const t of entitiesRef.current){if(t.vy>0&&Math.abs(t.x-e.x)<17&&Math.abs(t.y-e.y)<20){t.y=height+50;e.y=-50;scoreRef.current+=10;setScore(scoreRef.current);break;}}}else if(e.y>height*.78&&Math.abs(e.x-shipX)<20){setGameState("over");saveBest(scoreRef.current);}}
        ctx.fillStyle=accent;ctx.beginPath();ctx.moveTo(shipX,height*.8-22);ctx.lineTo(shipX-18,height*.8+12);ctx.lineTo(shipX+18,height*.8+12);ctx.closePath();ctx.fill();
        for(const e of entitiesRef.current){ctx.fillStyle=e.color;ctx.shadowBlur=12;ctx.shadowColor=e.color;ctx.fillRect(e.x,e.y,e.w,e.h);ctx.shadowBlur=0;}
        if(stateRef.current==="running"&&frame%30===0){scoreRef.current++;setScore(scoreRef.current);}ctx.fillStyle="#dce5ff";ctx.font="600 18px Space Grotesk, sans-serif";ctx.fillText(`SCORE  ${scoreRef.current}`,24,35);
      } else if(game.slug === "block-party") {
        const cols=10,rows=18,cell=Math.min((width*.58)/cols,(height*.78)/rows);const ox=(width-cols*cell)/2,oy=(height-rows*cell)/2;const boardRef=entitiesRef.current;
        if(stateRef.current==="running"&&frame%22===0){boardRef.push({x:Math.floor(Math.random()*cols),y:0,w:1,h:1,vx:0,vy:1,color:[accent,"#65dbff","#ff82ca","#ffce73"][Math.floor(Math.random()*4)]});}
        if(stateRef.current==="running"&&frame%22===0){for(const e of boardRef)e.y+=1;const fullRows=new Set(boardRef.filter(e=>e.y>=rows-1).map(e=>e.y));if(fullRows.size){scoreRef.current+=fullRows.size*100;setScore(scoreRef.current);boardRef.splice(0,boardRef.length,...boardRef.filter(e=>!fullRows.has(e.y)).map(e=>({...e,y:Math.min(rows-1,e.y+fullRows.size)})));}if(boardRef.some(e=>e.y>=rows-1)){setGameState("over");saveBest(scoreRef.current);}}
        for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){ctx.strokeStyle="rgba(160,180,255,.09)";ctx.strokeRect(ox+x*cell,oy+y*cell,cell,cell);}
        for(const e of boardRef){roundRect(ox+e.x*cell+1,oy+e.y*cell+1,cell-2,cell-2,3,e.color);}
        ctx.fillStyle="#dce5ff";ctx.font="600 18px Space Grotesk, sans-serif";ctx.fillText(`SCORE  ${scoreRef.current}`,24,35);
      } else {
        const paddleX=Math.max(45,Math.min(width-45,(keysRef.current.has("ArrowLeft")?width*.4:keysRef.current.has("ArrowRight")?width*.6:width*.5)));
        const ballX=width*.5+Math.sin(frame*.045)*width*.27,ballY=height*.45+Math.cos(frame*.035)*height*.22;
        roundRect(paddleX-45,height*.82,90,12,6,accent);ctx.shadowBlur=18;ctx.shadowColor=accent;ctx.beginPath();ctx.arc(ballX,ballY,9,0,Math.PI*2);ctx.fillStyle="#fff";ctx.fill();ctx.shadowBlur=0;
        for(let i=0;i<8;i++){roundRect(30+i*((width-60)/8),height*.2,Math.max(14,width/15),13,4,["#8c9fff","#68dcff","#ff82ca","#ffbd7b"][i%4]);}
        if(stateRef.current==="running"&&frame%20===0){scoreRef.current++;setScore(scoreRef.current);}ctx.fillStyle="#dce5ff";ctx.font="600 18px Space Grotesk, sans-serif";ctx.fillText(`SCORE  ${scoreRef.current}`,24,35);
      }
      if(stateRef.current==="paused"){ctx.fillStyle="#070a12aa";ctx.fillRect(0,0,width,height);ctx.fillStyle="#fff";ctx.font="700 30px Space Grotesk, sans-serif";ctx.textAlign="center";ctx.fillText("PAUSED",width/2,height/2);ctx.textAlign="left";}
      if(stateRef.current==="over"){ctx.fillStyle="#070a12bb";ctx.fillRect(0,0,width,height);ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="700 30px Space Grotesk, sans-serif";ctx.fillText("RUN OVER",width/2,height/2-10);ctx.font="500 14px DM Sans, sans-serif";ctx.fillStyle="#b8c4e8";ctx.fillText(`Score: ${scoreRef.current} · Press Play again to retry`,width/2,height/2+20);ctx.textAlign="left";}
      if(stateRef.current==="idle"){ctx.fillStyle="#cbd6ff";ctx.textAlign="center";ctx.font="600 16px DM Sans, sans-serif";ctx.fillText("READY WHEN YOU ARE",width/2,height*.72);ctx.textAlign="left";}
      rafRef.current=requestAnimationFrame(draw);
    };
    const saveBest = (value:number) => {try{const current=Number(localStorage.getItem(`prosider-best-${game.slug}`)||0);if(value>current){localStorage.setItem(`prosider-best-${game.slug}`,String(value));setBest(value);setSaved(true);}}catch{/* storage optional */}};
    const onKeyDown=(event:KeyboardEvent)=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," "].includes(event.key)){event.preventDefault();keysRef.current.add(event.key);}if(event.key.toLowerCase()==="p")setGameState(stateRef.current==="running"?"paused":"running");};
    const onKeyUp=(event:KeyboardEvent)=>keysRef.current.delete(event.key);
    window.addEventListener("keydown",onKeyDown);window.addEventListener("keyup",onKeyUp);
    rafRef.current=requestAnimationFrame(draw);
    return()=>{observer.disconnect();window.removeEventListener("keydown",onKeyDown);window.removeEventListener("keyup",onKeyUp);if(rafRef.current!==null)cancelAnimationFrame(rafRef.current);};
  }, [game, setGameState]);

  return <div className="player-frame" ref={wrapRef}><div className="player-top"><span>{game.icon} &nbsp; {game.title}</span><span className="live-status"><i/> Browser game · Local play</span></div><div className="player-canvas-wrap"><canvas ref={canvasRef} aria-label={`${game.title} game canvas`}/>{state==="idle"&&<div className="player-overlay"><div className="overlay-icon">{game.icon}</div><h2>Ready, player one?</h2><p>{game.objective}</p><button className="pill-btn primary start-btn" onClick={start}><Play size={15} fill="currentColor"/> Start playing</button></div>}{state==="over"&&<div className="player-overlay"><div className="overlay-icon">✨</div><h2>Nice run!</h2><p>You scored {score} points. Your best score is {Math.max(best,score)}.</p><button className="pill-btn primary start-btn" onClick={start}><RotateCcw size={15}/> Play again</button></div>}</div><div className="player-controls"><button className="control-btn primary" onClick={()=>state==="running"?setGameState("paused"):state==="paused"?setGameState("running"):start()}>{state==="running"?<Pause size={14}/>:<Play size={14}/>} {state==="running"?"Pause":state==="paused"?"Resume":"Play"}</button><button className="control-btn" onClick={reset}><RotateCcw size={14}/> Restart</button><button className="control-btn" onClick={toggleFullscreen}><Maximize2 size={14}/> {isFullscreen?"Exit fullscreen":"Fullscreen"}</button><button className="control-btn" onClick={()=>setMuted(!muted)}>{muted?<VolumeX size={14}/>:<Volume2 size={14}/>} {muted?"Sound off":"Sound on"}</button><span className="player-hint">SCORE {score} · BEST {Math.max(best,score)}</span></div></div>;
}
