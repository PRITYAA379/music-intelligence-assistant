'use client'

import { useRef, useState } from 'react'
import {
  Activity,
  AudioLines,
  ChevronDown,
  CircleHelp,
  Download,
  FileAudio,
  Info,
  Layers3,
  Menu,
  Mic2,
  MoreHorizontal,
  Music2,
  Pause,
  Play,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Upload,
  WandSparkles,
  X,
  Zap,
} from 'lucide-react'

const waveform = [16, 24, 13, 31, 22, 18, 34, 25, 17, 28, 39, 22, 15, 27, 35, 20, 14, 31, 25, 18, 38, 29, 20, 14, 26, 36, 22, 17, 29, 40, 23, 16, 31, 21, 14, 27, 35, 18, 23, 32, 20, 14, 25, 37, 19, 28, 17, 23, 35, 26, 14, 21, 33, 19, 25, 38, 20, 15, 28, 35, 22, 17, 30, 25, 18, 33, 21, 16, 27, 39, 22, 14, 24, 34, 18, 26, 32, 21, 15, 28, 37, 23, 18, 31, 20, 14, 26, 36, 22, 17, 29, 40, 23, 16, 31, 21, 14, 27, 35, 18, 23, 32, 20, 14, 25, 37, 19, 28, 17, 23, 35, 26, 14, 21, 33, 19, 25, 38, 20, 15, 28, 35, 22, 17, 30, 25, 18, 33, 21, 16, 27, 39, 22, 14, 24, 34, 18, 26, 32, 21, 15, 28, 37, 23, 18, 31, 20, 14, 26, 36, 22, 17, 29, 40]

const categories = ['All', 'Drums', 'FX', 'Melodic', 'Bass', 'Vocals', 'Textures']
const presets = [
  { name: 'Neon Rimshot', type: 'DRUMS', duration: '0:01', color: 'from-orange-500/50 to-rose-500/10' },
  { name: 'Glass Cathedral', type: 'TEXTURE', duration: '0:04', color: 'from-cyan-400/40 to-blue-500/10' },
  { name: 'Submarine Bloom', type: 'BASS', duration: '0:03', color: 'from-emerald-400/40 to-cyan-500/10' },
]

