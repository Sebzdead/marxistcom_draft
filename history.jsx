// Marxist.com — History Portal page
// Standalone sibling to app.jsx / magazine.jsx / media.jsx. Loaded by history.html.
// Reuses PrintButton, Eyebrow, SectionRule, SectionHead from components.jsx.

const { useState, useEffect, useMemo, useRef } = React;

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

// ── Navigation tabs (History is active here) ─────────────────────────────────
;

// ── The Timeline: eras of class society ──────────────────────────────────────
// Each era chapter hangs off the timeline spine. Articles are either real
// marxist.com topic links folded in from the old grid (source: "archive")
// or invented placeholders awaiting commissioning (source: "stub").
const ERAS = [
  {
    id: "era-birth-of-class-society",
    numeral: "I",
    name: "The Birth of Class Society",
    shortLabel: "Class society",
    dates: "c. 10,000 – 800 BC",
    intro: "For most of human existence there were no classes, no money and no state. The agricultural revolution changed everything: a surplus arose, and with it a minority who lived from the labour of others — priests, kings and the first armed bodies of men.",
    image: null,
    articles: [
      { title: "How the Plough Created the Pharaohs", dek: "Surplus, scribes and soldiers: why the first ruling classes emerged out of the neolithic revolution.", url: "#", source: "stub" },
      { title: "From Primitive Communism to Class Society", dek: "What anthropology tells us about the hundred thousand years humanity lived without masters.", url: "#", source: "stub" },
      { title: "The First States: Mesopotamia and the Nile", dek: "Irrigation, grain stores and the origins of state power in the earliest civilisations.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-antiquity",
    numeral: "II",
    name: "Antiquity: Greece & Rome",
    shortLabel: "Antiquity",
    dates: "c. 800 BC – 476 AD",
    intro: "The ancient world raised civilisation on the backs of slaves. Its philosophy, art and engineering still astonish us — and so should the revolts of the oppressed, from the helots of Sparta to the slave army of Spartacus that shook Rome to its foundations.",
    image: "assets/theory/Tod_des_Spartacus_by_Hermann_Vogel.jpg",
    articles: [
      { title: "Ancient History", dek: "The history of the ancient world is ripe with lessons about the development of class society and the heroic struggle of the early oppressed classes against their masters.", url: "https://marxist.com/theory-ancient-history.htm", source: "archive" },
      { title: "Spartacus: The Slave War That Shook Rome", dek: "The greatest slave uprising of antiquity, and why it could not yet win.", url: "#", source: "stub" },
      { title: "Why Rome Fell: The Limits of the Slave Economy", dek: "Not barbarians but a mode of production in decay brought down the empire.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-middle-ages",
    numeral: "III",
    name: "The Middle Ages",
    shortLabel: "Middle Ages",
    dates: "476 – 1450",
    intro: "Feudalism bound the peasant to the soil and the serf to the lord. Yet beneath the apparent stagnation of a thousand years, the towns, the guilds and the market were quietly assembling the materials of a new society — and the peasants repeatedly stormed heaven.",
    image: null,
    articles: [
      { title: "Feudalism: The Lord, the Serf and the Tithe", dek: "The laws of motion of the feudal economy, and why it gave way.", url: "#", source: "stub" },
      { title: "‘When Adam Delved and Eve Span’: The Revolt of 1381", dek: "Wat Tyler, John Ball and the English rising that terrified the nobility.", url: "#", source: "stub" },
      { title: "Towns, Guilds and the Seeds of a New Class", dek: "How the burghers of the medieval cities became the bourgeoisie.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-enlightenment",
    numeral: "IV",
    name: "The Enlightenment",
    shortLabel: "Enlightenment",
    dates: "c. 1500 – 1789",
    intro: "Before the bourgeoisie conquered power it conquered minds. The Reformation broke the spiritual monopoly of Rome; the philosophes turned reason against the divine right of kings. Ideas became a material force preparing the revolutions to come.",
    image: null,
    articles: [
      { title: "Reason Against the Divine Right of Kings", dek: "How the Enlightenment armed the revolutions of the eighteenth century.", url: "#", source: "stub" },
      { title: "The Reformation: Religion as the Banner of Class War", dek: "Luther, Müntzer and the social struggles behind the wars of religion.", url: "#", source: "stub" },
      { title: "Materialism Before Marx: From Spinoza to Diderot", dek: "The philosophical lineage that dialectical materialism stands on.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-birth-of-capitalism",
    numeral: "V",
    name: "The Birth of Capitalism",
    shortLabel: "Capitalism",
    dates: "c. 1500 – 1800",
    intro: "Capital came into the world, as Marx wrote, dripping from head to foot, from every pore, with blood and dirt. Enclosures drove the peasants from the land; slavery and plunder built the world market; the manufactory assembled the modern working class.",
    image: null,
    articles: [
      { title: "Primitive Accumulation: Letters of Blood and Fire", dek: "The violent prehistory of capital, from the enclosures to the colonies.", url: "#", source: "stub" },
      { title: "How the Peasantry Was Driven Off the Land", dek: "Sheep ate men: the making of the English proletariat.", url: "#", source: "stub" },
      { title: "Slavery, Silver and the World Market", dek: "The triangular trade and the global foundations of the rise of the bourgeoisie.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-bourgeois-revolutions",
    numeral: "VI",
    name: "The Bourgeois Revolutions",
    shortLabel: "Bourgeois revs",
    dates: "1642 – 1848",
    intro: "To clear the road for the new mode of production, the bourgeoisie had to smash the old regimes — and it could only do so by setting the masses in motion. From Cromwell's New Model Army to the Bastille and the barricades of 1848, revolution drove history forward.",
    image: "assets/theory/640px-Prise_de_la_Bastille.jpg",
    articles: [
      { title: "English Revolution", dek: "The Civil War in England was a revolutionary clash by the rising bourgeois class, led by Oliver Cromwell, against the rotten feudal regime of Charles I.", url: "https://marxist.com/theory-english-revolution.htm", source: "archive" },
      { title: "French Revolution", dek: "In 1789, the revolutionary bourgeoisie and popular masses overthrew the decrepit Ancien Regime, creating an earthquake that shook the world.", url: "https://marxist.com/theory-french-revolution.htm", source: "archive" },
      { title: "The American Revolution: A War of Two Worlds", dek: "1776 as a bourgeois revolution — and the unfinished business it left behind.", url: "#", source: "stub" },
      { title: "1848: The Year the Bourgeoisie Lost Its Nerve", dek: "When the spectre of the proletariat frightened the liberals into the arms of reaction.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-age-of-imperialism",
    numeral: "VII",
    name: "The Age of Imperialism",
    shortLabel: "Imperialism",
    dates: "1848 – 1914",
    intro: "Capitalism conquered the globe, carved up the colonial world and concentrated into monopolies and finance capital. Against it arose the organised working class: the First and Second Internationals — and, for seventy-two days in Paris, the first workers' government.",
    image: "assets/theory/commune.jpg",
    articles: [
      { title: "Paris Commune", dek: "For a tragically brief period in 1871, the workers of Paris began the tremendous task of replacing the capitalist state with the dictatorship of the proletariat.", url: "https://marxist.com/theory-paris-commune.htm", source: "archive" },
      { title: "First International", dek: "The first international proletarian organisation, with the participation of Marx and Engels, paved the way for organised working-class struggle worldwide.", url: "https://marxist.com/theory-first-international.htm", source: "archive" },
      { title: "Second International", dek: "A formidable bastion of working-class internationalism until it descended into national chauvinism and opportunism. Its history is rich with lessons.", url: "https://marxist.com/theory-second-international.htm", source: "archive" },
      { title: "The Scramble for Africa", dek: "Capital exports, conquest and the carve-up of the colonial world.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-world-war-i",
    numeral: "VIII",
    name: "The First World War",
    shortLabel: "WWI",
    dates: "1914 – 1918",
    intro: "The great slaughter was no accident: it flowed from the contradiction between the world economy and the nation state, between rival gangs of imperialist brigands. It broke the Second International — and out of its trenches came revolution.",
    image: "assets/theory/ww1.jpg",
    articles: [
      { title: "World War I", dek: "To understand the causes of the great slaughter, it is necessary to lay bare the real mainspring of war in the modern epoch: the clashing interests of capitalist states.", url: "https://marxist.com/theory-world-war-i.htm", source: "archive" },
      { title: "Zimmerwald: The Internationalists Who Said No", dek: "The handful who kept the banner of internationalism flying in 1915 — and changed history.", url: "#", source: "stub" },
      { title: "Mutiny and Strike: How the War Ended From Below", dek: "From the Kiel sailors to the Étaples mutiny: the masses finished what the generals started.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-proletarian-revolution",
    numeral: "IX",
    name: "The Age of Proletarian Revolution",
    shortLabel: "Proletarian revs",
    dates: "1917 – 1939",
    intro: "October 1917 proved the working class can take and hold power. A revolutionary wave swept Europe — Germany, Hungary, Italy, Spain — but outside Russia the wave was broken on the rocks of failed leadership, and in Russia the revolution degenerated under Stalin.",
    image: "assets/theory/communist-third-international-360.jpg",
    articles: [
      { title: "1917: Ten Days That Shook the World", dek: "How the Bolsheviks led the first victorious workers' revolution.", url: "#", source: "stub" },
      { title: "German Revolution", dek: "After the Russian Revolution, the German proletariat entered the scene of history and brought an end to WW1 — but their revolution was sadly defeated.", url: "https://marxist.com/theory-german-revolution.htm", source: "archive" },
      { title: "Third International", dek: "The Third (Communist) International was a vital school of revolutionary ideas and strategy, which degenerated with the rise of Stalinism.", url: "https://marxist.com/theory-third-international.htm", source: "archive" },
      { title: "Spanish Revolution", dek: "The Spanish masses strived towards socialist revolution in the 1930s, but were strangled by the class collaboration of their leadership.", url: "https://marxist.com/theory-spanish-revolution.htm", source: "archive" },
      { title: "Fourth International", dek: "The struggle, led by Leon Trotsky, to keep the genuine traditions of Bolshevism alive against colossal odds.", url: "https://marxist.com/theory-fourth-international.htm", source: "archive" }
    ]
  },
  {
    id: "era-world-war-ii",
    numeral: "X",
    name: "The Second World War",
    shortLabel: "WWII",
    dates: "1939 – 1945",
    intro: "Behind the banners of 'democracy against fascism' raged a new imperialist redivision of the world — and within it, a titanic struggle between fascism and the USSR, in which the planned economy and the heroism of the Soviet masses triumphed.",
    image: "assets/theory/Soviet_flag_on_the_Reichstag_roof_image_wikimedia_commons.jpg",
    articles: [
      { title: "World War II", dek: "Often portrayed as a clash between 'democracy' and Hitler's Germany, the war was mostly a titanic struggle between fascism and the USSR in which the latter triumphed.", url: "https://marxist.com/theory-world-war-ii.htm", source: "archive" },
      { title: "Stalingrad: The Planned Economy at War", dek: "How a nationalised economy out-produced and out-fought the Third Reich.", url: "#", source: "stub" },
      { title: "Resistance and Revolution, 1943–45", dek: "The partisan movements that frightened the Allies as much as the Axis.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-post-war-boom",
    numeral: "XI",
    name: "The Post-War Boom",
    shortLabel: "Post-war boom",
    dates: "1945 – 1974",
    intro: "Rebuilding from the rubble, world capitalism entered its greatest upswing — and its apologists declared the class struggle obsolete. Then came 1968: the greatest general strike in history, in the very heart of the 'affluent society'.",
    image: "assets/theory/mai68.jpg",
    articles: [
      { title: "Revolutionary 1968", dek: "1968 saw one revolutionary eruption after another worldwide, including the greatest general strike in the post-war period in France, which almost toppled de Gaulle.", url: "https://marxist.com/theory-revolutionary-1968.htm", source: "archive" },
      { title: "Deformed Workers' States", dek: "A revolutionary wave swept Europe after the Red Army's victory, but the new regimes established were deformed workers' states modelled on Stalinist Russia.", url: "https://marxist.com/theory-deformed-workers-states.htm", source: "archive" },
      { title: "Bretton Woods: The Golden Age That Couldn't Last", dek: "The real foundations of the boom — and the contradictions that ended it.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-colonial-revolution",
    numeral: "XII",
    name: "The Colonial Revolution",
    shortLabel: "Colonial revs",
    dates: "1945 – 1979",
    intro: "While the metropolis boomed, the colonial world burned. From China to Cuba, Algeria to Vietnam, the masses of the ex-colonial countries threw off direct imperialist rule — confirming, in distorted forms, the theory of the permanent revolution.",
    image: "assets/theory/che-fidel720.jpg",
    articles: [
      { title: "Chinese Revolution", dek: "The heroic masses threw off the yoke of imperialism, although the revolution degenerated along Stalinist lines, culminating in capitalist restoration.", url: "https://marxist.com/theory-chinese-revolution.htm", source: "archive" },
      { title: "Cuban Revolution", dek: "On 1 January 1959, Batista fell to the guerrillas of Fidel Castro and Che Guevara. Within three years, capitalism had been abolished on the island.", url: "https://marxist.com/theory-cuban-revolution.htm", source: "archive" },
      { title: "Colonial Revolution", dek: "In the colonial and ex-colonial countries, the post-war period saw unprecedented upheaval: famine, social unrest, wars, revolution and counter-revolution.", url: "https://marxist.com/theory-colonial-revolution.htm", source: "archive" },
      { title: "Vietnam: The Peasant Army That Beat an Empire", dek: "How the mightiest military machine on earth was fought to a standstill.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-crisis-and-restoration",
    numeral: "XIII",
    name: "Crisis & Restoration",
    shortLabel: "1974 – 2008",
    dates: "1974 – 2008",
    intro: "The oil shock ended the boom; the ruling class answered with the neoliberal counter-offensive — Thatcher, Reagan, defeats for the unions. The collapse of Stalinism was proclaimed the 'end of history'. Capital's victory lap led straight to 2008.",
    image: "assets/theory/berlin-wall.jpg",
    articles: [
      { title: "The Oil Shock: When the Boom Broke", dek: "Stagflation and the return of capitalist crisis after the golden age.", url: "#", source: "stub" },
      { title: "Neoliberalism: The Counter-Offensive of Capital", dek: "Privatisation, deregulation and the defeats inflicted on the workers' movement.", url: "#", source: "stub" },
      { title: "1989–91: The Collapse of Stalinism", dek: "Why the bureaucracy devoured the planned economy — and what really ended.", url: "#", source: "stub" }
    ]
  },
  {
    id: "era-21st-century",
    numeral: "XIV",
    name: "The 21st Century",
    shortLabel: "21st century",
    dates: "2008 – present",
    intro: "The crash of 2008 opened an organic crisis of capitalism that has never truly closed. From the Arab Revolution to Occupy, from Latin America to the new mass movements, the molecular process of revolution is at work everywhere.",
    image: "assets/theory/arab-revolution.jpg",
    articles: [
      { title: "Arab Revolution", dek: "In 2011, a tremendous revolutionary tsunami swept the Arab world, bringing down multiple dictatorships, before counter-revolution forced its way through.", url: "https://marxist.com/theory-arab-revolution.htm", source: "archive" },
      { title: "Venezuelan Revolution", dek: "The Bolivarian Revolution defied imperialism and carried out huge reforms, but its failure to break with capitalism led to compromise and crisis.", url: "https://marxist.com/theory-venezuelan-revolution.htm", source: "archive" },
      { title: "Perspectives", dek: "Marxist perspectives provide a guide to action based on scientific analysis of the main processes in society. Where is world politics going?", url: "https://marxist.com/world-perspectives.htm", source: "archive" },
      { title: "2008: The Crash That Never Ended", dek: "Why the slump of 2008 marked a turning point in the history of capitalism.", url: "#", source: "stub" }
    ]
  }
];

// ── Threads through history: struggles spanning many eras ────────────────────
const THREADS = [
  {
    title: "Ireland and Republicanism",
    kicker: "Thread",
    image: "assets/theory/ireland-mural.jpg",
    url: "https://marxist.com/theory-ireland-republicanism.htm",
    desc: "The national struggle and the class struggle in Ireland have always been closely connected. Today, the struggle for a united Ireland is bound up with the struggle for a workers’ republic."
  },
  {
    title: "British Labour Movement",
    kicker: "Thread",
    image: "assets/theory/labour.jpg",
    url: "https://marxist.com/theory-british-labour-movement.htm",
    desc: "From Chartism to the foundation of the Labour Party, to the general strike of 1926, to the Miners’ Strike of the 1980s: Britain’s history is full of class struggle."
  },
  {
    title: "Class Struggle in the USA",
    kicker: "Thread",
    image: "assets/theory/marxism-usa.jpg",
    url: "https://marxist.com/theory-class-struggle-in-the-usa.htm",
    desc: "The history of the class struggle in the United States illustrates that the ideas of Marxism, socialism and communism aren't at all alien to \"the land of opportunity.\""
  },
  {
    title: "Black Struggle",
    kicker: "Thread",
    image: "assets/theory/black-struggle.jpg",
    url: "https://marxist.com/theory-black-struggle.htm",
    desc: "Racism is hardwired into the capitalist system, serving as a convenient weapon of divide and rule to keep the exploited masses from uniting against their shared oppressors."
  }
];

// ── Site chrome: Masthead / Nav / Footer (verbatim from sibling pages) ────────






// ── Theory Card Component (used for the Threads section) ─────────────────────
function TheoryCard({ topic }) {
  return (
    <a href={topic.url} className="theory-card" target="_blank" rel="noopener noreferrer">
      <div className="theory-card-img-wrap">
        <img src={topic.image} alt={topic.title} className="theory-card-img" />
        <div className="theory-card-img-grain" />
      </div>
      <div className="theory-card-body">
        <div className="theory-card-eyebrow">{topic.kicker}</div>
        <h3 className="theory-card-title">{topic.title}</h3>
        <p className="theory-card-desc">{topic.desc}</p>
      </div>
    </a>
  );
}

// ── Sticky era rail: jump navigation + scrollspy + search ────────────────────
function EraRail({ eras, activeEra, query, setQuery, matchCounts }) {
  const jumpTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const searching = query.trim().length > 0;
  return (
    <div className="era-rail">
      <div className="era-rail-ticks" role="navigation" aria-label="Jump to era">
        {eras.map((era) => {
          const dimmed = searching && matchCounts[era.id] === 0;
          const isActive = era.id === activeEra;
          return (
            <a
              key={era.id}
              href={`#${era.id}`}
              className={`era-tick${isActive ? " era-tick--active" : ""}${dimmed ? " era-tick--dimmed" : ""}`}
              onClick={dimmed ? (e) => e.preventDefault() : (e) => jumpTo(e, era.id)}
              aria-disabled={dimmed || undefined}
            >
              <span className="era-tick-label">{era.shortLabel}</span>
            </a>
          );
        })}
      </div>
      <div className="era-rail-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20.5 20.5l-4-4" />
        </svg>
        <input
          type="text"
          className="era-rail-search-input"
          placeholder="Search the timeline..."
          aria-label="Search the timeline"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

// ── Era chapter on the timeline spine ────────────────────────────────────────
function ArticleCard({ article }) {
  const isStub = article.source === "stub";
  return (
    <a
      href={article.url}
      className={`tl-article${isStub ? " tl-article--stub" : ""}`}
      target={isStub ? undefined : "_blank"}
      rel={isStub ? undefined : "noopener noreferrer"}
      onClick={isStub ? (e) => e.preventDefault() : undefined}
    >
      <span className={`tl-article-tag${isStub ? " tl-article-tag--stub" : ""}`}>
        {isStub ? "Coming soon" : "From the archive"}
      </span>
      <span className="tl-article-title">{article.title}</span>
      <span className="tl-article-dek">{article.dek}</span>
    </a>
  );
}

function EraChapter({ era, searching }) {
  return (
    <section className="era-chapter" id={era.id}>
      <div className="era-node" aria-hidden="true">{era.numeral}</div>
      <div className="era-body">
        <div className="era-dates">{era.dates}</div>
        <h2 className="era-name">{era.name}</h2>
        {!searching && (
          <div className="era-plate">
            <p className="era-intro">{era.intro}</p>
            {era.image && (
              <div className="era-img-wrap">
                <img src={era.image} alt={era.name} className="era-img" />
                <div className="era-img-grain" />
              </div>
            )}
          </div>
        )}
        <div className="era-articles">
          {era.articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main Page App ────────────────────────────────────────────────────────────
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeEra, setActiveEra] = useState(ERAS[0].id);

  useEffect(() => {
    document.body.dataset.mode = "light";
    document.body.dataset.texture = "none";
  }, []);

  // Scrollspy: highlight the last era whose top has passed the sticky rail
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        let current = ERAS[0].id;
        for (const era of ERAS) {
          const el = document.getElementById(era.id);
          if (el && el.getBoundingClientRect().top <= 140) current = era.id;
        }
        setActiveEra(current);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  // Filter era articles and thread cards against the query
  const filteredEras = useMemo(() => {
    if (!searching) return ERAS;
    const hit = (a) =>
      a.title.toLowerCase().includes(q) ||
      a.dek.toLowerCase().includes(q) ||
      a.source.includes(q);
    return ERAS.map((era) => ({ ...era, articles: era.articles.filter(hit) }))
      .filter((era) => era.articles.length > 0 || era.name.toLowerCase().includes(q));
  }, [q, searching]);

  const matchCounts = useMemo(() => {
    const counts = {};
    for (const era of ERAS) counts[era.id] = 0;
    for (const era of filteredEras) counts[era.id] = era.articles.length || 1;
    return counts;
  }, [filteredEras]);

  const filteredThreads = useMemo(() => {
    if (!searching) return THREADS;
    return THREADS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.kicker.toLowerCase().includes(q)
    );
  }, [q, searching]);

  const hasAnyResults = !searching || filteredEras.length > 0 || filteredThreads.length > 0;

  return (
    <div className="site">
      <Header activeTab="Theory & History" />

      <main className="site-main">
        {/* History Hero Section */}
        <section className="theory-hero">
          <div className="theory-hero-content">
            <span className="theory-hero-eyebrow">Revolutionary History</span>
            <h1 className="theory-hero-h1">A Revolutionary History of the World</h1>
            <p className="theory-hero-p">
              “The history of all hitherto existing society is the history of class struggles.” — <b>Marx & Engels.</b> Walk the timeline from the birth of class society to the battles of the present, and arm yourself with the lessons of every revolution along the way.
            </p>
          </div>
        </section>

        {/* Sticky era rail: jump navigation + search */}
        <EraRail
          eras={ERAS}
          activeEra={activeEra}
          query={query}
          setQuery={setQuery}
          matchCounts={matchCounts}
        />

        {!hasAnyResults ? (
          <div className="theory-empty">
            Nothing on the timeline matches your search query: "{query}"
          </div>
        ) : (
          <React.Fragment>
            {/* The timeline */}
            <div className="timeline">
              {filteredEras.map((era) => (
                <EraChapter key={era.id} era={era} searching={searching} />
              ))}
            </div>

            {/* Threads through history */}
            {filteredThreads.length > 0 && (
              <div className="theory-grid-section threads-section">
                <SectionHead label="Threads Through History" divider="thick-slab" extra="Struggles spanning many eras" />
                <div className="theory-grid threads-grid">
                  {filteredThreads.map((topic, index) => (
                    <TheoryCard key={index} topic={topic} />
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
