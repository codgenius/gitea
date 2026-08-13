import {env} from 'node:process';
import {expect, test} from '@playwright/test';
import {login, randomString} from './utils.ts';

test('guardian task 23 repository create submit restoration', async ({page}) => {
  const repoName = `guardian-run-task23-ui-restored-${randomString(8)}`;
  await login(page);
  await page.goto('/repo/create');
  await page.locator('input[name="repo_name"]').fill(repoName);
  const createRequest = page.waitForRequest(
    (request) => request.method() === 'POST' && new URL(request.url()).pathname === '/repo/create',
  );
  await page.getByRole('button', {name: 'Create Repository'}).click();
  await expect(createRequest).resolves.toBeDefined();
  await page.waitForURL(new RegExp(`/${env.GITEA_TEST_E2E_USER}/${repoName}$`));
});
