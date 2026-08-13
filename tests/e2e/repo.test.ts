import {expect, test} from '@playwright/test';
import {login, randomString} from './utils.ts';

test('Task25 repository create submit regression', async ({page}) => {
  const repoName = `guardian-run-task25-ui-regression-${randomString(8)}`;
  await login(page);
  await page.goto('/repo/create');
  await page.locator('input[name="repo_name"]').fill(repoName);
  const createRequest = page.waitForRequest(
    (request) => request.method() === 'POST' && new URL(request.url()).pathname === '/repo/create',
    {timeout: 1000},
  );
  await page.getByRole('button', {name: 'Create Repository'}).click();
  let requestObserved = true;
  try {
    await createRequest;
  } catch {
    requestObserved = false;
  }
  expect(requestObserved).toBe(false);
  await expect(page).toHaveURL(/\/repo\/create$/);
});
