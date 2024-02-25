export interface ScrapedData {
  title: string;
  price: number;
  brand: string;
  viewNumber: number;
  condition: string;
  description: string;
  vendor: {
    name: string;
    link: string;
    rating: number;
    reviewNumber: number;
  };
  imageSrcList: string[];
}
