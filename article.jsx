// Marxist.com article template page — main App
// Reuses PrintButton, Eyebrow, SectionRule from components.jsx (window globals).
// Reuses TweaksPanel + useTweaks + Tweak* from tweaks-panel.jsx (window globals).

const { useState, useEffect, useMemo, useRef } = React;

const TWEAK_DEFAULTS = {
  "texture": "none",
  "headlineFont": "sans",
  "mode": "light",
};

// R(): prefer bundled blob URL but fall back to live path
const R = (id, fallback) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;

const NAV_TABS = [
  { label: "Home", href: "index.html" },
  { label: "Join the RCI", href: "join.html" },
  { label: "Analysis", href: "analysis.html" },
  { label: "Theory & History" },
  { label: "Podcasts & Media", href: "media.html" },
  { label: "Magazine" },
  { label: "Bookstore", href: "https://wellredbooks.co.uk/" },
  { label: "More languages" },
];

const DEFAULT_MARKDOWN = `---
title: "The economic consequences of the war in Iran"
source: "https://marxist.com/the-economic-consequences-of-the-war-in-iran.htm"
author:
  - "[[Niklas Albin Svensson]]"
published: 2026-05-27
created: 2026-05-27
description: "The US-Israeli war on Iran is a turning point, not just in the balance of forces between the powers, but also in the world economy. It is bringing to the fore a"
cover: "assets/topic-iran-war.jpg"
tags:
  - "clippings"
---
The US-Israeli war on Iran is a turning point, not just in the balance of forces between the powers, but also in the world economy. It is bringing to the fore all the contradictions that have been accumulating over the past period: inflation, debt and the looming recession.

Ever since the pandemic, the world economy has been struggling to shake off inflation. The combination of government stimulus, pandemic disruption and the war in Ukraine caused inflation to surge to over 10 percent. As a result, central banks had to hike interest rates to contain it. In Europe, the Central Bank managed to push inflation down to the two percent target in the autumn of 2024. In the US, the Federal Reserve never quite got it back to its target.

Tariffs played a part here. For example the price of imported goods, which previously helped keep inflation down (consumer electronics and cars, as well as components and raw materials), have now risen.

Yale Budget Lab estimates that prices on imported goods are [3.5 to 4 percent higher](https://budgetlab.yale.edu/research/tracking-economic-effects-tariffs) than they would have been without the tariffs. It should be noted though that after all the noise about reciprocal tariffs, Trump settled for an average tariff rate around 10.5 percent, a lot less than the 18 percent that was feared, and almost half the rate of the infamous Smoot-Hawley Act in the 1930s.

Free trade was the watchword of the capitalists for a reason. It helped them squeeze wages, as workers were compensated by lower prices of imported goods. This was as true of the English capitalists of the 19th century as it was of the US capitalists of the past decades, but it’s now coming to an end.

The rising conflict between the major imperialist powers over the world markets is ending a process of lowering trade barriers that lasted for decades. This will not just have a short-term impact on prices. Rather than having one big manufacturing plant that can export to the whole world, companies will be forced to invest in many smaller, less efficient production sites, to circumvent trade barriers of all kinds. This will lower productivity and raise prices. It will mean persistently higher inflation that will force workers to fight harder to maintain their living standards.

Such was already the situation back in February – a very unstable, fragile situation. Trump, however, has a way of making us all forget about his past adventures as he embarks on new ones. Nonetheless, they all play a role in the crisis that is now unfolding. Prior to the Iran War, the world economy was not in a healthy state. On the contrary, all it needed was a good push, and Trump might have given it just that.

![](https://www.youtube.com/watch?v=xp_sRHV1D60)

## The oil shortage

The problem starts with oil – the most important commodity for energy production. 15 million barrels of oil and five million barrels of refined oil products passed through the Strait of Hormuz every day before the war. Now, that has slowed to a trickle. The International Energy Agency [has called it](https://www.iea.org/news/new-iea-report-highlights-options-to-ease-oil-price-pressures-on-consumers-in-response-to-middle-east-supply-disruptions) “the largest supply disruption in the history of the global oil market”.

Some oil exports have been diverted to Saudi Arabia’s Red Sea ports, but most of the 20-million-barrel productive capacity has now been taken offline. The reintegration of Russia into the global oil market, and the expansion of production elsewhere, has helped, but the oil market is still estimated to have lost about 10 million barrels per day in production.

To counteract this, governments have released about five million barrels per day from their strategic reserves. Private inventories were, apparently, about [400 million barrels higher than what was needed](https://www.bloomberg.com/news/videos/2026-05-21/oil-markets-are-in-deficit-but-not-shortage-sen-says-video). The release of these onto the world market is what has kept the oil price from shooting up even more steeply. But some of these sources will run out by September, and this will force prices higher as supplies become harder to come by.

Oil prices have been fluctuating around $100-110 per barrel for the past two months. Much of the downward movement of the price has been driven by Trump himself making announcements about an imminent deal and an opening of the Strait. The markets are largely basing their pricing on the prospect of a short war, which will come to an end soon. Similarly, the big refiners have been holding back purchases in the hope that the war will end and the prices go down.

That is a rather big assumption, as it would involve Trump effectively admitting defeat. Some of the recent nervous reactions from the market clearly reflect an increasing scepticism that Trump will be able to get out of the war and open up the Strait within a reasonable amount of time. Those who don’t believe this will happen [forecast oil reaching $150 per barrel](https://edition.cnn.com/2026/05/18/business/gas-prices-trump-iran-hormuz) – a level not seen since 2008. Even if it were to reopen, it would take some months before traffic flowed as before, and [longer still until production could be restored](https://www.reuters.com/markets/commodities/opening-hormuz-is-easy-part-restoring-oil-flows-isnt-2026-04-20/).

![kharg island Image خسرو حیرت نگاری Wikimedia Commons](https://marxist.com/images/stories/economy/2026_May/kharg_island_Image_%D8%AE%D8%B3%D8%B1%D9%88_%D8%AD%DB%8C%D8%B1%D8%AA_%D9%86%DA%AF%D8%A7%D8%B1%DB%8C_Wikimedia_Commons.jpg)

kharg island Image خسرو حیرت نگاری Wikimedia Commons

The problem isn’t just the blocking of the sea route, but also damage to actual infrastructure, in particular refineries. Oil refineries that were supplying these five million barrels of refined oil products every day have been targeted by strikes during the conflict. Eight of them are [fully or partially offline](https://nbutler.substack.com/p/the-end-of-the-beginning-the-state) and will take months to repair after the war is over. The Qatari LNG gas field will take years. This has had a devastating impact on diesel and jet fuel prices.

Diesel prices are up significantly. In some regions, *very* significantly. Prices are up 32 percent in the UK, 47 percent in the USA and 91 percent in Indonesia. Jet fuel prices are up 60 percent on average. The price of bunker oil for cargo ships is up 60 percent (in Rotterdam). What this reflects is partly the oil shortage, but also the massive loss of refining capacity. The difference between the oil price when it comes into the refinery and the jet fuel price once refined has tripled, because the shortage of refining capacity is so much greater than the shortage of oil.

The price increases are being made more severe because of export restrictions imposed by China and India (i.e. protectionism).

The consequence of this is what economists refer to as ‘demand destruction’. Some customers get priced out of the market and can’t afford to consume as much as before. Lufthansa has, for example, cut 20,000 of their less profitable flights. But although increased holiday prices are tough for many families to swallow, it is bigger than that.

Oil is the lifeblood of the world economy. To transport goods all around the world using ships and trucks requires a vast amount of oil products. And the shortage will inevitably mean that products that were sent around the world last year will no longer be shipped this year. The price mechanism works to determine which products get shipped and which don’t. Essentially, the highest bidder gets to ship their stuff. Freight rates are up 40 percent since February (although they are still below what they were last summer, when Trump’s trade war caused mayhem).

The cost for the products that get shipped will get higher as the new price will have to reflect the new costs of getting the goods to market, or getting hold of the raw materials. The higher fuel cost therefore inserts itself at every stage of the supply chain, and it will be passed on to the consumer.

## The chemicals that are everywhere

The Middle East is also the source of many other key chemical products.

The price of naphtha, a key product for the petrochemical sector, has gone up by 55 percent, and chemical plants dependent on the Gulf for their supplies have had to close. This is a key component in the production of plastics which, as we know, are absolutely everywhere.

Then there’s sulphur and sulphuric acid. Sulphur is a byproduct of oil refining, and half of the world’s sulphur trade used to pass through the Strait of Hormuz. Sulphuric acid, which is made from sulphur, is the [world’s most commonly used chemical](https://cen.acs.org/). 56 percent of the world’s sulphuric acid is used to make fertilisers, particularly for India, but the rest is used as a raw material in industry or used to refine metals in mining.

Then we have farming, which might just be the most devastatingly affected of all. Prior to the closure of the Strait of Hormuz, the Gulf was supplying [30 percent of the world’s raw materials](https://www.fao.org/newsroom/detail/fao-chief-economist-warns-of-severe-global-food-security-risks-from-disruption-to-strait-of-hormuz-trade-corridor/en) for fertilisers. Combined with the rise in diesel prices, it is having a devastating impact on farming. No wonder farmers around the world are protesting. They can’t afford to buy the fertiliser they need, as there isn’t enough to go around.

The loss of this supply of fertiliser will naturally mean a large reduction in the amount used for this year’s sowing season. How much this will affect crop yields is unclear and depends on where the cuts are made, but it could be in the region of [10-15 percent](https://www.nature.com/articles/s43016-023-00873-z#Fig5) for cereals like rice and wheat.

![U.S. Central Command (CENTCOM) forces began setting conditions for clearing mines in the Strait of Hormuz, April 11, as two U.S. Navy guided-missile destroyers conducted operations. (U.S. Central Command Photo)](https://marxist.com/images/stories/economy/2026_May/strait_of_hormuz_Image_public_domain.jpg)

U.S. Central Command (CENTCOM) forces began setting conditions for clearing mines in the Strait of Hormuz, April 11, as two U.S. Navy guided-missile destroyers conducted operations. (U.S. Central Command Photo)

If that were to become reality, the world would have to cut its food consumption by 10-15 percent. That would mean both the poorest section of the world population eating less, and the entire world having to pay significantly more for the food it consumes. With [three million households in Britain](https://www.theguardian.com/business/2026/apr/30/rising-costs-forcing-3m-uk-households-skip-meals-which-report) already skipping meals, and 700 million people worldwide being undernourished, this is a devastating prospect.

The UN [drew up a list of the most vulnerable](https://www.fao.org/newsroom/detail/fao-chief-economist-warns-of-severe-global-food-security-risks-from-disruption-to-strait-of-hormuz-trade-corridor/en):

- Sri Lanka, where the Maha rice harvest is underway
- Bangladesh, currently in its critical Boro rice season
- India, facing reduced domestic fertilizer production ahead of the Kharif season
- Egypt, highly exposed due to reliance on wheat imports
- Sudan, already facing acute food insecurity
- In Sub-Saharan Africa, Somalia, Kenya, Tanzania, and Mozambique are particularly exposed due to high dependence on fertilizer imports.
- Major agricultural exporters such as Brazil may also face production impacts, with potential spillovers into global markets.

In other words, a swathe of former colonial countries are being impacted hard. To make matters worse, countries like India, Bangladesh and Pakistan will be hit by reduced remittances from workers in the Gulf States.

Many poorer countries are also affected by the LPG (cooking gas) shortage. One billion people use LPG for cooking in India, 700 million in China, 250 million in Indonesia, 200 million in Sub-Saharan Africa and so on. The price of imported gas has doubled in most of these regions. According to the IEA, one in eight households in Sub-Saharan Africa have now seen LPG costs take up more than 10 percent of their income. In India, the government has rationed gas to businesses and put a profit cap on refineries, among other measures.

In other words, it isn’t just the oil and fuel that is affected. It is one of the consequences of globalisation and the expansion of the world market that we are now interdependent on each other, and all parts of the world. Disconnecting one part of the world economy has a devastating impact on the rest. The workers and the poor will pay a heavy price for the adventures of US imperialism.

## What the latest inflation figures tell us

The US inflation figures for April clearly reveal what is happening. Inflation is up more than one percentage point to 3.8 percent, the highest for three years. The Eurozone is slightly lower, at three percent, also the highest since 2023.

In the US, producer price [inflation for goods for ‘intermediate demand’](https://www.bls.gov/news.release/pdf/ppi.pdf) – in other words raw materials and components – was up 9.4 percent on processed goods and 21 percent for unprocessed goods compared to a year ago, with food and energy unsurprisingly the most affected. This is a clear illustration of how the war is having a big impact on prices. These price increases will arrive in the shops before long.

The picture is clear: we’re at the beginning of another wave of inflation. The second such shock in five years. How deep it goes will depend on how quickly the supply from the Middle East can be restored.

The economists are quite pleased to note that the consumer so far hasn’t been significantly affected. This is partly because there’s a massive class divide among the ‘consumers’. The fact that the poorest sections of US society cut back on their meals, has little impact on the aggregate data. [46 percent of consumer spending in the US is done by 10 percent of the highest earners](https://www.rbc.com/en/economics/us-analysis/us-featured-analysis/oil-price-shock-higher-us-inflation-could-weigh-on-consumers/). These higher earners, rather than spending less when times are tougher, save a bit less. The savings rate is now back down to the level it was in 2022.

The other reason is that Trump just injected another massive amount of money into the economy last year. His ‘Big Beautiful Bill’ dug an even deeper hole in public finances by extending his tax cuts to higher earners (who do so much of the consumption), and adding a few minor tax cuts to working-class people on top. That is also a reason why inflation is higher in the US: the massive government deficit of seven percent of GDP creates an excess of money floating around in the economy. However, even this money is not enough, and retailers are expecting consumers to [face a ‘cash crunch’](https://www.ft.com/content/e126f744-3db9-4305-8871-31f83ebc4ed7).

## On the backs of the working class

The most immediate effect of inflation will naturally be higher prices. This will put pressure on workers and poor people around the world. If your two percent wage increase looked bearable a few months ago, now suddenly it doesn’t look so good.

[Recent figures show](https://www.ft.com/content/e126f744-3db9-4305-8871-31f83ebc4ed7) that real wages already started to fall in the US in March, and they aren’t far behind in Europe.

This will force workers once more into struggle to defend their conditions. The bourgeois always worry about ‘inflation expectations’ and in one sense they are right. If the workers expect inflation not to be a temporary phenomenon, they will want to see their wages reflect that. They don't want to sign up to a deal for a three percent increase in wages today, if inflation will be 10 percent in six months time.

Naturally, no one knows what inflation will look like in six months or a year. The idea of linking wage increases to inflation makes perfect sense in this scenario – a sliding wage scale. Christine Lagarde, at the head of the European Central Bank, has been persistently arguing against this for years. Her policy, although she masks it with talk of the ‘wage-price spiral’, is to solve the question of inflation by squeezing the working class, just like they did in 2022-23.

This reflects the class interest of the bourgeoisie, but it is shared by many of the trade union leaders. They will soon be out, trying to convince the workers how unreasonable their wage demands are, how it will stoke inflation, and why they need to think of the health of the companies’ finances etc. They are running the errands of the capitalists and it will lead to more anger and frustration with the union leaders.

The class-conscious workers will demand a wage increase that stops eroding the workers’ purchasing power, not just based on the 3-4 percent inflation of today, but the higher inflation that is likely coming tomorrow. They will point to the massive profits that companies are making, how the rich are just getting richer, and ask why the workers have to pay the price for the mess that the capitalists and imperialists have made.

Such a mood will lay the basis for wildcat strikes as well as union leaders being pushed into action by the mood of the rank and file.

## The bond vigilantes

Inflation isn’t the only problem. The spectre of a government debt crisis is rearing its ugly head.

![gs Image IMF Flickr](https://marxist.com/images/stories/economy/2026_May/gs_Image_IMF_Flickr.jpg)

gs Image IMF Flickr

Speculators don’t have a good reputation in general. Speculators who speculate that companies and governments are about to go bust, and thereby hasten the process and make it inevitable, have an even worse reputation.

People like George Soros made a lot of money speculating against the British Pound and the Swedish Krona in the 1990s. To make a load of money off other people’s misfortune naturally makes you a hated figure. But such activities only work because there is an economic basis for them. In other words: they reveal genuine weaknesses, which the market hasn’t yet ‘priced in’. Such speculation is only profitable when the price of the bond, share, currency, or whatever it might be, doesn't reflect economic realities.

This brings us to the so-called ‘bond vigilantes’. They have been selling government bonds over the last few weeks, and asking for a higher premium. The logic is simple: if inflation is on the rise, they demand a higher return, to ensure that their profits don’t get eaten by inflation.

To this is added an increasing unease with the level of debt in general, and government debt in particular. This leads them to think that governments really should be paying higher interest rates, and they act accordingly, withdrawing money from the government bond market until they get the interest rate they think is warranted.

On 13 May, the US treasury held an ‘auction’, where they offered these bonds. The markets were less than enthusiastic and they had to raise the yield, i.e. the annual interest rate, to five percent for the 30-year bonds. In other words, lend the government some money for 30 years and at the end of it you get it back plus five percent per year. This was the first time the 30-year yield was over five percent at an auction since 2007.

Similar things are happening in the UK, where government bonds yields are over five percent. Australia is on the same track, and even Japan’s interest rates are up to four percent, after an auction in which [two banks bought 60 percent of the bonds](https://www.bloomberg.com/news/articles/2026-05-20/japan-20-year-bond-sale-sees-firmer-demand-than-12-month-average-mpdilxr6) – not exactly a sign of strength.

This is now beginning to cause serious problems. The US needs to refinance $10 trillion (that’s ten thousand billion, or ten million million) this year, on top of its $2 trillion deficit. The US refinancing requirements are a third of the size of the US economy. Just to make life a little bit harder, much of this debt was issued when the interest rate was near zero, meaning that the interest payments for these 10 trillion will increase more than threefold. This could mean an additional $300 billion in interest costs, digging an even bigger hole in the treasury.

The US can turn to the printing press again, as it did during the pandemic, but this will undermine the already rocky faith in the dollar. Last year we [explained some of the implications](https://marxist.com/usa-digging-an-ever-deeper-hole-big-beautiful-bill-prepares-crisis-of-government-finance.htm) of this. But there are many governments that are even more exposed: the UK, France, Argentina, Egypt and Pakistan to name a few.

The total amount of money that needs to be found this year is $18 trillion for the OECD countries, and another $4 trillion for the so-called ‘emerging markets’. Out of this $22 trillion, the US represents $12 trillion. The amounts are staggering.

## Going bust

On top of that, the crisis itself is pushing governments to make additional concessions. The German government for example gave a 17 cent-per-litre tax relief on diesel. The UK government postponed its fuel duty rise. South Korea approved a $18 billion support package for households and industry.

Ruth Gregory, deputy chief UK economist at Capital Economics [estimates that](https://www.reuters.com/world/uk/uk-borrows-bigger-than-expected-243-billion-pounds-april-2026-05-22/) energy subsidies, higher government interest costs and weaker economic growth would raise the UK deficit from 3.6 percent to 4.6 percent of GDP.

![01/10/2021. London, United Kingdom. The Foreign Secretary Elizabeth Truss in a call with the Minister of International Relations and Cooperation of South Africa, Naledi Pandor Picture by Tim Hammond / No 10 Downing Street](https://marxist.com/images/stories/economy/2026_May/liz_truss_Image_UK_Government_Flickr.jpg)

01/10/2021. London, United Kingdom. The Foreign Secretary Elizabeth Truss in a call with the Minister of International Relations and Cooperation of South Africa, Naledi Pandor Picture by Tim Hammond / No 10 Downing Street

This can all come crashing down on the heads of governments. Inflation expectations put pressure on bonds, which increase borrowing costs for governments at the same time as their deficits grow because of measures they take to ameliorate the crisis (and additional military expenditure, of course). This can become a vicious cycle where the bond markets effectively go on strike and start demanding completely unsustainable interest rates in order to keep funding governments.

The Liz Truss government in the UK lasted only 49 days in 2022 after the intervention of the bond markets, which threatened not just to collapse UK public finances but also a number of large pension funds.

This is also what happened in 2010 in Greece when the country was forced to carry out brutal austerity programmes by the IMF and the EU. The implementation of these attacks was then continued by successive governments, including the Syriza government who, rather than breaking with capitalism, broke the Greek masses. At the end of the process, Greek GDP had fallen by 27 percent.

We’re not far off that kind of crisis again. This time in much larger countries. Dealing with that would require severe austerity, creating a cycle in which cuts lead to recession, which leads to a higher deficit and more cuts. This prospect coincides with consumers reeling from higher inflation. They will have less money to spend, forcing them to cut back. This in turn will impact industry, which will have to cut production, which will lead to unemployment. In other words a recessionary cycle.

No wonder *Financial Times* chief economics commentator, Martin Wolf called the Iran War, [‘Operation Epic Folly’](https://www.ft.com/content/fb290ca1-4fa0-4309-b406-8c850d0b2449?syn-25a6b1a6=1). Similarly, UK Chancellor Rachel Reeves (the minister of finance) blamed the war for the difficulties and reiterated that it was a ‘mistake’, when she spoke in parliament on 21 May.

It’s easy for European commentators and politicians to blame the Iran War. The reality is that the Iran War merely accelerated the processes that were already taking place. Trump, and his erratic foreign policy, is on the one hand a product of the crisis, and one the other a massive accelerant of it. None of these commentators have a real solution, however, because the problem isn't Trump, but the capitalist system itself.

Now, they’re preparing a sovereign debt crisis, an inflationary spiral, and a recession. In other words, a perfect storm, where a number of contradictions that have been building up over the past could explode. It is of course possible that the ruling class manages to patch something up in the Gulf, keep inflation under control and thereby prevent the worst of the crisis. However, it would resolve nothing and merely pile up more contradictions for the next time.`;


