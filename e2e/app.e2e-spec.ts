import { AngularElectronPage } from "./app.po";
import { browser, element, by } from "protractor";

describe("flipper App", () => {
  let page: AngularElectronPage;
  beforeEach(() => {
    page = new AngularElectronPage();
  });
  it("should show login when app lauch!", () => {
    page.navigateTo("/");
    expect(element(by.css("yegobox-user-login div")).getText()).toMatch(
      "Sign in"
    );
  });
});
