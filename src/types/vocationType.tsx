export type vacationType = {
    id: number;
    destination: string;
    description: string;
    start_vocation: string;
    end_vocation: string;
    price: number;
    url_image?:  File | null | string;
    followers_count: number;
  };