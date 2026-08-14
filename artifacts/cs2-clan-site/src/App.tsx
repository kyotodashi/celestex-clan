import { FormEvent, type MouseEvent, type ReactNode, useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Crosshair, ExternalLink, Menu, MessageCircle, MoveUpRight, Radio, Shield, Trophy, X, Zap } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resultFilter, setResultFilter] = useState<'all' | 'major' | 'online'>('all');
  const [formSent, setFormSent] = useState(false);
  const [discordNotice, setDiscordNotice] = useState(false);

  const navItems = [
    { label: 'Roster', href: '#roster' },
    { label: 'Results', href: '#results' },
    { label: 'News', href: '#news' },
    { label: 'Recruit', href: '#recruit' },
  ];

  const players = [
    { number: '01', handle: 'Player 01', name: 'Name placeholder', role: 'Role placeholder', origin: 'TBD', stat: '—', detail: 'Placeholder stat' },
    { number: '07', handle: 'Player 02', name: 'Name placeholder', role: 'Role placeholder', origin: 'TBD', stat: '—', detail: 'Placeholder stat' },
    { number: '12', handle: 'Player 03', name: 'Name placeholder', role: 'Role placeholder', origin: 'TBD', stat: '—', detail: 'Placeholder stat' },
    { number: '19', handle: 'Player 04', name: 'Name placeholder', role: 'Role placeholder', origin: 'TBD', stat: '—', detail: 'Placeholder stat' },
    { number: '23', handle: 'Player 05', name: 'Name placeholder', role: 'Role placeholder', origin: 'TBD', stat: '—', detail: 'Placeholder stat' },
  ];

  const results = [
    { event: 'Event placeholder', opponent: 'Opponent placeholder', score: '— : —', date: 'Date TBD', type: 'major', result: 'placeholder' },
    { event: 'Event placeholder', opponent: 'Opponent placeholder', score: '— : —', date: 'Date TBD', type: 'online', result: 'placeholder' },
    { event: 'Event placeholder', opponent: 'Opponent placeholder', score: '— : —', date: 'Date TBD', type: 'major', result: 'placeholder' },
    { event: 'Event placeholder', opponent: 'Opponent placeholder', score: '— : —', date: 'Date TBD', type: 'online', result: 'placeholder' },
  ];

  const filteredResults = resultFilter === 'all' ? results : results.filter((result) => result.type === resultFilter);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  const handleDiscordClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setDiscordNotice(true);
  };

  return (
    <main className="site-shell min-h-[100dvh] bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border/70 bg-background/88 backdrop-blur-xl">
        <div className="section-wrap flex h-[4.6rem] items-center justify-between">
          <a href="#top" data-testid="link-home" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-primary bg-primary font-display text-xl font-black tracking-tight text-primary-foreground">N</span>
            <span className="font-display text-2xl font-bold uppercase leading-none tracking-tight">Nightshift</span>
            <span className="hidden border-l border-border pl-3 font-mono text-[.58rem] uppercase tracking-[.16em] text-muted-foreground sm:block">CS2 / EU</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`} className="nav-link font-mono text-[.68rem] uppercase tracking-[.12em]">{item.label}</a>
            ))}
          </nav>
          <a href="#discord" onClick={handleDiscordClick} data-testid="link-discord" className="button-primary hidden sm:inline-flex"><MessageCircle size={14} /> Join Discord</a>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu" className="border border-border p-2 text-foreground md:hidden">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu border-t border-border bg-sidebar px-4 py-4 md:hidden">
            <nav className="section-wrap flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replace(' ', '-')}`} className="flex items-center justify-between border-b border-border/70 py-3 font-mono text-xs uppercase tracking-[.15em] text-muted-foreground">
                  {item.label}<ArrowUpRight size={14} className="text-primary" />
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {discordNotice && (
        <div className="fixed inset-x-0 top-[4.6rem] z-20 px-4 pt-3" role="status">
          <div className="section-wrap discord-notice flex items-center justify-between gap-4 border border-accent/40 bg-sidebar px-4 py-3">
            <span className="font-mono text-[.61rem] uppercase tracking-[.1em] text-accent">Discord invite placeholder — connect your community link later.</span>
            <button type="button" onClick={() => setDiscordNotice(false)} aria-label="Dismiss Discord notice" className="text-muted-foreground hover:text-foreground"><X size={15} /></button>
          </div>
        </div>
      )}

      <section id="top" className="relative min-h-[760px] border-b border-border pt-[4.6rem]">
        <div className="absolute inset-0 bg-[url('/nightshift-arena.png')] bg-cover bg-center opacity-60" aria-hidden="true" />
        <div className="hero-vignette absolute inset-0" aria-hidden="true" />
        <div className="line-grid absolute inset-0 opacity-[.16]" aria-hidden="true" />
        <div className="section-wrap relative flex min-h-[675px] items-center py-24">
          <div className="max-w-[760px]">
            <div className="reveal eyebrow mb-7 flex items-center gap-3 text-primary"><span className="h-1.5 w-1.5 bg-primary" /> Broadcast // 23:47 CET <span className="text-muted-foreground">—</span> Season 04</div>
            <h1 data-testid="text-hero-title" className="display-title reveal reveal-delay-1 max-w-[720px] text-[clamp(5.7rem,17vw,13.5rem)] text-foreground">Play after<br /><span className="text-primary">dark.</span></h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[31rem] text-balance text-base leading-7 text-muted-foreground md:text-lg">NIGHTSHIFT is a Counter-Strike 2 outfit built for the hours when the server empties and the real work starts. We play composed, curious, and one round ahead.</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
              <a href="#next-match" data-testid="button-hero-match" className="button-primary">View next match <ArrowRight size={15} /></a>
              <a href="#recruit" data-testid="button-hero-recruit" className="button-ghost">Open recruitment <MoveUpRight size={14} /></a>
            </div>
            <div className="reveal reveal-delay-4 mt-20 max-w-[570px] border-t border-border/80 pt-5">
              <p className="placeholder-tag">Placeholder data / replace with Supabase</p>
              <div className="mt-4 grid grid-cols-3 gap-5">
                <div><p className="font-mono text-[.61rem] uppercase tracking-[.13em] text-muted-foreground">World ranking</p><p data-testid="text-ranking" className="mt-2 font-display text-4xl font-bold">—</p></div>
                <div><p className="font-mono text-[.61rem] uppercase tracking-[.13em] text-muted-foreground">Form / last 10</p><p data-testid="text-form" className="mt-2 font-display text-4xl font-bold">—</p></div>
                <div><p className="font-mono text-[.61rem] uppercase tracking-[.13em] text-muted-foreground">Founded</p><p data-testid="text-since" className="mt-2 font-display text-4xl font-bold">TBD</p></div>
              </div>
            </div>
          </div>
          <div className="scanline absolute bottom-10 right-0 hidden h-24 w-48 border-l border-t border-primary/40 lg:block" aria-hidden="true">
            <span className="absolute -left-3 -top-3 h-1.5 w-1.5 bg-primary" />
            <span className="absolute bottom-3 left-4 font-mono text-[.58rem] uppercase tracking-[.18em] text-primary/70">signal / stable</span>
            <span className="absolute right-3 top-3 font-mono text-[.58rem] text-muted-foreground">54° 21' N</span>
          </div>
        </div>
      </section>

      <div className="ticker overflow-hidden py-3">
        <div className="section-wrap flex min-w-max items-center gap-8">
          <span className="eyebrow text-primary">Latest transmission</span>
          <span className="h-1 w-1 bg-primary" />
          <span className="font-mono text-[.66rem] uppercase tracking-[.14em] text-muted-foreground">Placeholder result — connect match data later</span>
          <span className="text-border">/</span>
          <span className="font-mono text-[.66rem] uppercase tracking-[.14em] text-muted-foreground">Next fixture placeholder // date TBD</span>
          <span className="text-border">/</span>
          <span className="font-mono text-[.66rem] uppercase tracking-[.14em] text-accent">Roster applications open</span>
        </div>
      </div>

      <section className="section-wrap relative grid gap-14 py-28 md:grid-cols-[.8fr_1.2fr] md:items-end md:py-36">
        <div>
          <p className="eyebrow accent-line">The brief</p>
          <h2 className="display-title mt-7 text-6xl leading-[.88] md:text-8xl">Quiet<br /><span className="text-primary">pressure.</span></h2>
        </div>
        <div className="max-w-xl md:pb-2">
          <p className="text-2xl font-medium leading-tight text-foreground md:text-3xl">“The scoreboard is loud. Our comms aren't.”</p>
          <p className="mt-7 max-w-lg text-sm leading-7 text-muted-foreground">We are a five-player core from across Europe, meeting nightly in the same server and showing up to the same standard. No noise for the sake of noise — just better decisions, repeated until they hold under pressure.</p>
          <div className="mt-9 flex items-center gap-4 font-mono text-[.64rem] uppercase tracking-[.14em] text-muted-foreground"><span className="h-px w-12 bg-primary" /> Founded in a 02:00 queue / built in public</div>
        </div>
      </section>

      <section id="roster" className="border-y border-border bg-sidebar py-24 md:py-32">
        <div className="section-wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div><p className="eyebrow accent-line">Active roster / 05</p><h2 className="display-title mt-5 text-6xl md:text-8xl">The <span className="text-primary">five.</span></h2></div>
            <p className="max-w-[270px] font-mono text-[.65rem] uppercase leading-5 tracking-[.1em] text-muted-foreground">Same server.<br />Different angles.<br /><span className="text-accent">One read.</span></p>
          </div>
          <p className="mb-5 placeholder-tag">Roster placeholder / replace names and roles with Supabase data</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {players.map((player) => (
              <article key={player.handle} data-testid={`card-player-${player.handle.toLowerCase()}`} className="player-card hover-lift clip-corner flex flex-col justify-between p-5">
                <div className="relative z-10 flex items-start justify-between"><span className="player-number">{player.number}</span><span className="font-mono text-[.6rem] uppercase tracking-[.15em] text-muted-foreground">{player.origin}</span></div>
                <div className="relative z-10 mt-16">
                  <span className="role-chip">{player.role}</span>
                  <h3 className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight">{player.handle}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{player.name}</p>
                  <div className="mt-5 border-t border-border/80 pt-3"><span data-testid={`text-stat-${player.handle.toLowerCase()}`} className="font-display text-2xl font-bold">{player.stat}</span><span className="ml-2 font-mono text-[.55rem] uppercase tracking-[.1em] text-muted-foreground">{player.detail}</span></div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-5"><span className="font-mono text-[.62rem] uppercase tracking-[.14em] text-muted-foreground">Coach / <span className="text-foreground">Rook</span></span><span className="font-mono text-[.62rem] uppercase tracking-[.14em] text-muted-foreground">Analyst / <span className="text-foreground">Nox</span></span><a href="#recruit" data-testid="link-roster-openings" className="font-mono text-[.62rem] uppercase tracking-[.14em] text-primary hover:text-foreground">Roster openings <ArrowRight size={13} className="ml-2 inline" /></a></div>
        </div>
      </section>

      <section id="results" className="section-wrap py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow accent-line">Competitive log</p>
            <h2 className="display-title mt-5 text-6xl md:text-8xl">Recent<br /><span className="text-primary">signal.</span></h2>
            <div className="mt-10">
              <p className="placeholder-tag">Clan statistics placeholder / no live numbers yet</p>
              <div className="mt-4 grid max-w-xs grid-cols-2 gap-x-8 gap-y-6">
                <div><p className="font-mono text-[.6rem] uppercase tracking-[.12em] text-muted-foreground">Win rate</p><p data-testid="text-win-rate" className="mt-1 font-display text-4xl font-bold">—</p></div>
                <div><p className="font-mono text-[.6rem] uppercase tracking-[.12em] text-muted-foreground">Maps won</p><p data-testid="text-maps-won" className="mt-1 font-display text-4xl font-bold">—</p></div>
                <div><p className="font-mono text-[.6rem] uppercase tracking-[.12em] text-muted-foreground">Streak</p><p className="mt-1 font-display text-4xl font-bold text-accent">TBD</p></div>
                <div><p className="font-mono text-[.6rem] uppercase tracking-[.12em] text-muted-foreground">Peak rank</p><p className="mt-1 font-display text-4xl font-bold">—</p></div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex gap-5">
                {(['all', 'major', 'online'] as const).map((filter) => (
                  <button type="button" key={filter} onClick={() => setResultFilter(filter)} data-testid={`button-filter-${filter}`} className={`font-mono text-[.62rem] uppercase tracking-[.13em] transition-colors ${resultFilter === filter ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>{filter === 'all' ? 'All matches' : filter === 'major' ? 'LAN / qualifier' : 'Online'}</button>
                ))}
              </div>
              <span className="font-mono text-[.58rem] uppercase tracking-[.12em] text-muted-foreground">Placeholder season</span>
            </div>
            <div className="space-y-2">
              {filteredResults.length > 0 ? filteredResults.map((match, index) => (
                <article key={`${match.type}-${index}`} data-testid={`row-result-${match.type}-${index + 1}`} className="hover-lift group grid grid-cols-[1fr_auto] items-center gap-5 border-b border-border/70 py-5 md:grid-cols-[1fr_150px_90px_70px]">
                  <div><p className="font-mono text-[.59rem] uppercase tracking-[.11em] text-muted-foreground">{match.event}</p><h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight">{match.opponent}</h3></div>
                  <span className="status-pill hidden text-primary md:block">Placeholder</span>
                  <span className="font-display text-3xl font-bold tracking-tight">{match.score}</span>
                  <span className="font-mono text-[.59rem] uppercase tracking-[.1em] text-muted-foreground">{match.date}</span>
                </article>
              )) : <div data-testid="empty-results" className="border border-dashed border-border p-10 text-center"><p className="font-display text-2xl uppercase">No transmissions</p><p className="mt-2 text-sm text-muted-foreground">This category is clear for now.</p></div>}
            </div>
            <a href="#news" data-testid="link-full-results" className="mt-7 inline-flex items-center gap-2 font-mono text-[.65rem] uppercase tracking-[.14em] text-primary hover:text-foreground">Continue to latest news <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      <section id="next-match" className="relative border-y border-border bg-sidebar py-24 md:py-32">
        <div className="topo-mark left-[57%] top-14 h-72 w-96 opacity-60" aria-hidden="true" />
        <div className="topo-mark left-[52%] top-24 h-80 w-[28rem] opacity-30" aria-hidden="true" />
        <div className="section-wrap relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="eyebrow accent-line">Next match</p><h2 className="display-title mt-5 text-6xl md:text-8xl">Match<br /><span className="text-primary">TBD.</span></h2></div>
            <div className="flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.14em] text-primary"><span className="h-2 w-2 bg-primary" /> Fixture placeholder</div>
          </div>
          <div className="mt-12 grid gap-3 lg:grid-cols-[1.25fr_.75fr]">
            <article className="match-card next clip-corner relative overflow-hidden p-6 md:p-10">
              <div className="flex items-center justify-between border-b border-border/80 pb-5"><span className="status-pill text-primary">Match details placeholder</span><span className="font-mono text-[.62rem] text-muted-foreground">DATE TBD</span></div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-12 md:py-16">
                <div><div className="mb-4 flex h-14 w-14 items-center justify-center border border-primary bg-primary font-display text-4xl font-black text-primary-foreground">N</div><p className="font-display text-4xl font-bold uppercase md:text-5xl">NIGHTSHIFT</p><p className="mt-1 font-mono text-[.58rem] uppercase tracking-[.14em] text-muted-foreground">Team placeholder</p></div>
                <div className="text-center"><span className="font-mono text-xs uppercase tracking-[.16em] text-muted-foreground">vs</span><p data-testid="text-match-time" className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">TBD</p><p className="font-mono text-[.55rem] uppercase tracking-[.14em] text-muted-foreground">Format TBD</p></div>
                <div className="text-right"><div className="mb-4 ml-auto flex h-14 w-14 items-center justify-center border border-accent/60 bg-accent/10 font-display text-3xl font-black text-accent">?</div><p className="font-display text-4xl font-bold uppercase md:text-5xl">OPPONENT TBD</p><p className="mt-1 font-mono text-[.58rem] uppercase tracking-[.14em] text-muted-foreground">Opponent placeholder</p></div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-5"><span className="font-mono text-[.62rem] uppercase tracking-[.12em] text-muted-foreground">Match information placeholder</span><a href="#news" data-testid="link-match-details" className="button-primary">View news <ArrowRight size={14} /></a></div>
            </article>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="glass-card p-6"><CalendarDays size={18} className="text-primary" /><p className="eyebrow mt-6">Where to watch</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Broadcast destination placeholder. Add the official stream link when the fixture is confirmed.</p><span className="mt-5 inline-flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.13em] text-primary">Stream TBD <ArrowRight size={13} /></span></div>
              <div className="glass-card p-6"><Crosshair size={18} className="text-accent" /><p className="eyebrow mt-6">Match notes</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Opponent scouting and map notes will appear here once match data is connected.</p><div className="mt-5 flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.13em] text-accent"><span className="h-1.5 w-1.5 bg-accent" /> Prep phase / placeholder</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="section-wrap py-24 md:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow accent-line">Latest news</p><h2 className="display-title mt-5 text-6xl md:text-8xl">Signal<br /><span className="text-primary">feed.</span></h2></div>
          <p className="max-w-xs font-mono text-[.65rem] uppercase leading-5 tracking-[.1em] text-muted-foreground">Placeholder posts are ready for your future CMS or Supabase feed.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { tag: 'News placeholder', title: 'Roster announcement placeholder', date: 'DATE TBD' },
            { tag: 'Update placeholder', title: 'Tournament update placeholder', date: 'DATE TBD' },
            { tag: 'Media placeholder', title: 'Matchday media placeholder', date: 'DATE TBD' },
          ].map((item, index) => (
            <article key={item.title} className="news-card hover-lift p-6" data-testid={`card-news-${index + 1}`}>
              <div className="flex items-center justify-between gap-3"><span className="role-chip">{item.tag}</span><span className="font-mono text-[.58rem] uppercase tracking-[.1em] text-muted-foreground">{item.date}</span></div>
              <h3 className="mt-14 max-w-[14rem] font-display text-4xl font-bold uppercase leading-[.9] tracking-tight">{item.title}</h3>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">Placeholder copy — replace with your clan's latest announcement when content is ready.</p>
              <span className="mt-7 inline-flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.13em] text-primary">Read more <ArrowUpRight size={13} /></span>
            </article>
          ))}
        </div>
      </section>

      <section id="recruit" className="section-wrap py-24 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow accent-line">Open channel</p>
            <h2 className="display-title mt-5 text-6xl md:text-8xl">Make the<br /><span className="text-primary">room.</span></h2>
            <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground">We are looking for a flexible rifler to complete the next chapter. If you are serious about the work, send the tape. We read everything.</p>
            <div className="mt-10 space-y-4 border-t border-border pt-5">
              <div className="flex items-center gap-3"><Shield size={16} className="text-primary" /><span className="font-mono text-[.63rem] uppercase tracking-[.12em] text-muted-foreground">Age 18+ / EU timezones</span></div>
              <div className="flex items-center gap-3"><Trophy size={16} className="text-primary" /><span className="font-mono text-[.63rem] uppercase tracking-[.12em] text-muted-foreground">Level 10 / team experience</span></div>
              <div className="flex items-center gap-3"><Zap size={16} className="text-primary" /><span className="font-mono text-[.63rem] uppercase tracking-[.12em] text-muted-foreground">Clear comms / curious mind</span></div>
            </div>
          </div>
          <div className="glass-card clip-corner p-6 md:p-9">
            {formSent ? (
              <div data-testid="status-recruitment-success" className="flex min-h-[360px] flex-col justify-center">
                <div className="flex h-12 w-12 items-center justify-center bg-accent text-background"><Check size={22} /></div>
                <p className="eyebrow mt-8 text-accent">Transmission received</p>
                <h3 className="display-title mt-4 text-5xl">We'll read<br /><span className="text-primary">the tape.</span></h3>
                <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Thanks for reaching out. Keep your comms clean — if the fit is right, we will come back through the channel.</p>
                <button type="button" onClick={() => setFormSent(false)} data-testid="button-send-another" className="mt-8 w-fit font-mono text-[.62rem] uppercase tracking-[.13em] text-primary hover:text-foreground">Send another transmission <ArrowRight size={13} className="ml-2 inline" /></button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between border-b border-border pb-5"><div><p className="eyebrow text-primary">Player intake / 01</p><p className="mt-2 font-display text-3xl font-bold uppercase">Join the roster</p></div><Radio size={21} className="text-primary" /></div>
                <label className="block"><span className="font-mono text-[.59rem] uppercase tracking-[.13em] text-muted-foreground">Name / handle</span><input required data-testid="input-recruit-name" name="name" className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" placeholder="e.g. your alias" /></label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block"><span className="font-mono text-[.59rem] uppercase tracking-[.13em] text-muted-foreground">Primary role</span><div className="relative"><select required data-testid="select-recruit-role" name="role" defaultValue="" className="mt-2 w-full appearance-none border-b border-border bg-transparent px-0 py-3 text-sm text-foreground outline-none focus:border-primary"><option value="" disabled>Select a role</option><option value="rifler">Rifler</option><option value="lurker">Lurker</option><option value="awp">AWPer</option><option value="support">Support</option></select><ChevronDown size={14} className="pointer-events-none absolute right-0 top-4 text-muted-foreground" /></div></label>
                  <label className="block"><span className="font-mono text-[.59rem] uppercase tracking-[.13em] text-muted-foreground">Contact / Discord</span><input required data-testid="input-recruit-contact" name="contact" className="mt-2 w-full border-b border-border bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" placeholder="@yourname" /></label>
                </div>
                <label className="block"><span className="font-mono text-[.59rem] uppercase tracking-[.13em] text-muted-foreground">Make the case</span><textarea required data-testid="input-recruit-message" name="message" rows={4} className="mt-2 w-full resize-none border-b border-border bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary" placeholder="What do you see in the server that others miss?" /></label>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3"><span className="max-w-[220px] font-mono text-[.56rem] uppercase leading-4 tracking-[.1em] text-muted-foreground">No spam. No automated replies. Just a human review.</span><button type="submit" data-testid="button-submit-recruitment" className="button-primary">Transmit application <ArrowRight size={14} /></button></div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer-grid py-12">
        <div className="section-wrap">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div><a href="#top" data-testid="link-footer-home" className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center border border-primary bg-primary font-display text-lg font-black text-primary-foreground">N</span><span className="font-display text-2xl font-bold uppercase">Nightshift</span></a><p className="mt-5 max-w-xs font-mono text-[.59rem] uppercase leading-5 tracking-[.11em] text-muted-foreground">A CS2 team for the late hours.<br />© 2025 NIGHTSHIFT ESPORTS.</p></div>
            <div className="flex flex-wrap gap-x-8 gap-y-4"><a href="#roster" data-testid="link-footer-roster" className="font-mono text-[.62rem] uppercase tracking-[.14em] text-muted-foreground hover:text-primary">Roster</a><a href="#results" data-testid="link-footer-results" className="font-mono text-[.62rem] uppercase tracking-[.14em] text-muted-foreground hover:text-primary">Results</a><a href="#news" data-testid="link-footer-news" className="font-mono text-[.62rem] uppercase tracking-[.14em] text-muted-foreground hover:text-primary">News</a><a href="#discord" onClick={handleDiscordClick} data-testid="link-footer-discord" className="inline-flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.14em] text-primary hover:text-foreground"><MessageCircle size={12} /> Discord</a><a href="#recruit" data-testid="link-footer-contact" className="font-mono text-[.62rem] uppercase tracking-[.14em] text-muted-foreground hover:text-primary">Contact</a><a href="mailto:hello@nightshift.gg" data-testid="link-footer-email" className="inline-flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.14em] text-primary hover:text-foreground">hello@nightshift.gg <ExternalLink size={12} /></a></div>
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-border/70 pt-4"><span className="font-mono text-[.56rem] uppercase tracking-[.14em] text-muted-foreground">Built for the next round</span><span className="font-mono text-[.56rem] uppercase tracking-[.14em] text-muted-foreground">Signal clear <span className="ml-2 inline-block h-1.5 w-1.5 bg-accent" /></span></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
