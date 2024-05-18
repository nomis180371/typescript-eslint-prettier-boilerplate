import puppeteer, { Browser, BrowserConnectOptions, Page } from 'puppeteer';
import { ImageDtoType } from './scrapperTypes';
import { ScrapperRepository } from './scrapperRepository';

const baseUrl = 'https://www.vinted.fr/catalog?catalog[]=5';

export class ScrapperService {
  public scrapperRepository: ScrapperRepository;

  constructor() {
    this.scrapperRepository = new ScrapperRepository();
  }

  public async startScraping() {
    const browser: Browser = await puppeteer.launch({});
    try {
      const page = await browser.newPage();
      await page.goto(baseUrl, {
        waitUntil: 'domcontentloaded',
      });

      const links = await this.getLinks(page);
      page.close();
      const productData = await this.getProductsData(links, browser);

      return productData;
    } catch (error) {
      console.log('ScrappingService.startScraping', error);
      throw error;
    } finally {
      await browser.close();
      this.startScraping();
    }
  }

  private async getLinks(page: Page) {
    await page.waitForSelector('.new-item-box__overlay--clickable');

    const links = await page.evaluate(() => {
      const productLinks = [];
      const productLinksElements = document.querySelectorAll(
        '.new-item-box__overlay--clickable'
      );
      productLinksElements.forEach((element) => {
        productLinks.push(element.getAttribute('href'));
      });
      return productLinks;
    });

    return links;
  }

  private async getProductsData(links: string[], browser: Browser) {
    for (const link of links) {
      const productPage = await browser.newPage();
      try {
        await productPage.goto(link, { waitUntil: 'domcontentloaded' });
        await productPage.waitForSelector('script#__NEXT_DATA__', {
          timeout: 20000,
        });

        const productInfo = await productPage.evaluate(() => {
          const jsonElement = document.querySelector('script#__NEXT_DATA__');
          const json = JSON.parse(jsonElement?.textContent || '');
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
          feedbackReputation: Number(
            jsonData.user.feedback_reputation.toFixed(2)
          ),
        };

        const isProductAlreadyRegistered: boolean = await this.scrapperRepository.checkProductExistance(
          product
        );
        if (!isProductAlreadyRegistered) {
          this.scrapperRepository.saveProduct(product);
        } else {
          console.log(`Product already exists for ${link}`);
        }
      } catch (error) {
        console.log('scrapperService.getProductsData', error);
      } finally {
        await productPage.close();
      }
    }
  }

  private getItemTypeFromString(str: string) {
    let elements = str.split(' → ');
    return elements[elements.length - 2];
  }

  private getImagesUrl(images: ImageDtoType[]) {
    return images.map((img) => {
      return img.url;
    });
  }
}
