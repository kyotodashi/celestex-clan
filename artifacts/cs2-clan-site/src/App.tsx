import { useState, type FormEvent } from 'react';

type MatchFilter = 'all' | 'online' | 'tbd';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Clan About', href: '#about' },
  { label: 'Roster', href: '#roster' },
  { label: 'Matches', href: '#matches' },
  { label: 'Stats', href: '#stats' },
  { label: 'News', href: '#news' },
  { label: 'Join', href: '#join' },
];

const players = [
  { number: '01', handle: 'PLAYER 01', role: 'Role TBD', region: 'Region TBD' },
  { number: '07', handle: 'PLAYER 02', role: 'Role TBD', region: 'Region TBD' },
  { number: '12', handle: 'PLAYER 03', role: 'Role TBD', region: 'Region TBD' },
  { number: '19', handle: 'PLAYER 04', role: 'Role TBD', region: 'Region TBD' },
  { number: '23', handle: 'PLAYER 05', role: 'Role TBD', region: 'Region TBD' },
];

const matches = [
  { event: 'Event placeholder', opponent: 'OPPONENT TBD', format: 'Format TBD', date: 'DATE TBD', status: 'tbd' },
  { event: 'Event placeholder', opponent: 'OPPONENT TBD', format: 'Format TBD', date: 'DATE TBD', status: 'online' },
  { event: 'Event placeholder', opponent: 'OPPONENT TBD', format: 'Format TBD', date: 'DATE TBD', status: 'tbd' },
  { event: 'Event placeholder', opponent: 'OPPONENT TBD', format: 'Format TBD', date: 'DATE TBD', status: 'online' },
];

const newsItems = [
  { index: '01', tag: 'News placeholder', title: 'Roster announcement placeholder', date: 'DATE TBD' },
  { index: '02', tag: 'Update placeholder', title: 'Tournament update placeholder', date: 'DATE TBD' },
  { index: '03', tag: 'Media placeholder', title: 'Matchday media placeholder', date: 'DATE TBD' },
];

function NovaMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`nova-mark${compact ? ' nova-mark--compact' : ''}`} aria-hidden="true">
      <span className="nova-mark__orbit" />
      <span className="nova-mark__core">N</span>
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [matchFilter, setMatchFilter] = useState<MatchFilter>('all');
  const [discordNotice, setDiscordNotice] = useState(false);
  const [joinSent, setJoinSent] = useState(false);

  const visibleMatches = matchFilter === 'all' ? matches : matches.filter((match) => match.status === matchFilter);

  const handleJoinSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoinSent(true);
  };

  const showDiscordNotice = () => {
    setDiscordNotice(true);
    window.setTimeout(() => setDiscordNotice(false), 5200);
  };

  return (
    <div className="nova-site">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" data-testid="link-brand" onClick={() => setMenuOpen(false)}>
            <NovaMark compact />
            <span className="brand__words"><strong>NOVA</strong><span>CLAN</span></span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`}>{item.label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-join" href="#join" data-testid="link-header-join">Join the clan <span>↗</span></a>
            <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            <div className="container mobile-nav__inner">
              {navItems.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replace(' ', '-')}`}>
                  <span>0{index + 1}</span>{item.label}<b>↗</b>
                </a>
              ))}
              <button className="mobile-nav__discord" type="button" onClick={showDiscordNotice} data-testid="button-mobile-discord">Discord placeholder <span>↗</span></button>
            </div>
          </nav>
        )}
      </header>

      {discordNotice && (
        <div className="notice" role="status" data-testid="status-discord-notice">
          <span className="notice__pulse" /> Discord invite placeholder — connect your community link later.
          <button type="button" aria-label="Dismiss Discord notice" onClick={() => setDiscordNotice(false)} data-testid="button-dismiss-discord">×</button>
        </div>
      )}

      <main>
        <section id="home" className="hero">
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__flare hero__flare--one" aria-hidden="true" />
          <div className="hero__flare hero__flare--two" aria-hidden="true" />
          <div className="container hero__content">
            <div className="hero__eyebrow"><span className="signal-dot" /> Competitive Counter-Strike 2 / Placeholder division</div>
            <h1>NOVA<br /><em>CLAN</em></h1>
            <div className="hero__bottom">
              <p className="hero__intro">Built for the round that matters.<br />A disciplined community for players<br className="desktop-only" /> who want to play with purpose.</p>
              <div className="hero__buttons">
                <a className="button button--solid" href="#roster" data-testid="button-hero-roster">Explore the roster <span>↘</span></a>
                <a className="button button--line" href="#join" data-testid="button-hero-join">Apply to NOVA <span>↗</span></a>
              </div>
            </div>
            <div className="hero__code">NVC / 001 <span>////</span> EST. TBD <span>////</span> SIGNAL LOCKED</div>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to clan about" data-testid="link-scroll-about"><span>Scroll to enter</span><i>↓</i></a>
        </section>

        <div className="broadcast-bar" aria-label="Placeholder broadcast ticker">
          <div className="broadcast-bar__track"><span className="signal-dot" /> Placeholder data — connect your source later <b>///</b> Next fixture: TBD <b>///</b> Applications: OPEN / PLACEHOLDER <b>///</b> Placeholder data — connect your source later</div>
        </div>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="section-kicker"><span>01</span><i /> Clan about</div>
            <div className="about-copy">
              <p className="overline">The standard is the story.</p>
              <h2>Stay calm.<br /><span>Strike first.</span></h2>
              <p className="lead">NOVA CLAN is a placeholder identity for a focused Counter-Strike 2 community. We are building the systems, culture, and competitive home for people who value preparation over noise.</p>
              <div className="about-notes">
                <div><strong>01</strong><span>Composed<br />communication</span></div>
                <div><strong>02</strong><span>Relentless<br />review</span></div>
                <div><strong>03</strong><span>Shared<br />standard</span></div>
              </div>
            </div>
            <div className="about-emblem">
              <NovaMark />
              <span className="about-emblem__label">NOVA / PLACEHOLDER</span>
              <span className="about-emblem__line" />
              <span className="about-emblem__angle">48° 12' / TBD</span>
            </div>
          </div>
        </section>

        <section id="roster" className="section roster-section">
          <div className="container">
            <div className="section-heading">
              <div><div className="section-kicker"><span>02</span><i /> The roster</div><h2>Five seats.<br /><span>One read.</span></h2></div>
              <p className="section-heading__aside">Active lineup / placeholder<br />Names and roles to be connected<br />from your source later.</p>
            </div>
            <p className="placeholder-note">Placeholder data — connect your source later</p>
            <div className="roster-grid">
              {players.map((player) => (
                <article className="player-card" key={player.number} data-testid={`card-player-${player.number}`}>
                  <div className="player-card__top"><span>{player.number}</span><i>●</i></div>
                  <div className="player-card__silhouette" aria-hidden="true"><span>{player.handle.charAt(player.handle.length - 1)}</span></div>
                  <div className="player-card__bottom"><span className="player-role">{player.role}</span><h3>{player.handle}</h3><p>{player.region} <b>/</b> Stat TBD</p></div>
                </article>
              ))}
            </div>
            <div className="roster-footer"><span>Coach / TBD</span><span>Analyst / TBD</span><a href="#join" data-testid="link-roster-join">Roster openings <b>↗</b></a></div>
          </div>
        </section>

        <section id="matches" className="section matches-section">
          <div className="container">
            <div className="section-heading section-heading--matches">
              <div><div className="section-kicker"><span>03</span><i /> Match center</div><h2>Results<br /><span>pending.</span></h2></div>
              <p className="section-heading__aside">The archive starts here.<br />Every field is ready for<br />verified match data.</p>
            </div>
            <div className="matches-toolbar">
              <div className="filter-tabs" role="tablist" aria-label="Filter matches">
                {(['all', 'online', 'tbd'] as MatchFilter[]).map((filter) => (
                  <button type="button" role="tab" aria-selected={matchFilter === filter} className={matchFilter === filter ? 'is-active' : ''} onClick={() => setMatchFilter(filter)} key={filter} data-testid={`button-filter-${filter}`}>
                    {filter === 'all' ? 'All matches' : filter === 'online' ? 'Online' : 'TBD fixtures'}
                  </button>
                ))}
              </div>
              <span className="placeholder-note">Season / TBD</span>
            </div>
            <div className="match-list">
              {visibleMatches.map((match, index) => (
                <article className="match-row" key={`${match.status}-${index}`} data-testid={`row-match-${index + 1}`}>
                  <span className="match-row__number">0{index + 1}</span>
                  <div className="match-row__event"><span>{match.event}</span><strong>NOVA CLAN <b>vs</b> {match.opponent}</strong></div>
                  <span className="match-row__format">{match.format}</span>
                  <span className="match-row__date">{match.date}</span>
                  <span className="match-row__score">— : —</span>
                </article>
              ))}
            </div>
            <div className="data-callout"><span className="signal-dot" /> Placeholder data — connect your source later <span>Match records, scores, and events will appear here.</span></div>
          </div>
        </section>

        <section id="stats" className="section stats-section">
          <div className="container">
            <div className="section-heading">
              <div><div className="section-kicker"><span>04</span><i /> Clan stats</div><h2>Measure<br /><span>the work.</span></h2></div>
              <p className="section-heading__aside">Verified numbers only.<br />Nothing published until<br />the source is connected.</p>
            </div>
            <div className="stats-grid">
              {[
                ['—', 'Win rate', 'Placeholder'],
                ['—', 'Maps played', 'TBD'],
                ['—', 'World ranking', 'Not ranked'],
                ['TBD', 'Peak rating', 'Placeholder'],
              ].map(([value, label, detail], index) => (
                <div className="stat-card" key={label} data-testid={`card-stat-${index + 1}`}><span className="stat-card__index">0{index + 1}</span><strong>{value}</strong><span>{label}</span><small>{detail}</small></div>
              ))}
            </div>
          </div>
        </section>

        <section id="news" className="section news-section">
          <div className="container">
            <div className="section-heading section-heading--news">
              <div><div className="section-kicker"><span>05</span><i /> Latest news</div><h2>Signal<br /><span>feed.</span></h2></div>
              <p className="section-heading__aside">Announcements, matchday notes,<br />and media from the NOVA<br />channel.</p>
            </div>
            <div className="news-grid">
              {newsItems.map((item) => (
                <article className="news-card" key={item.index} data-testid={`card-news-${item.index}`}>
                  <div className="news-card__top"><span>{item.index}</span><span>{item.tag}</span><span>{item.date}</span></div>
                  <div className="news-card__art" aria-hidden="true"><span>N</span></div>
                  <div className="news-card__body"><h3>{item.title}</h3><p>Placeholder copy — replace with your official update when content is ready.</p><button type="button" className="text-link" onClick={() => setDiscordNotice(true)} data-testid={`button-news-${item.index}`}>Read placeholder <b>↗</b></button></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="join-section">
          <div className="join-section__grid" aria-hidden="true" />
          <div className="container join-inner">
            <div className="section-kicker"><span>06</span><i /> Join the channel</div>
            <h2>Find your<br /><span>frequency.</span></h2>
            <p>Whether you are building your first team or looking for the next standard, leave a signal. We will connect the right people when the channel is ready.</p>
            <button className="button button--solid join-discord" type="button" onClick={showDiscordNotice} data-testid="button-discord-join">Open Discord placeholder <span>↗</span></button>
            <div className="join-divider"><span>or submit an application below</span></div>
            {joinSent ? (
              <div className="join-success" role="status" data-testid="status-join-success"><strong>APPLICATION RECEIVED / PLACEHOLDER</strong><span>Your signal is saved locally for this preview. Connect your intake source later.</span><button type="button" onClick={() => setJoinSent(false)} data-testid="button-join-again">Send another</button></div>
            ) : (
              <form className="join-form" onSubmit={handleJoinSubmit}>
                <label><span>Handle / name</span><input required name="handle" placeholder="PLAYER TBD" data-testid="input-join-handle" /></label>
                <label><span>Primary role</span><select required name="role" defaultValue="" data-testid="select-join-role"><option value="" disabled>Select placeholder</option><option>Rifler — placeholder</option><option>AWPer — placeholder</option><option>Support — placeholder</option><option>Coach — placeholder</option></select></label>
                <label className="join-form__wide"><span>Why NOVA?</span><textarea required name="message" rows={2} placeholder="Your message placeholder" data-testid="input-join-message" /></label>
                <button className="button button--line" type="submit" data-testid="button-submit-join">Transmit application <span>↗</span></button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand" href="#home" data-testid="link-footer-brand"><NovaMark compact /><span className="brand__words"><strong>NOVA</strong><span>CLAN</span></span></a>
          <p>Competitive Counter-Strike 2 community.<br />Placeholder identity / source connection pending.</p>
          <div className="footer-links">
            {navItems.slice(1, 6).map((item) => <a key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase().replace(' ', '-')}`}>{item.label}</a>)}
            <button type="button" onClick={showDiscordNotice} data-testid="button-footer-discord">Discord placeholder</button>
          </div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} NOVA CLAN / PLACEHOLDER</span><span>Placeholder data — connect your source later</span><a href="#home" data-testid="link-footer-top">Back to top ↑</a></div>
      </footer>
    </div>
  );
}

export default App;