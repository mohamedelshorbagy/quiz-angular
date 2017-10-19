import { ThoughtDesignPage } from './app.po';

describe('thought-design App', () => {
  let page: ThoughtDesignPage;

  beforeEach(() => {
    page = new ThoughtDesignPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