function Waveform({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-px overflow-hidden ${compact ? 'h-10' : 'h-24'}`} aria-label="Audio waveform visualization">
      {waveform.map((height, index) => (
        <span
          key={index}
          className={`min-w-px flex-1 rounded-full ${index < waveform.length * 0.41 ? 'bg-primary' : 'bg-muted-foreground/30'}`}
          style={{ height: `${compact ? Math.max(4, height / 2) : height}px` }}
        />
      ))}
    </div>
  )
}

function SonoraLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
        <AudioLines className="size-4" />
      </div>
      <span className="font-mono text-sm font-semibold tracking-[0.24em] text-foreground">SONORA</span>
    </div>
  )
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'generate'>('analyze')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [prompt, setPrompt] = useState('A dusty, swung hip-hop kick with a soft transient and tape warmth')
  const [activeCategory, setActiveCategory] = useState('All')
  const [generated, setGenerated] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function downloadDemo() {
    const sampleRate = 44100
    const duration = 1.1
    const sampleCount = Math.floor(sampleRate * duration)
    const buffer = new ArrayBuffer(44 + sampleCount * 2)
    const view = new DataView(buffer)
    const write = (offset: number, value: string) => [...value].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)))
    write(0, 'RIFF')
    view.setUint32(4, buffer.byteLength - 8, true)
    write(8, 'WAVE'); write(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true)
    view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); write(36, 'data'); view.setUint32(40, buffer.byteLength - 44, true)
    for (let i = 0; i < sampleCount; i++) { const t = i / sampleRate; const envelope = Math.max(0, 1 - t * 2.2); view.setInt16(44 + i * 2, Math.sin(t * Math.PI * 2 * 92) * envelope * 22000, true) }
    const url = URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' })); const a = document.createElement('a'); a.href = url; a.download = 'sonora-one-shot.wav'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex h-16 items-center justify-between border-b border-border/60 px-5 lg:px-8">
        <div className="flex items-center gap-8"><SonoraLogo /><span className="hidden border-l border-border pl-8 text-xs text-muted-foreground md:block">AI MUSIC WORKSTATION</span></div>
        <div className="flex items-center gap-3"><button className="hidden items-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground transition hover:bg-secondary sm:flex"><CircleHelp className="size-3.5" /> Guide</button><button className="rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground" aria-label="Settings"><Settings2 className="size-4" /></button><div className="size-7 rounded-full bg-gradient-to-br from-primary to-muted-foreground" aria-label="Profile" /></div>
      </header>

      <div className="mx-auto flex max-w-[1480px]">
        <aside className="hidden w-56 shrink-0 border-r border-border/60 p-5 lg:block"><div className="flex flex-col gap-1"><p className="mb-3 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Workspace</p><button className="flex items-center gap-3 rounded-md bg-secondary px-3 py-2.5 text-left text-sm font-medium text-foreground"><Activity className="size-4 text-primary" /> Analyze track</button><button onClick={() => setActiveTab('generate')} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"><WandSparkles className="size-4" /> One-shot lab</button><button className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"><Layers3 className="size-4" /> My library</button></div><div className="mt-10 border-t border-border/60 pt-5"><p className="mb-3 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Recent sessions</p>{['Late night bounce', 'Ideas — 09/04', 'Drum palette'].map((item) => <button key={item} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"><FileAudio className="size-3.5" />{item}</button>)}</div><div className="mt-auto pt-28"><div className="rounded-lg border border-primary/20 bg-primary/5 p-3"><div className="mb-2 flex items-center gap-2 text-xs font-medium"><Zap className="size-3.5 text-primary" /> Pro workspace</div><p className="text-[11px] leading-relaxed text-muted-foreground">Unlimited analyses and high-fidelity generations.</p></div></div></aside>

        <section className="min-w-0 flex-1 px-5 py-7 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-5xl"><div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary"><span className="size-1.5 rounded-full bg-primary" /> Studio / 01</p><h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Make the idea audible.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Your AI producer for the details that make a track work. Analyze a song or describe the exact sound in your head.</p></div><div className="flex rounded-lg border border-border bg-card p-1"><button onClick={() => setActiveTab('analyze')} className={`rounded-md px-4 py-2 text-xs font-medium transition ${activeTab === 'analyze' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}><Activity className="mr-2 inline size-3.5" />Analyze</button><button onClick={() => setActiveTab('generate')} className={`rounded-md px-4 py-2 text-xs font-medium transition ${activeTab === 'generate' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}><WandSparkles className="mr-2 inline size-3.5" />One-shot lab</button></div></div>

            {activeTab === 'analyze' ? <div className="flex flex-col gap-5"><div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]"><div className="rounded-xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border/60 px-5 py-4"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-md bg-secondary"><Music2 className="size-4 text-primary" /></div><div><p className="text-sm font-medium">{isAnalyzed ? 'Midnight Drive.wav' : 'Drop a track to begin'}</p><p className="text-xs text-muted-foreground">{isAnalyzed ? 'WAV · 44.1 kHz · 24-bit' : 'MP3, WAV, AIFF up to 200MB'}</p></div></div>{isAnalyzed && <button className="text-muted-foreground hover:text-foreground" aria-label="More options"><MoreHorizontal className="size-4" /></button>}</div><div className="p-5">{isAnalyzed ? <><div className="mb-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground"><span>00:00</span><span>02:48</span></div><Waveform /><div className="mt-5 flex items-center gap-3"><button onClick={() => setIsPlaying(!isPlaying)} className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90" aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}</button><div className="h-1 flex-1 rounded-full bg-secondary"><div className="h-1 w-[41%] rounded-full bg-primary" /></div><span className="font-mono text-xs text-muted-foreground">{isPlaying ? '00:41' : '00:00'}</span></div></> : <button onClick={() => fileRef.current?.click()} className="flex min-h-52 w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background/40 transition hover:border-primary/60 hover:bg-primary/5"><div className="mb-4 flex size-12 items-center justify-center rounded-full bg-secondary"><Upload className="size-5 text-primary" /></div><p className="text-sm font-medium">Upload an audio file</p><p className="mt-1 text-xs text-muted-foreground">or drag and drop it here</p></button>}<input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={() => setIsAnalyzed(true)} />{!isAnalyzed && <button onClick={() => setIsAnalyzed(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-xs font-medium text-primary-foreground transition hover:opacity-90"><Sparkles className="size-3.5" /> Use demo track</button>}</div></div>

              <div className="rounded-xl border border-border bg-card p-5"><div className="mb-5 flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Track profile</p><p className="mt-1 text-sm font-medium">Core information</p></div><Info className="size-4 text-muted-foreground" /></div><div className="grid grid-cols-2 gap-3">{[['Key', 'F♯ minor'], ['BPM', '128'], ['Scale', 'Natural minor'], ['Energy', '0.78']].map(([label, value]) => <div key={label} className="rounded-lg bg-secondary/70 p-3"><p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 text-base font-medium">{isAnalyzed ? value : '—'}</p></div>)}</div><button onClick={() => setIsAnalyzed(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-border py-2.5 text-xs font-medium transition hover:bg-secondary"><Sparkles className="size-3.5 text-primary" /> {isAnalyzed ? 'Re-analyze track' : 'Analyze track'}</button></div></div>

              <div className="grid gap-5 md:grid-cols-[1fr_1fr]"><div className="rounded-xl border border-border bg-card p-5"><div className="mb-4 flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Producer notes</p><button className="text-muted-foreground hover:text-foreground" aria-label="Close notes"><X className="size-4" /></button></div><p className="text-sm leading-6 text-muted-foreground">This track sits confidently in <span className="text-foreground">F♯ minor</span>, with a steady <span className="text-foreground">128 BPM</span> pulse. The energy peaks around the chorus — consider contrasting it with a brighter texture in the second half.</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] text-primary">F♯m</span><span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[10px] text-muted-foreground">128 BPM</span><span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[10px] text-muted-foreground">4/4</span></div></div><div className="rounded-xl border border-border bg-card p-5"><div className="mb-4 flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Energy map</p><span className="font-mono text-[10px] text-muted-foreground">LOW <span className="mx-1">—</span> HIGH</span></div><div className="flex h-24 items-end gap-1">{[22, 32, 28, 40, 48, 42, 55, 49, 62, 58, 70, 78, 70, 84, 76, 92, 86, 74, 80, 68, 76, 65, 52, 61, 46, 39, 48, 35, 28, 24].map((height, i) => <span key={i} className={`flex-1 rounded-t-sm ${i > 20 ? 'bg-primary/50' : 'bg-primary'}`} style={{ height: `${height}%` }} />)}</div></div></div></div> : <div className="flex flex-col gap-5"><div className="rounded-xl border border-border bg-card p-5"><div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Describe your sound</p><p className="mt-1 text-sm text-muted-foreground">The more specific the vision, the more useful the result.</p></div><button className="flex items-center gap-2 self-start rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:bg-secondary"><Mic2 className="size-3.5" /> Voice brief</button></div><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-32 w-full resize-none rounded-lg border border-border bg-background p-4 text-sm leading-6 outline-none transition placeholder:text-muted-foreground focus:border-primary" placeholder="Describe the sound in your head..." /><div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div className="flex flex-wrap gap-2">{['128 BPM', 'F♯ minor', '1-shot'].map((tag) => <span key={tag} className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[10px] text-muted-foreground">{tag}</span>)}<button className="rounded-full border border-dashed border-border px-2.5 py-1 text-[10px] text-muted-foreground hover:border-primary hover:text-primary"><Plus className="mr-1 inline size-3" /> Add context</button></div><button onClick={() => setGenerated(true)} className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition hover:opacity-90"><Sparkles className="size-3.5" /> Generate one-shot</button></div></div><div className="flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Sound library</p><p className="mt-1 text-sm text-muted-foreground">{generated ? 'Generated from your brief' : 'Start with a curated direction'}</p></div><button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">Sort: Newest <ChevronDown className="size-3.5" /></button></div><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${activeCategory === category ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>{category}</button>)}</div><div className="grid gap-3 md:grid-cols-3">{presets.map((sound) => <div key={sound.name} className="group rounded-xl border border-border bg-card p-4 transition hover:border-primary/50"><div className={`mb-4 flex h-24 items-center rounded-lg bg-gradient-to-br ${sound.color} px-3`}><Waveform compact /></div><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium">{sound.name}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{sound.type} · {sound.duration}</p></div><button onClick={downloadDemo} className="rounded-md p-1.5 text-muted-foreground opacity-0 transition hover:bg-secondary hover:text-foreground group-hover:opacity-100" aria-label={`Download ${sound.name}`}><Download className="size-4" /></button></div><div className="mt-4 flex items-center gap-2"><button className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label={`Play ${sound.name}`}><Play className="size-3 fill-current" /></button><div className="h-1 flex-1 rounded-full bg-secondary"><div className="h-1 w-1/3 rounded-full bg-primary/70" /></div><button className="text-muted-foreground hover:text-foreground" aria-label="More options"><MoreHorizontal className="size-4" /></button></div></div>)}</div></div>}
          </div>
        </section>
      </div>
    </main>
  )
}
