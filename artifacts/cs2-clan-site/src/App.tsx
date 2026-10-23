import { useState, type FormEvent } from 'react';

type MatchFilter = 'all' | 'online' | 'tbd';

const navItems = [
  { label: 'Нүүр', href: '#home' },
  { label: 'Кланы тухай', href: '#about' },
  { label: 'Бүрэлдэхүүн', href: '#roster' },
  { label: 'Тоглолтууд', href: '#matches' },
  { label: 'Статистик', href: '#stats' },
  { label: 'Мэдээ', href: '#news' },
  { label: 'Элсэх', href: '#join' },
];

const players = [
  {
    number: '01',
    handle: 'Unknown',
    role: 'IGL / RIFLER',
    region: 'MONGOLIA',
  },
  {
    number: '02',
    handle: 'Unknown',
    role: 'AWPER',
    region: 'MONGOLIA',
  },
  {
    number: '03',
    handle: 'Unknown',
    role: 'RIFLER',
    region: 'MONGOLIA',
  },
  {
    number: '04',
    handle: 'Unknown',
    role: 'ENTRY',
    region: 'MONGOLIA',
  },
  {
    number: '05',
    handle: 'Unknown',
    role: 'SUPPORT',
    region: 'MONGOLIA',
  },
];

const matches = [
  {
    event: 'CS2 COMMUNITY LEAGUE',
    opponent: 'TBD',
    format: 'BO3',
    date: 'COMING SOON',
    status: 'tbd',
  },
  {
    event: 'WEEKLY SHOWDOWN',
    opponent: 'TBD',
    format: 'BO3',
    date: 'COMING SOON',
    status: 'online',
  },
  {
    event: 'COMMUNITY CUP',
    opponent: 'TBD',
    format: 'BO1',
    date: 'COMING SOON',
    status: 'tbd',
  },
  {
    event: 'CLAN SHOWMATCH',
    opponent: 'TBD',
    format: 'BO3',
    date: 'COMING SOON',
    status: 'online',
  },
];

const newsItems = [
  {
    index: '01',
    tag: 'ROSTER',
    title: 'POPULAR шинэ бүрэлдэхүүнээ танилцууллаа',
    date: '16.08.2026',
  },
  {
    index: '02',
    tag: 'COMPETITIVE',
    title: 'Дараагийн тэмцээний бэлтгэл эхэллээ',
    date: 'COMING SOON',
  },
  {
    index: '03',
    tag: 'COMMUNITY',
    title: 'POPULAR Community-д нэгдээрэй',
    date: 'OPEN NOW',
  },
];

function NovaMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`nova-mark${compact ? ' nova-mark--compact' : ''}`}
      aria-hidden="true"
    >
      <span className="nova-mark__orbit" />
      <span className="nova-mark__core">C</span>
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [matchFilter, setMatchFilter] = useState<MatchFilter>('all');
  const [discordNotice, setDiscordNotice] = useState(false);
  const [joinSent, setJoinSent] = useState(false);

  const visibleMatches =
    matchFilter === 'all'
      ? matches
      : matches.filter((match) => match.status === matchFilter);

  const handleJoinSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoinSent(true);
  };

  const showDiscordNotice = () => {
    setDiscordNotice(true);

    window.setTimeout(() => {
      setDiscordNotice(false);
    }, 5000);
  };

  return (
    <div className="nova-site">
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            <NovaMark compact />

            <span className="brand__words">
              <strong>CELESTEX</strong>
              <span>CLAN</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-join" href="#join">
              Кланд нэгдэх <span>↗</span>
            </a>

            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            <div className="container mobile-nav__inner">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                  <b>↗</b>
                </a>
              ))}

              <button
                className="mobile-nav__discord"
                type="button"
                onClick={showDiscordNotice}
              >
                Discord-д нэгдэх <span>↗</span>
              </button>
            </div>
          </nav>
        )}
      </header>

      {discordNotice && (
        <div className="notice" role="status">
          <span className="notice__pulse" />
          Discord Community — invite link-ээ энд холбоно

          <button
            type="button"
            onClick={() => setDiscordNotice(false)}
          >
            ×
          </button>
        </div>
      )}

      <main>
        <section id="home" className="hero">
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__flare hero__flare--one" aria-hidden="true" />
          <div className="hero__flare hero__flare--two" aria-hidden="true" />

          <div className="container hero__content">
            <div className="hero__eyebrow">
              <span className="signal-dot" />
              MONGOLIAN COUNTER-STRIKE 2 / COMPETITIVE CLAN
            </div>

            <h1>
              CELESTEX
              <br />
              <em>CLAN</em>
            </h1>

            <div className="hero__bottom">
              <p className="hero__intro">
                Бэлтгэл.
                <br />
                Сахилга бат.
                <br />
                Ялалтын төлөө.
              </p>

              <div className="hero__buttons">
                <a className="button button--solid" href="#roster">
                  Бүрэлдэхүүн харах <span>↘</span>
                </a>

                <a className="button button--line" href="#join">
                  Кланд нэгдэх <span>↗</span>
                </a>
              </div>
            </div>

            <div className="hero__code">
              CELTX / 001 <span>////</span> MGL <span>////</span> SIGNAL ACTIVE
            </div>
          </div>

          <a className="scroll-cue" href="#about">
            <span>Доош үргэлжлүүлэх</span>
            <i>↓</i>
          </a>
        </section>

        <div className="broadcast-bar">
          <div className="broadcast-bar__track">
            <span className="signal-dot" />
            POPULAR CLAN
            <b>///</b>
            MONGOLIA
            <b>///</b>
            COUNTER-STRIKE 2
            <b>///</b>
            COMMUNITY OPEN
            <b>///</b>
            POPULAR CLAN
          </div>
        </div>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="section-kicker">
              <span>01</span>
              <i />
              Клан
            </div>

            <div className="about-copy">
              <p className="overline">Бидний стандарт.</p>

              <h2>
                Тайван.
                <br />
                <span>Хурдан.</span>
              </h2>

              <p className="lead">
                POPULAR бол Counter-Strike 2 тоглогчид,
                баг болон community-г нэгтгэсэн Монголын
                өрсөлдөөнт gaming clan юм.
              </p>

              <div className="about-notes">
                <div>
                  <strong>01</strong>
                  <span>
                    Багийн
                    <br />
                    ажиллагаа
                  </span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>
                    Тогтмол
                    <br />
                    бэлтгэл
                  </span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>
                    Нэг
                    <br />
                    стандарт
                  </span>
                </div>
              </div>
            </div>

            <div className="about-emblem">
              <NovaMark />

              <span className="about-emblem__label">
                POPULAR / MONGOLIA
              </span>

              <span className="about-emblem__line" />

              <span className="about-emblem__angle">
                47° 55' / MGL
              </span>
            </div>
          </div>
        </section>

        <section id="roster" className="section roster-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="section-kicker">
                  <span>02</span>
                  <i />
                  Бүрэлдэхүүн
                </div>

                <h2>
                  Five players.
                  <br />
                  <span>One team.</span>
                </h2>
              </div>

              <p className="section-heading__aside">
                POPULAR active lineup
                <br />
                Counter-Strike 2
                <br />
                Mongolia
              </p>
            </div>

            <div className="roster-grid">
              {players.map((player) => (
                <article className="player-card" key={player.number}>
                  <div className="player-card__top">
                    <span>{player.number}</span>
                    <i>●</i>
                  </div>

                  <div
                    className="player-card__silhouette"
                    aria-hidden="true"
                  >
                    <span>{player.handle.charAt(0)}</span>
                  </div>

                  <div className="player-card__bottom">
                    <span className="player-role">
                      {player.role}
                    </span>

                    <h3>{player.handle}</h3>

                    <p>
                      {player.region}
                      <b> / </b>
                      ACTIVE
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="roster-footer">
              <span>Coach / OPEN</span>
              <span>Analyst / OPEN</span>

              <a href="#join">
                Бүрэлдэхүүнд нэгдэх <b>↗</b>
              </a>
            </div>
          </div>
        </section>

        <section id="matches" className="section matches-section">
          <div className="container">
            <div className="section-heading section-heading--matches">
              <div>
                <div className="section-kicker">
                  <span>03</span>
                  <i />
                  Тоглолтууд
                </div>

                <h2>
                  Next
                  <br />
                  <span>match.</span>
                </h2>
              </div>

              <p className="section-heading__aside">
                CELESTEX match center
                <br />
                Upcoming fixtures
                <br />
                Results & records
              </p>
            </div>

            <div className="matches-toolbar">
              <div className="filter-tabs" role="tablist">
                {(['all', 'online', 'tbd'] as MatchFilter[]).map(
                  (filter) => (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={matchFilter === filter}
                      className={
                        matchFilter === filter ? 'is-active' : ''
                      }
                      onClick={() => setMatchFilter(filter)}
                      key={filter}
                    >
                      {filter === 'all'
                        ? 'Бүгд'
                        : filter === 'online'
                        ? 'Online'
                        : 'TBD'}
                    </button>
                  ),
                )}
              </div>

              <span className="placeholder-note">
                SEASON 2026
              </span>
            </div>

            <div className="match-list">
              {visibleMatches.map((match, index) => (
                <article
                  className="match-row"
                  key={`${match.status}-${index}`}
                >
                  <span className="match-row__number">
                    0{index + 1}
                  </span>

                  <div className="match-row__event">
                    <span>{match.event}</span>

                    <strong>
                      POPULAR
                      <b> vs </b>
                      {match.opponent}
                    </strong>
                  </div>

                  <span className="match-row__format">
                    {match.format}
                  </span>

                  <span className="match-row__date">
                    {match.date}
                  </span>

                  <span className="match-row__score">
                    — : —
                  </span>
                </article>
              ))}
            </div>

            <div className="data-callout">
              <span className="signal-dot" />

              Official match records coming soon.

              <span>
                Тоглолтын мэдээлэл энд шинэчлэгдэнэ.
              </span>
            </div>
          </div>
        </section>

        <section id="stats" className="section stats-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="section-kicker">
                  <span>04</span>
                  <i />
                  Статистик
                </div>

                <h2>
                  Track
                  <br />
                  <span>progress.</span>
                </h2>
              </div>

              <p className="section-heading__aside">
                POPULAR performance
                <br />
                Verified statistics
                <br />
                Updated regularly
              </p>
            </div>

            <div className="stats-grid">
              {[
                ['—', 'Win rate', 'Season 2026'],
                ['—', 'Maps played', 'Season 2026'],
                ['—', 'World ranking', 'Not ranked'],
                ['—', 'Peak rating', 'Coming soon'],
              ].map(([value, label, detail], index) => (
                <div className="stat-card" key={label}>
                  <span className="stat-card__index">
                    0{index + 1}
                  </span>

                  <strong>{value}</strong>

                  <span>{label}</span>

                  <small>{detail}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="news" className="section news-section">
          <div className="container">
            <div className="section-heading section-heading--news">
              <div>
                <div className="section-kicker">
                  <span>05</span>
                  <i />
                  Мэдээ
                </div>

                <h2>
                  Latest
                  <br />
                  <span>signal.</span>
                </h2>
              </div>

              <p className="section-heading__aside">
                Clan announcements,
                <br />
                tournament updates,
                <br />
                community news.
              </p>
            </div>

            <div className="news-grid">
              {newsItems.map((item) => (
                <article className="news-card" key={item.index}>
                  <div className="news-card__top">
                    <span>{item.index}</span>
                    <span>{item.tag}</span>
                    <span>{item.date}</span>
                  </div>

                  <div
                    className="news-card__art"
                    aria-hidden="true"
                  >
                    <span>C</span>
                  </div>

                  <div className="news-card__body">
                    <h3>{item.title}</h3>

                    <p>
                      POPULAR-ийн албан ёсны мэдээлэл болон
                      шинэчлэлтүүдийг эндээс үзнэ үү.
                    </p>

                    <button
                      type="button"
                      className="text-link"
                      onClick={showDiscordNotice}
                    >
                      Дэлгэрэнгүй <b>↗</b>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="join-section">
          <div
            className="join-section__grid"
            aria-hidden="true"
          />

          <div className="container join-inner">
            <div className="section-kicker">
              <span>06</span>
              <i />
              Нэгдэх
            </div>

            <h2>
              Become
              <br />
              <span>POPULAR.</span>
            </h2>

            <p>
              POPULAR-д нэгдэж, competitive community-ийн
              нэг хэсэг болоорой. Тоглогч, staff эсвэл
              community member байсан ч бид таныг хүлээж байна.
            </p>

            <button
              className="button button--solid join-discord"
              type="button"
              onClick={showDiscordNotice}
            >
              Discord-д нэгдэх <span>↗</span>
            </button>

            <div className="join-divider">
              <span>эсвэл application илгээх</span>
            </div>

            {joinSent ? (
              <div className="join-success" role="status">
                <strong>APPLICATION SENT</strong>

                <span>
                  Таны application амжилттай илгээгдлээ.
                </span>

                <button
                  type="button"
                  onClick={() => setJoinSent(false)}
                >
                  Дахин илгээх
                </button>
              </div>
            ) : (
              <form
                className="join-form"
                onSubmit={handleJoinSubmit}
              >
                <label>
                  <span>Нэр / Nickname</span>

                  <input
                    required
                    name="handle"
                    placeholder="KYO"
                  />
                </label>

                <label>
                  <span>Үндсэн role</span>

                  <select
                    required
                    name="role"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Role сонгох
                    </option>

                    <option>Rifler</option>
                    <option>AWPer</option>
                    <option>Entry</option>
                    <option>Support</option>
                    <option>IGL</option>
                    <option>Staff</option>
                  </select>
                </label>

                <label className="join-form__wide">
                  <span>Өөрийнхөө тухай</span>

                  <textarea
                    required
                    name="message"
                    rows={2}
                    placeholder="Өөрийн rank, туршлага болон зорилгоо бичнэ үү..."
                  />
                </label>

                <button
                  className="button button--line"
                  type="submit"
                >
                  Application илгээх <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand" href="#home">
            <NovaMark compact />

            <span className="brand__words">
              <strong>POPULAR</strong>
              <span>CLAN</span>
            </span>
          </a>

          <p>
            Mongolian Counter-Strike 2
            <br />
            competitive gaming community.
          </p>

          <div className="footer-links">
            {navItems.slice(1, 6).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}

            <button
              type="button"
              onClick={showDiscordNotice}
            >
              Discord
            </button>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} POPULAR CLAN
          </span>

          <span>
            MONGOLIA / COUNTER-STRIKE 2
          </span>

          <a href="#home">Дээш ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;