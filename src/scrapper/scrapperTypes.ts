export interface IScrapperData {
  link: string;
  imagesUrl: string[];
  price: number;
  currency?: string;
  title: string;
  description?: string;
  brand?: string;
  type: string;
  size?: string;
  viewCount?: number;
  colorId?: string | number;
  isSuspicious?: boolean;
  feedbackReputation?: number;
}

export type ImageDtoType = {
  dominant_color: string;
  dominant_color_opaque: string;
  extra: Object;
  full_size_url: string;
  height: number;
  high_resolution: Object;
  id: number;
  image_no: number;
  is_hidden: boolean;
  is_main: boolean;
  is_suspisious: boolean;
  thumbnails: Object;
  url: string;
  width: number;
};
