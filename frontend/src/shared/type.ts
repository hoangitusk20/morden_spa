export interface Service {
  _id: string;
  title: string;
  duration: number;
  price: number;
  image: string;
  description: string;
  detailDescription: string;
  category: string;
  quantity?: number;
}
