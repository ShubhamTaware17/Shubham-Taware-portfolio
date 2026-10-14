import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITES = [
  { name: 'rentalchaavi', url: 'https://rentalchaavi.com', output: 'public/assets/projects/rentalchaavi-home.png' },
  { name: 'dealskb', url: 'https://dealskb.com', output: 'public/assets/projects/dealskb-home.png' },
  { name: 'vahanfinserv', url: 'https://vahanfinserv.com', output: 'public/assets/projects/vahanfinserv-home.png' },
  { name: 'caryanam', url: 'https://caryanam.com', output: 'public/assets/projects/caryanam-home.png', fallbackUrl: 'http://caryanam.com' },
  { name: 'caryanamlive', url: 'https://caryanamlive.com', output: 'public/assets/projects/caryanamlive-home.png', fallbackUrl: 'http://caryanamlive.com' },
  { name: 'awaazmanki', url: 'https://awaazmanki.com/', output: 'public/assets/projects/awaazmanki-home.png', fallbackUrl: 'http://awaazmanki.com/' },
];

async function capture() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
  });

  for (const site of SITES) {
    console.log(`\nNavigating to ${site.url}...`);
    let page;
    let loaded = false;
    const urlsToTry = [site.url, site.fallbackUrl].filter(Boolean);

    for (const targetUrl of urlsToTry) {
      if (loaded) break;
      try {
        page = await context.newPage();
        const res = await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 35000 });
        console.log(`Status for ${targetUrl}:`, res ? res.status() : 'loaded');
        await page.waitForTimeout(3000);

        const outPath = path.resolve(site.output);
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`[SUCCESS] Captured ${site.name} -> ${site.output}`);
        loaded = true;
        await page.close();
      } catch (err) {
        console.warn(`Could not load ${targetUrl}:`, err.message);
        if (page) await page.close().catch(() => {});
      }
    }

    if (!loaded) {
      console.error(`[FAILED] Could not load ${site.name}`);
    }
  }

  await browser.close();
  console.log('\nAll captures completed.');
}

capture().catch(err => {
  console.error('Capture process error:', err);
  process.exit(1);
});
