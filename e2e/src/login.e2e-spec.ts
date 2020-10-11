import { AppPage } from './login.po';
import { browser, by, element, logging } from 'protractor';

describe('Login page should work fine', () => {
  let page: AppPage;
  page = new AppPage();
  var loginTeacher = element(by.id('demoTeacher'));

  beforeEach(() => {
    page.navigateTo();
  });

  it('should have right title', () => {
    page.getPageTitle()
    .then((title: string) => {
      expect(title).toEqual('GorbachevaGo')
    })
  })
  it('should have a right title text', () => {
    page.getTitleText()
    .then((titleText: string) => {
      expect(titleText).toEqual('Вход')
    })
  })
  it('should login when loginTeacher button clicked', () => {
    loginTeacher.click();

    expect(browser.getTitle()).toEqual('GorbachevaGo')
  })

  
  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('gorbacheva-go app is running!');
  // });

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
