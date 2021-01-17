import { AppPage } from './login.po';
import { browser, by, element, logging } from 'protractor';

describe('Login page should work fine', () => {
  let page: AppPage;
  var loginTeacher = element(by.id('demoTeacher'));

  beforeEach(() => {
    page = new AppPage();
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
    page.getAdminHomeText().then((text: string) => {
      expect(text).toBeTruthy;
    })
    //expect(page.getAdminHomeText()).toContain('Здравствуйте')
    //expect(browser.getTitle()).toEqual('GorbachevaGo')
  })

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
