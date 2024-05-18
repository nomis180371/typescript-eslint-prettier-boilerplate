"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperService = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const scrapperRepository_1 = require("./scrapperRepository");
const baseUrl = 'https://www.vinted.fr/catalog?catalog[]=5';
class ScrapperService {
    constructor() {
        this.scrapperRepository = new scrapperRepository_1.ScrapperRepository();
    }
    startScraping() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch({});
            try {
                const page = yield browser.newPage();
                yield page.goto(baseUrl, {
                    waitUntil: 'domcontentloaded',
                });
                const links = yield this.getLinks(page);
                page.close();
                const productData = yield this.getProductsData(links, browser);
                return productData;
            }
            catch (error) {
                console.log('ScrappingService.startScraping', error);
                throw error;
            }
            finally {
                yield browser.close();
                this.startScraping();
            }
        });
    }
    getLinks(page) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitForSelector('.new-item-box__overlay--clickable');
            const links = yield page.evaluate(() => {
                const productLinks = [];
                const productLinksElements = document.querySelectorAll('.new-item-box__overlay--clickable');
                productLinksElements.forEach((element) => {
                    productLinks.push(element.getAttribute('href'));
                });
                return productLinks;
            });
            return links;
        });
    }
    getProductsData(links, browser) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const link of links) {
                const productPage = yield browser.newPage();
                try {
                    yield productPage.goto(link, { waitUntil: 'domcontentloaded' });
                    yield productPage.waitForSelector('script#__NEXT_DATA__', {
                        timeout: 20000,
                    });
                    const productInfo = yield productPage.evaluate(() => {
                        const jsonElement = document.querySelector('script#__NEXT_DATA__');
                        const json = JSON.parse((jsonElement === null || jsonElement === void 0 ? void 0 : jsonElement.textContent) || '');
                        return {
                            json,
                        };
                    });
                    if (!productInfo) {
                        console.log(`No product info found for ${link}`);
                        continue;
                    }
                    const jsonData = productInfo.json.props.pageProps.itemDto;
                    const imgsUrl = this.getImagesUrl(jsonData.photos);
                    const product = {
                        link,
                        imagesUrl: imgsUrl,
                        price: Number(jsonData.price.amount),
                        currency: jsonData.price.currency_code,
                        title: jsonData.title,
                        description: jsonData.description,
                        brand: jsonData.brand,
                        type: this.getItemTypeFromString(jsonData.catalog_branch_title),
                        size: jsonData.size,
                        viewCount: jsonData.view_count,
                        colorId: jsonData.color1_id,
                        isSuspicious: jsonData.photos.some((pic) => {
                            return pic.is_suspicious;
                        }),
                        feedbackReputation: Number(jsonData.user.feedback_reputation.toFixed(2)),
                    };
                    const isProductAlreadyRegistered = yield this.scrapperRepository.checkProductExistance(product);
                    if (!isProductAlreadyRegistered) {
                        this.scrapperRepository.saveProduct(product);
                    }
                    else {
                        console.log(`Product already exists for ${link}`);
                    }
                }
                catch (error) {
                    console.log('scrapperService.getProductsData', error);
                }
                finally {
                    yield productPage.close();
                }
            }
        });
    }
    getItemTypeFromString(str) {
        let elements = str.split(' → ');
        return elements[elements.length - 2];
    }
    getImagesUrl(images) {
        return images.map((img) => {
            return img.url;
        });
    }
}
exports.ScrapperService = ScrapperService;
//# sourceMappingURL=scrapperService.js.map