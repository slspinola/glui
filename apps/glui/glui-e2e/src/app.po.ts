import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('glui-root glui-toolbar mat-toolbar mat-toolbar-row .logo-text')).getText();
  }
}
