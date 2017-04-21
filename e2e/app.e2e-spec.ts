import { ServiceTestPage } from './app.po';

describe('service-test App', () => {
  let page: ServiceTestPage;

  beforeEach(() => {
    page = new ServiceTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
