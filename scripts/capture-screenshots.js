import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITES = [
  {
    name: 'rentalchaavi',
    url: 'https://rentalchaavi.com',
    output: 'public/assets/projects/rentalchaavi-home.png',
  },
  {
    name: 'dealskb',
    url: 'https://dealskb.com',
    output: 'public/assets/projects/dealskb-home.png',
  },
  {
    name: 'vahanfinserv',
    url: 'https://vahanfinserv.com',
    output: 'public/assets/projects/vahanfinserv-home.png',
  },
];

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
  });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 1000 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
  });

  const siteReports = [];

  for (const site of SITES) {
    console.log(`\nNavigating to ${site.url}...`);
    let page;
    let success = false;
    let attempt = 0;

    while (attempt < 3 && !success) {
      attempt++;
      try {
        page = await context.newPage();
        const response = await page.goto(site.url, {
          waitUntil: 'networkidle',
          timeout: 45000,
        });

        console.log(`[Attempt ${attempt}] Status for ${site.url}:`, response ? response.status() : 'no response');

        // Allow animations and fonts to settle
        await page.waitForTimeout(3000);

        // Extract metadata
        const metadata = await page.evaluate(() => {
          return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content || '',
            keywords: document.querySelector('meta[name="keywords"]')?.content || '',
            h1: Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()).filter(Boolean),
            h2: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()).filter(Boolean).slice(0, 5),
            bodySnippet: document.body?.innerText?.slice(0, 500) || '',
            generator: document.querySelector('meta[name="generator"]')?.content || '',
            scripts: Array.from(document.querySelectorAll('script[src]')).map(s => s.src).slice(0, 10),
          };
        });

        const outputPath = path.resolve(site.output);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        await page.screenshot({
          path: outputPath,
          fullPage: false,
        });

        console.log(`Saved screenshot to ${site.output}`);
        console.log(`Metadata for ${site.name}:`, JSON.stringify(metadata, null, 2));

        siteReports.push({
          site: site.name,
          url: site.url,
          status: 'success',
          metadata,
          screenshotPath: site.output,
        });

        success = true;
        await page.close();
      } catch (err) {
        console.error(`[Attempt ${attempt}] Error loading ${site.url}:`, err.message);
        if (page) await page.close().catch(() => {});
        if (attempt < 3) {
          console.log('Retrying in 4 seconds...');
          await new Promise(r => setTimeout(r, 4000));
        } else {
          siteReports.push({
            site: site.name,
            url: site.url,
            status: 'failed',
            error: err.message,
          });
        }
      }
    }
  }

  await browser.close();
  fs.writeFileSync('site-inspection-report.json', JSON.stringify(siteReports, null, 2));
  console.log('\nFinished all captures. Report saved to site-inspection-report.json');
}

capture().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
