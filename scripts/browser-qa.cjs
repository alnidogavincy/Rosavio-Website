/* Reproducible browser QA. Run against npm run dev or npm start. */
const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const baseURL = process.env.QA_URL || 'http://localhost:3000';
const output = path.join(process.cwd(), 'qa');
const chapters = ['the-rose', 'the-essence', 'the-character', 'meet-rosavia'];
const results = [];
const errors = [];
const channel = process.env.BROWSER_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function record(name, test) {
  try { await test(); results.push({ name, pass: true }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, pass: false, error: error.stack }); console.error(`FAIL ${name}: ${error.stack}`); }
}
async function settled(page, index) {
  await page.waitForFunction(i => document.querySelectorAll('.chapter-dot')[i].getAttribute('aria-current') === 'step', index);
  await wait(1600);
}
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await record('Desktop uses a pinned GSAP stage', async () => {
    await page.waitForSelector('.story-stage.is-pinned');
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('html').getAttribute('lang'), 'id');
  });
  for (let i = 0; i < 4; i++) {
    await record(`Desktop chapter ${i + 1}: dots, copy, screenshot`, async () => {
      await page.locator('.chapter-dot').nth(i).click();
      await settled(page, i);
      const scene = page.locator(`#${chapters[i]}`);
      assert.equal(await scene.evaluate(el => el.inert), false);
      assert.equal(await scene.locator('.headline').isVisible(), true);
      assert.ok(Number(await scene.locator('.headline').evaluate(el => getComputedStyle(el).opacity)) > .99);
      await page.screenshot({ path: path.join(output, `desktop-0${i + 1}.png`), animations: 'disabled' });
    });
  }
  await record('Dialog full original image, focus trap, Escape and focus restoration', async () => {
    const opener = page.locator('.solid-cta').first();
    await opener.click();
    await page.waitForSelector('dialog[open]');
    await page.locator('dialog img').evaluate(img => img.decode());
    assert.match(await page.locator('dialog img').getAttribute('alt'), /kotak/);
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog')), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog')), true);
    const before = await page.evaluate(() => scrollY);
    await page.keyboard.press('PageUp');
    assert.equal(await page.evaluate(() => scrollY), before);
    await page.screenshot({ path: path.join(output, 'desktop-dialog.png'), animations: 'disabled' });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog').evaluate(el => el.open), false);
    assert.equal(await opener.evaluate(el => el === document.activeElement), true);
    assert.equal(await page.locator('a').filter({ hasText: 'Beli Rosavia' }).count(), 0);
  });
  await record('Keyboard PageUp / PageDown and next button', async () => {
    await page.keyboard.press('PageUp'); await settled(page, 2);
    await page.keyboard.press('PageDown'); await settled(page, 3);
    await page.locator('.next-chapter').click(); await settled(page, 0);
  });
  await record('Mouse wheel advances native scroll and chapter state', async () => {
    await page.mouse.wheel(0, 900); await settled(page, 1);
  });
  await record('Live reduced-motion preference removes pin and loops', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('.story-stage').classList.contains('is-pinned'));
    assert.equal(await page.locator('.pin-spacer').count(), 0);
    for (let i = 0; i < 4; i++) {
      await page.locator('.chapter-dot').nth(i).click(); await settled(page, i);
      assert.equal(await page.locator(`#${chapters[i]}`).evaluate(el => el.inert), false);
    }
    assert.equal(await page.locator('.bottle-float').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.screenshot({ path: path.join(output, 'reduced-motion.png') });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForSelector('.story-stage.is-pinned');
    assert.equal(await page.locator('.pin-spacer').count(), 1);
  });
  for (const [width, height] of [[360,800], [390,844], [768,1024], [1920,1080]]) {
    await record(`Responsive ${width}x${height}: all scenes, no overflow or product/copy collision`, async () => {
      await page.setViewportSize({ width, height });
      await wait(400);
      for (let i = 0; i < 4; i++) {
        await page.locator('.chapter-dot').nth(i).click(); await settled(page, i);
        const sizes = await page.evaluate(id => {
          const scene = document.getElementById(id);
          const copy = scene.querySelector('.scene-content').getBoundingClientRect();
          const headline = scene.querySelector('.headline').getBoundingClientRect();
          const bottle = scene.querySelector('.bottle')?.getBoundingClientRect();
          const cta = scene.querySelector('.story-cta').getBoundingClientRect();
          return {
            overflow: document.documentElement.scrollWidth > innerWidth,
            ctaVisible: cta.top > 70 && cta.bottom < innerHeight,
            headingOverflow: scene.querySelector('.headline').scrollWidth > headline.width + 2,
            collision: bottle && copy.right > bottle.left && copy.left < bottle.right && copy.bottom > bottle.top && copy.top < bottle.bottom,
          };
        }, chapters[i]);
        assert.equal(sizes.overflow, false, `horizontal overflow scene ${i+1}`);
        assert.equal(sizes.ctaVisible, true, `CTA offscreen scene ${i+1}`);
        assert.equal(sizes.headingOverflow, false, `heading exceeds column scene ${i+1}`);
        assert.ok(!sizes.collision, `bottle/copy collision scene ${i+1}`);
        if (width === 390 || i === 3 || (width === 1920 && i === 0)) {
          await page.screenshot({ path: path.join(output, `${width}x${height}-0${i+1}.png`), animations: 'disabled' });
        }
      }
      if (width === 390) {
        await page.locator('.solid-cta').first().click();
        await page.locator('dialog img').evaluate(img => img.decode());
        await page.screenshot({ path: path.join(output, 'mobile-dialog.png'), animations: 'disabled' });
        await page.locator('.dialog-close').click();
      }
    });
  }
  await record('Direct link to product resolves correctly', async () => {
    await page.goto(`${baseURL}/#meet-rosavia`, { waitUntil: 'networkidle' });
    await settled(page, 3);
    assert.equal(await page.locator('#meet-rosavia').evaluate(el => el.inert), false);
  });
  await record('CTA story sequence, header action, and dialog backdrop', async () => {
    await page.locator('.wordmark').click(); await settled(page, 0);
    for (let i = 0; i < 3; i++) {
      await page.locator(`#${chapters[i]} .story-cta`).click(); await settled(page, i + 1);
    }
    await page.locator('.solid-cta').first().click();
    await page.mouse.click(4, 4);
    await page.waitForFunction(() => !document.querySelector('dialog').open);
    await page.locator('.wordmark').click(); await settled(page, 0);
    await page.locator('.header-action').click(); await settled(page, 3);
  });
  await record('Touch phone: native swipe scroll and readable product', async () => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    const phone = await context.newPage();
    await phone.goto(baseURL, { waitUntil: 'networkidle' });
    assert.equal(await phone.locator('.is-pinned').count(), 0);
    const client = await context.newCDPSession(phone);
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 170, y: 700 }] });
    for (let y = 650; y >= 200; y -= 50) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 170, y }] });
      await wait(20);
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    assert.ok(await phone.evaluate(() => scrollY > 100));
    await phone.locator('.header-action').tap(); await settled(phone, 3);
    await phone.locator('.bottle').evaluate(img => img.decode());
    await phone.screenshot({ path: path.join(output, 'phone-touch-390x844.png'), animations: 'disabled' });
    await context.close();
  });
  await record('No JavaScript fallback retains all sections and anchor navigation', async () => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const fallback = await context.newPage();
    await fallback.goto(baseURL);
    assert.equal(await fallback.locator('.scene').count(), 4);
    assert.equal(await fallback.locator('.is-pinned').count(), 0);
    await fallback.locator('.header-action').click();
    assert.ok((await fallback.locator('#meet-rosavia').boundingBox()).y < 2);
    await context.close();
  });
  await record('No browser runtime errors', async () => assert.deepEqual(errors, []));
  await browser.close();
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ baseURL, results, errors }, null, 2));
  if (results.some(result => !result.pass)) process.exitCode = 1;
})();
