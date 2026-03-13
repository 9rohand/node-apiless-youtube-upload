"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWebDriver = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = __importStar(require("selenium-webdriver/chrome"));
const node_chromedriver_downloader_1 = require("node-chromedriver-downloader");
const argDefaults = {
    automation: false,
    headless: false,
    fullsize: false,
};
const makeWebDriver = async (args = argDefaults) => {
    const chromeOptions = new chrome_1.Options();
    // chromeOptions.addArguments('--password-store=gnome')
    // fix linux not loading logged in profile properly (no idea why)
    chromeOptions.excludeSwitches('password-store');
    chromeOptions.addArguments('--log-leve=3');
    if (args.automation) {
        chromeOptions.addArguments('--enable-automation');
    }
    if (args.userDataDir) {
        chromeOptions.addArguments(`--user-data-dir=${args.userDataDir}`);
    }
    if (args.headless) {
        chromeOptions.addArguments('--headless=new');
    }
    if (args.fullsize) {
        // default size (sometimes) causes uploading page's "Done" button to be out of viewport,
        // causing "element not interactable" error therefore here make the window size large
        chromeOptions.windowSize({ width: 1920, height: 1080 });
    }
    const webdriverPath = await (0, node_chromedriver_downloader_1.ensureChromedriver)();
    const service = new chrome_1.default.ServiceBuilder(webdriverPath);
    // chrome.setDefaultService(new chrome.ServiceBuilder(webdriverPath).build())
    return new selenium_webdriver_1.Builder()
        .withCapabilities(selenium_webdriver_1.Capabilities.chrome())
        .setChromeOptions(chromeOptions)
        .setChromeService(service)
        .build();
};
exports.makeWebDriver = makeWebDriver;
