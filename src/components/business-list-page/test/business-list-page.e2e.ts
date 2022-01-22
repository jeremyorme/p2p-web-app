import { newE2EPage } from '@stencil/core/testing';

describe('business-list-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<business-list-page></business-list-page>');

    const element = await page.find('business-list-page');
    expect(element).toHaveClass('hydrated');
  });
});
