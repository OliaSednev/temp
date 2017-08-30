import { HeroloTaskPage } from './app.po';

describe('herolo-task App', () => {
  let page: HeroloTaskPage;

  beforeEach(() => {
    page = new HeroloTaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
