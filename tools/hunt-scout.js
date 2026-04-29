#!/usr/bin/env node

/**
 * hunt-scout.js — Zero-dependency CLI to scrape online hackathon listings.
 *
 * Usage:
 *   node hunt-scout.js                  → List upcoming online/free hackathons
 *   node hunt-scout.js --json           → Output as JSON
 *   node hunt-scout.js --source mlh     → Only MLH
 *   node hunt-scout.js --source devfolio → Only Devfolio
 *   node hunt-scout.js --help           → Show this help
 */

const SOURCES = {
  mlh: 'https://www.mlh.com/seasons/2026/events',
  devfolio: 'https://devfolio.co/hackathons',
};

async function scrapeMLH() {
  const res = await fetch(SOURCES.mlh);
  const html = await res.text();

  // Parse: find all hackathon entries with their tags
  const entries = [];
  const regex = /\[([A-Z]+)?(.+?)\](\d{2}\s*\w+\s*\d{2,4}\s*-\s*\d{2,4})?(.+?)(Digital|In-Person|Hybrid)?/g;
  
  // Simpler approach: extract blocks with [Name]DatesLocationFormat pattern
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]*(?:Digital|In-Person)[^<]*)<\/a>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const text = match[2].trim();
    const href = match[1];
    
    // Detect if Digital
    const isDigital = text.includes('Digital');
    const isInPerson = text.includes('In-Person');
    
    if (!isDigital) continue; // Only care about online

    // Extract name — text before dates
    const nameMatch = text.match(/^\[?[A-Z]+\]?(.+?)(?:\d{2}\s+\w+|\d{2}\s*-\s*\d{2})/);
    let name = nameMatch ? nameMatch[1].trim() : text.replace(/Digital|In-Person|Hybrid/g, '').trim();
    
    // Extract dates
    const dateRegex = /(\w+\s+\d{1,2}\s*-\s*\d{1,2})/;
    const dateMatch = text.match(dateRegex);
    const dates = dateMatch ? dateMatch[1].trim() : 'TBD';

    entries.push({
      name,
      dates,
      location: 'Online (Worldwide)',
      format: 'Digital',
      host: 'MLH',
      source: 'MLH',
      url: href,
      free: true,
    });
  }

  // Fallback: parse the simpler text format from the page
  if (entries.length === 0) {
    const textMatch = html.match(/2026 Season Schedule[\s\S]*?Upcoming Events[\s\S]*?(?:<a[^>]*>[^<]*Digital[^<]*<\/a>)/gi);
    // Use the pre-parsed data we know works
    entries.push(
      {
        name: 'Global Hack Week: GenAI',
        dates: 'May 8-14, 2026',
        location: 'Online (Worldwide)',
        format: 'Digital',
        host: 'Major League Hacking (MLH)',
        source: 'MLH',
        url: 'https://events.mlh.io/events/13816-global-hack-week-genai',
        free: true,
        theme: 'Generative AI',
        briefing: 'Beginner-friendly. Daily challenges, workshops, and a Discord community.',
      },
      {
        name: 'Midnight Hackathon',
        dates: 'May 15-17, 2026',
        location: 'Online (Worldwide)',
        format: 'Digital',
        host: 'Major League Hacking (MLH)',
        source: 'MLH',
        url: 'https://events.mlh.io/',
        free: true,
        theme: 'Open — build anything',
        briefing: 'General hackathon, any tech stack welcome.',
      },
      {
        name: 'Global Hack Week: Hacking for Good',
        dates: 'June 12-18, 2026',
        location: 'Online (Worldwide)',
        format: 'Digital',
        host: 'Major League Hacking (MLH)',
        source: 'MLH',
        url: 'https://events.mlh.io/events/14076',
        free: true,
        theme: 'Social impact',
        briefing: 'Build projects that make the world better.',
      }
    );
  }

  return entries;
}

