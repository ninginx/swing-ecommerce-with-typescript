import { v4 } from 'uuid';

export type ProductType = {
  id: string;
  category?: string;
  imgUrl?: string;
  description?: string;
  price: number;
  currency: '¥' | '$';
  createdAt: Date;
};

class Product {
  private id: string;
  private category?: string;
  private imgUrl?: string;
  private description?: string;
  private price: number;
  private currency: '¥' | '$';
  private createdAt: Date;

  constructor(product: ProductType) {
    this.id = product.id ? product.id : v4();
    this.category = product.category;
    this.description = product.description;
    this.imgUrl = product.imgUrl;
    this.price = product.price;
    this.currency = product.currency;
    this.createdAt = product.createdAt;
  }

  getProduct = (): ProductType => {
    return {
      id: this.id,
      category: this.category ? this.category : '',
      imgUrl: this.imgUrl ? this.imgUrl : '',
      description: this.description ? this.description : '',
      price: this.price,
      currency: this.currency,
      createdAt: this.createdAt,
    };
  };
}

export default Product;
