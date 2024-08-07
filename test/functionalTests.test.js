import { expect } from "chai";
import puppeteer from "puppeteer";

describe("Clock updater", () => {
  let page;
  let browser;

  let hoursUpButton, hoursDownButton;
  let minutesUpButton, minutesDownButton;

  const getClockValue = async () => {
    return await page.$eval("#clock", (node) => node.innerHTML);
  };

  before(async function () {
    this.timeout(0);

    // Initialize Puppeteer
    browser = await puppeteer.launch({
      headless: true, // Run in headless mode for faster tests
    });
    page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.goto("http://localhost:5173", {
      waitUntil: "load",
      timeout: 10000,
    });
    await page.waitForNetworkIdle({ idleTime: 2000, timeout: 5000 });
  });

  after(async function () {
    if (browser) {
      await browser.close();
    }
  });

  it("has all four buttons", async () => {
    // wait for loading the page
    await page.waitForSelector("#clock", { timeout: 1500 });

    hoursUpButton = await page.$("#hours-up-button");
    hoursDownButton = await page.$("#hours-down-button");
    minutesUpButton = await page.$("#minutes-up-button");
    minutesDownButton = await page.$("#minutes-down-button");
    expect(hoursUpButton).not.equal(null);
    expect(hoursDownButton).not.equal(null);
    expect(minutesUpButton).not.equal(null);
    expect(minutesDownButton).not.equal(null);
  }).timeout(5000);

  it("has the default state", async () => {
    expect(await getClockValue()).to.equal("00:00");
  }).timeout(5000);

  it("successfully increases the hour", async () => {
    expect(await getClockValue()).to.equal("00:00");
    await hoursUpButton.click();
    expect(await getClockValue()).to.equal("01:00");
  }).timeout(2000);

  it("successfully decreases the hour", async () => {
    expect(await getClockValue()).to.equal("01:00");
    await hoursDownButton.click();
    expect(await getClockValue()).to.equal("00:00");
  }).timeout(2000);

  it("successfully increases the minute", async () => {
    expect(await getClockValue()).to.equal("00:00");
    await minutesUpButton.click();
    expect(await getClockValue()).to.equal("00:01");
  }).timeout(2000);

  it("successfully decreases the minute", async () => {
    expect(await getClockValue()).to.equal("00:01");
    await minutesDownButton.click();
    expect(await getClockValue()).to.equal("00:00");
  }).timeout(2000);

  it("makes the minutes `59` when decreased from `00`", async () => {
    expect(await getClockValue()).to.equal("00:00");
    await minutesDownButton.click();
    expect(await getClockValue()).to.equal("00:59");
  }).timeout(2000);

  it("makes the minutes `00` when increased from `59`", async () => {
    expect(await getClockValue()).to.equal("00:59");
    await minutesUpButton.click();
    expect(await getClockValue()).to.equal("00:00");
  }).timeout(2000);

  it("makes the hours `23` when decreased from `00`", async () => {
    expect(await getClockValue()).to.equal("00:00");
    await hoursDownButton.click();
    expect(await getClockValue()).to.equal("23:00");
  }).timeout(2000);

  it("makes the hours `00` when increased from `23`", async () => {
    expect(await getClockValue()).to.equal("23:00");
    await hoursUpButton.click();
    expect(await getClockValue()).to.equal("00:00");
  }).timeout(2000);

  it("stays the same after increasing the hours 24 times and decreasing the minutes 60 times", async () => {
    expect(await getClockValue()).to.equal("00:00");
    await hoursUpButton.click();
    await minutesUpButton.click();
    expect(await getClockValue()).to.equal("01:01");
    for (let i = 0; i < 24; i++) {
      await hoursUpButton.click();
    }
    expect(await getClockValue()).to.equal("01:01");
    for (let i = 0; i < 60; i++) {
      await minutesDownButton.click();
    }
    expect(await getClockValue()).to.equal("01:01");
  }).timeout(5000);

  it("successfully makes the time `16:08`", async () => {
    expect(await getClockValue()).to.equal("01:01");

    for (let i = 0; i < 9; i++) {
      await hoursDownButton.click();
    }
    expect(await getClockValue()).to.equal("16:01");
    for (let i = 0; i < 7; i++) {
      await minutesUpButton.click();
    }
    expect(await getClockValue()).to.equal("16:08");
  }).timeout(5000);
});
