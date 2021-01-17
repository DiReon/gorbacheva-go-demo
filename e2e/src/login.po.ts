import { browser, by, element } from 'protractor';

export class AppPage {
  
  
  navigateTo(): Promise<unknown> {
    return browser.get('/login') as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('.card-header')).getText() as Promise<string>;
  }
  getPageTitle() {
		return browser.getTitle();
  }
  
  getAdminHomeText(): Promise<string> {
    return element(by.css('.greeting')).getText() as Promise<string>;
  }
}