// ── Inline Markdown Parser ──────────────────────────────────────────────────
// Parses **bold** and [text](url) into React nodes.
function parseInlineMarkdown(text) {
  if (typeof text !== "string") return text;
  
  const tokens = [];
  let lastIndex = 0;
  const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const startIndex = match.index;
    if (startIndex > lastIndex) {
      tokens.push(text.substring(lastIndex, startIndex));
    }
    
    if (match[2]) {
      // Bold: match[2] contains the text inside **...**
      tokens.push(<strong key={startIndex}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      // Link: match[3] is text, match[4] is url
      const isExternal = match[4].startsWith("http");
      tokens.push(
        <a 
          key={startIndex} 
          href={match[4]} 
          target={isExternal ? "_blank" : undefined} 
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {match[3]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }
  
  return tokens.length > 0 ? tokens : text;
}

// ── Markdown Parser ─────────────────────────────────────────────────────────
// Parses raw Markdown document text, extracting frontmatter and content blocks.
function parseMarkdown(mdText) {
  if (!mdText) return { metadata: {}, elements: [], sections: [] };

  const normalizedText = mdText.replace(/\r\n/g, "\n");
  const match = normalizedText.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  let metadata = {};
  let bodyText = normalizedText;
  
  if (match) {
    // Parse YAML frontmatter
    const yamlContent = match[1];
    const lines = yamlContent.split("\n");
    lines.forEach(line => {
      const idx = line.indexOf(":");
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        metadata[key] = val;
      }
    });

    // Extract list values for author
    const authorMatch = yamlContent.match(/author:\s*\n((?:\s*-\s*.*(?:\n|$))+)/);
    if (authorMatch) {
      metadata.author = authorMatch[1]
        .split("\n")
        .map(l => l.trim().replace(/^\s*-\s*["']?\[?\[?([^"']+)\]?\]?["']?$/, "$1"))
        .filter(Boolean);
    } else if (metadata.author) {
      metadata.author = [metadata.author.replace(/^\[?\[?([^\]]+)\]?\]?$/, "$1")];
    } else {
      metadata.author = ["RCI Writers"];
    }

    bodyText = match[2];
  } else {
    metadata.author = ["RCI Writers"];
  }

  // Split into paragraphs / blocks
  const blocks = bodyText.split(/\n{2,}/);
  const elements = [];
  const sections = [];
  let elementIndex = 0;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    if (block.startsWith("## ")) {
      // Header H2
      const headerText = block.slice(3).trim();
      const id = headerText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      sections.push({ id, title: headerText });
      elements.push(
        <h2 id={id} className="article-h2" key={elementIndex++}>
          {headerText}
        </h2>
      );
    } else if (block.startsWith("![")) {
      // Image block
      const imgMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const url = imgMatch[2];
        
        // Look-ahead for potential caption line in next block
        let caption = alt;
        if (i + 1 < blocks.length) {
          const nextBlock = blocks[i + 1].trim();
          if (nextBlock && !nextBlock.startsWith("##") && !nextBlock.startsWith("![") && !nextBlock.startsWith("-") && nextBlock.length < 250) {
            caption = nextBlock;
            i++; // Consume the caption block
          }
        }

        elements.push(
          <figure className="article-figure" key={elementIndex++}>
            <img src={url} alt={alt} className="article-img" />
            {caption && <figcaption className="article-figcaption">{caption}</figcaption>}
          </figure>
        );
      }
    } else if (block.startsWith("- ")) {
      // Unordered list
      const listItems = block.split("\n").map((line, liIdx) => {
        const itemText = line.replace(/^\s*-\s*/, "");
        return <li key={liIdx}>{parseInlineMarkdown(itemText)}</li>;
      });
      elements.push(
        <ul className="article-ul" key={elementIndex++}>
          {listItems}
        </ul>
      );
    } else {
      // Regular paragraph or YouTube Embed
      const ytMatch = block.match(/^!\[\]\((https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))\)$/);
      if (ytMatch) {
        const videoId = ytMatch[2];
        elements.push(
          <div className="article-video-wrap" key={elementIndex++}>
            <iframe
              className="article-video"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      } else {
        // Normal paragraph. Lede dropcap applies to the first paragraph rendered.
        const isLede = elements.filter(el => el.type === "p").length === 0;
        elements.push(
          <p className={isLede ? "article-p article-p--lede" : "article-p"} key={elementIndex++}>
            {parseInlineMarkdown(block)}
          </p>
        );
      }
    }
  }

  return { metadata, elements, sections };
}

