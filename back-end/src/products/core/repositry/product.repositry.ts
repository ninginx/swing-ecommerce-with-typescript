import { ProductType } from '../domain/product';

export interface ProductRepositry {
  save(product: ProductType): Promise<void>;
  //findById(id: string): Promise<ProductType>;
  //findByCategory(category: string): Promise<ProductType[]>;
}

export interface ProductImgRepositry {
  upload(img: BinaryType): Promise<void>;
  download(imgUrl: string): Promise<string>;
}
