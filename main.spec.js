const { test, expect, _electron: electron } = require('@playwright/test');

test.describe('Main', () => {
  const stdout = [];
  let electronApp;
  let window;

  test.beforeEach(async () => {
    electronApp = await electron.launch({ args: ['./main.js'] });
    electronApp.process().stdout.on('data', message => {
      stdout.push(message.toString());
    });
    window = await electronApp.waitForEvent('window');
    while (window.url().startsWith('devtools://')) {
      window = await electronApp.waitForEvent('window');
    }
  });

  test('should render title', async () => {
    const title = window.getByTestId('app-title');
    await expect(title).toHaveText('Hello, Desktop');
  });

  test('should render count', async () => {
    const title = window.getByTestId('app-count');
    await expect(title).toHaveText(' 0 ');
  });

  test('should decrement count and log', async () => {
    const decrement = window.getByTestId('app-decrement');
    const count = window.getByTestId('app-count');
    for (let i = 0; -10 < i; i--) {
      await decrement.click();
      await expect(count).toHaveText(` ${i - 1} `);
      expect(stdout.at(-1)).toContain(`Count: ${i - 1}`);
    }
  });

  test('should increment count and log', async () => {
    const increment = window.getByTestId('app-increment');
    const count = window.getByTestId('app-count');
    for (let i = 0; i < 10; i++) {
      await increment.click();
      await expect(count).toHaveText(` ${i + 1} `);
      expect(stdout.at(-1)).toContain(`Count: ${i + 1}`);
    }
  });

  test.afterEach(async () => {
    await electronApp.close();
  });
});