// ── Masthead Component ──────────────────────────────────────────────────────
function Masthead() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  const toggleSearch = () => {
    setSearchOpen((o) => {
      const next = !o;
      if (next) setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      else setSearchValue("");
      return next;
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") { setSearchOpen(false); setSearchValue(""); }
  };
  const onBlur = (e) => { if (!e.currentTarget.value) setSearchOpen(false); };

  return (
    <header className="masthead">
      <a className="mast-left" href="index.html" aria-label="Marxist.com home">
        <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" className="mast-logo" />
        <div className="mast-wordmark">
          <div className="wm-title">Marxist<span className="wm-dot">.</span>com</div>
        </div>
        <div className="mast-slash">/</div>
        <div className="mast-tag">
          <div>Home of the Revolutionary</div>
          <div>Communist International</div>
        </div>
      </a>
      <div className="mast-right">
        <div className="mast-socials">
          <a href="https://www.youtube.com/@revcomintern" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
          </a>
          <a href="https://www.instagram.com/revcomintern/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://x.com/revcomintern" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://t.me/marxistcom" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="mast-social">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.34 18.7 19.7c-.24 1.08-.88 1.34-1.78.84l-4.92-3.62-2.37 2.28c-.26.26-.48.48-.98.48l.35-4.96L17.8 6.5c.4-.36-.08-.55-.62-.2L7.6 12.4l-4.92-1.54c-1.07-.34-1.1-1.07.22-1.58l19.27-7.43c.9-.34 1.68.2 1.38 1.58z"/></svg>
          </a>
        </div>
        <div className="mast-search" data-open={searchOpen}>
          <input
            ref={inputRef}
            type="search"
            className="mast-search-input"
            placeholder="Search marxist.com…"
            aria-label="Search marxist.com"
            tabIndex={searchOpen ? 0 : -1}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
          <button
            className="mast-search-btn"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            onClick={toggleSearch}
            type="button"
          >
            {searchOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4-4"/></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Nav Component ───────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="primary-nav">
      <div className="nav-inner">
        {NAV_TABS.map((tab) => {
          const isActive = tab.label === "Analysis";
          const isExternal = tab.href && /^https?:\/\//.test(tab.href);
          return (
            <PrintButton
              key={tab.label}
              active={isActive}
              variant={isActive ? "ink" : "paper"}
              size="md"
              href={tab.href || "#"}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{ flex: "0 0 auto" }}
            >
              {tab.label}
            </PrintButton>
          );
        })}
      </div>
    </nav>
  );
}

// ── Scroll Progress & Tracker Sidebar ────────────────────────────────────────
function ScrollProgressVisualizer({ sections }) {
  const [activeSectionId, setActiveSectionId] = useState("");

  // Set up IntersectionObserver to detect which section is in view
  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -65% 0px", // triggers when heading is in upper middle of viewport
        threshold: 0
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    // Track scroll depth percentage for mobile top progress indicator (js fallback)
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = window.scrollY / docHeight;
        const mobileProgress = document.getElementById("mobile-progress-bar");
        if (mobileProgress) {
          mobileProgress.style.transform = `scaleX(${progress})`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const handleMarkerClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="article-sidebar">
      <div className="timeline-bars-container">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className={`timeline-bar-item ${activeSectionId === sec.id ? "active" : ""}`}
            onClick={() => handleMarkerClick(sec.id)}
            title={sec.title}
          >
            <div className="timeline-bar-line" />
            <div className="timeline-bar-tooltip">
              {sec.title}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ── Footer Component ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-top">
        <div className="foot-brand">
          <img src={R("rciSquare", "ds/logos/rci-square.svg")} alt="RCI" />
          <div>
            <div className="foot-brand-wm">Marxist.com</div>
            <div className="foot-brand-tag">Home of the Revolutionary Communist International</div>
          </div>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <div className="foot-col-h">Sections</div>
            <a href="index.html">Analysis</a>
            <a href="#">Theory & History</a>
            <a href="#">Podcasts</a>
            <a href="#">In Defence of Marxism</a>
            <a href="#">Bookstore</a>
          </div>
          <div className="foot-col">
            <div className="foot-col-h">Get involved</div>
            <a href="join.html">Join the RCI</a>
            <a href="join.html">Find your section</a>
            <a href="#">Donate</a>
            <a href="#">Distribute the paper</a>
          </div>
          <div className="foot-col">
            <div className="foot-col-h">Languages</div>
            <a href="#">Español</a>
            <a href="#">Français</a>
            <a href="#">Deutsch</a>
            <a href="#">Italiano</a>
            <a href="#">中文</a>
          </div>
        </div>
      </div>
      <div className="foot-rule" />
      <div className="foot-bot">
        <span>© 2026 Revolutionary Communist International · marxist.com</span>
        <span>Workers of the world, unite!</span>
      </div>
    </footer>
  );
}

// ── Main Page App ────────────────────────────────────────────────────────────
function App() {
  const t = TWEAK_DEFAULTS;
  const [articleContent, setArticleContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Apply dark/light theme classes to body
  useEffect(() => {
    document.body.dataset.mode = t.mode;
    document.body.dataset.texture = t.texture;
  }, [t.mode, t.texture]);

  // Load article from query parameter (dynamic templates) or default prototype
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fileName = params.get("file") || "The economic consequences of the war in Iran.md";
    
    setLoading(true);
    fetch(fileName)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Could not load article file "${fileName}".`);
        }
        return res.text();
      })
      .then((text) => {
        setArticleContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(`Fetch failed (likely file:// CORS restrictions). Falling back to prototype data.`, err);
        if (fileName === "The economic consequences of the war in Iran.md") {
          setArticleContent(DEFAULT_MARKDOWN);
          setError(null);
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  }, []);

  // Parse markdown content dynamically
  const parsedData = useMemo(() => {
    return parseMarkdown(articleContent);
  }, [articleContent]);

  const { metadata, elements, sections } = parsedData;

  const authorNames = useMemo(() => {
    if (!metadata.author) return "";
    return metadata.author.join(" & ");
  }, [metadata.author]);

  return (
    <div className="site">
      <Masthead />
      <Nav />

      <main className="site-main article-page-main">
        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 0", fontFamily: "var(--font-headline)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--rci-ash)" }}>
            Loading article...
          </div>
        ) : error ? (
          <div style={{ padding: "40px", border: "2px dashed var(--rci-red)", background: "var(--paper-soft)", margin: "40px 0", textAlign: "center" }}>
            <Eyebrow style={{ fontSize: 14 }}>Error Loading Article</Eyebrow>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, marginTop: 12 }}>{error}</p>
            <PrintButton variant="paper" size="sm" href="article.html" style={{ marginTop: 16 }}>
              Reload prototype
            </PrintButton>
          </div>
        ) : (
          <article className="article-body-container">
            <header className="article-header">
              <Eyebrow style={{ fontSize: 13, letterSpacing: "0.24em" }}>
                {metadata.tags ? metadata.tags[0] : "Analysis"}
              </Eyebrow>
              
              <h1 className="article-title">{metadata.title}</h1>
              
              <div className="article-meta">
                <div className="article-author-byline">
                  By <span>{authorNames}</span>
                </div>
                {metadata.published && (
                  <div className="article-date">
                    Published · {metadata.published}
                  </div>
                )}
              </div>
            </header>

            {/* Cover Image */}
            {metadata.cover && (
              <div className="article-cover-wrap">
                <img 
                  src={metadata.cover} 
                  alt={metadata.title} 
                  className="article-cover-img" 
                />
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url("${R("texGrain", "ds/textures/film-grain.jpg")}")`,
                  backgroundSize: "500px", mixBlendMode: "multiply", opacity: 0.12, pointerEvents: "none"
                }} />
              </div>
            )}

            {/* Two-column layout grid: text + visualizer */}
            <div className="article-grid-columns">
              <div className="article-content">
                {elements}
                
                {/* Related Articles / Subjects Section */}
                <div className="article-read-more" style={{ marginTop: "60px" }}>
                  <SectionHead label="Read more about" />
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
                    <PrintButton variant="paper" size="sm" href="#">Trump</PrintButton>
                    <PrintButton variant="paper" size="sm" href="#">Protectionism</PrintButton>
                    <PrintButton variant="paper" size="sm" href="#">Iran War</PrintButton>
                    <PrintButton variant="paper" size="sm" href="#">Inflation</PrintButton>
                  </div>
                </div>
              </div>

              {/* Sidebar with Table of Contents & Progress track visualizer */}
              <ScrollProgressVisualizer sections={sections} />
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
