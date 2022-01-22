import { newE2EPage } from '@stencil/core/testing';

describe('business-detail-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<business-detail-page></business-detail-page>');

    const element = await page.find('business-detail-page');
    expect(element).toHaveClass('hydrated');
  });
});