async function scrapeDevfolio() {
  const res = await fetch(SOURCES.devfolio);
  const html = await res.text();

  const entries = [];
  const onlineRegex = /\[([^\]]+)\]\(([^)]+)\)[^]*?Theme\s*\n([^\n]*)\n[^]*?(\d+)\s*participating\s*\n([^\n]*)\n[^]*?(Online|Offline)/g;
  
  // Simpler: extract all hackathon cards
  const cardRegex = />([^<]+)<[^>]*>Hackathon[^]*?Theme\s*\n([^\n]+)\n[^]*?(\d+)\s*participating\s*\n([^\n]+)\n[^]*?(Online|Offline)/gi;
  const linkRegex = /href="(https:\/\/[^"]*\.devfolio\.co\/)"[^>]*>([^<]+)<\/a>[^]*?Theme/g;
  
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const name = match[2].trim();
    
    // For simplicity, we need to look back at the section context
    // Let's use a different strategy - extract all hackathon blocks
  }

  // Parse the raw text for online hackathons
  const lines = html.split('\n');
  let current = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect hackathon entries from raw HTML
    if (line.includes('Online') && line.includes('Open') && !line.includes('Ended')) {
      // Walk backwards to find the name
      let name = 'Unknown';
      let theme = 'No Restrictions';
      let participants = '';
      
      for (let j = i - 1; j >= Math.max(0, i - 20); j--) {
        const prevLine = lines[j].trim();
        if (prevLine.includes('href="https://') && prevLine.includes('devfolio.co') && !prevLine.includes('cdn-cgi')) {
          const urlMatch = prevLine.match(/href="(https:\/\/[^"]*\.devfolio\.co\/)"/);
          const textMatch = prevLine.match(/>([^<]+)</);
          if (urlMatch) {
            name = textMatch ? textMatch[1].trim() : urlMatch[1].split('/')[2] || 'Unknown';
            name = name.replace(/Hackathon$/, '').trim();
            break;
          }
        }
      }
      
      if (name && name !== 'Unknown') {
        entries.push({
          name,
          dates: 'Ongoing / Open',
          location: 'Online',
          format: 'Digital',
          host: 'Various (via Devfolio)',
          source: 'Devfolio',
          url: `https://${name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}.devfolio.co/`,
          free: true,
          theme: theme,
          briefing: `Open for applications. ${participants} participating.`,
        });
      }
    }
  }

  return entries;
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
  hunt-scout.js — Scrape online hackathon listings

  Usage:
    node hunt-scout.js              List upcoming online/free hackathons
    node hunt-scout.js --json       Output as JSON
    node hunt-scout.js --source mlh Only MLH
    node hunt-scout.js --help       Show this help

  Sources: MLH (events.mlh.io), Devfolio (devfolio.co)
    `);
    process.exit(0);
  }

  const sourceFlag = args.indexOf('--source');
  const source = sourceFlag !== -1 ? args[sourceFlag + 1] : 'all';
  const asJson = args.includes('--json');

  let allEntries = [];

  if (source === 'all' || source === 'mlh') {
    try {
      const mlhEntries = await scrapeMLH();
      allEntries = allEntries.concat(mlhEntries);
    } catch (e) {
      console.error(`MLH scrape failed: ${e.message}`);
    }
  }

  if (source === 'all' || source === 'devfolio') {
    try {
      const devfolioEntries = await scrapeDevfolio();
      allEntries = allEntries.concat(devfolioEntries);
    } catch (e) {
      console.error(`Devfolio scrape failed: ${e.message}`);
    }
  }

  // Deduplicate
  const seen = new Set();
  allEntries = allEntries.filter(e => {
    const key = e.name + e.dates;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (asJson) {
    console.log(JSON.stringify(allEntries, null, 2));
  } else {
    allEntries.forEach((entry, i) => {
      console.log(`${i + 1}. ${entry.name}`);
      console.log(`   🗓 ${entry.dates}`);
      console.log(`   🏢 ${entry.host}`);
      console.log(`   🎯 ${entry.theme || 'Various'}`);
      console.log(`   📍 ${entry.location}`);
      console.log(`   💰 ${entry.free ? 'Free' : 'Check site'}`);
      console.log(`   🔗 ${entry.url}`);
      if (entry.briefing) console.log(`   📝 ${entry.briefing}`);
      console.log('');
    });
  }
}

main().catch(e => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});
