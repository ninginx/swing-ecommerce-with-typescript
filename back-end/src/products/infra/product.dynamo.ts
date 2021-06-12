import {
  //  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  // ScanCommand,
  // ScanCommandInput,
  GetItemCommand,
  GetItemCommandInput,
} from '@aws-sdk/client-dynamodb';

import { ProductType } from '../core/domain/product';
import { ProductRepositry } from '../core/repositry/product.repositry';

class ProductDynamoService implements ProductRepositry {
  private readonly dynamoDBClient: DynamoDBClient;
  constructor() {
    this.dynamoDBClient = new DynamoDBClient({
      region: 'ap-northeast-1',
    });
  }

  save(product: ProductType): Promise<void> {
    const putParams: PutItemCommandInput = {
      TableName: 'Products',
      Item: {
        Id: {
          S: product.id,
        },
        Category: {
          S: product.category ? product.category : '',
        },
        ImgUrl: {
          S: product.imgUrl ? product.imgUrl : '',
        },
        Description: {
          S: product.description ? product.description : '',
        },
        Price: {
          N: product.price.toString(),
        },
        Currency: {
          S: product.currency,
        },
        CreatedAt: {
          S: product.createdAt.toISOString(),
        },
      },
    };
    return new Promise((_resolve, reject) => {
      this.dynamoDBClient
        .send(new PutItemCommand(putParams))
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  findById(id: string): Promise<any | null> {
    const getParam: GetItemCommandInput = {
      TableName: 'Products',
      Key: {
        Id: { S: id },
      },
    };
    return new Promise((resolve, reject) => {
      this.dynamoDBClient
        .send(new GetItemCommand(getParam))
        .then((product) => {
          if (typeof product.Item === 'undefined') {
            resolve(null);
            return;
          }

          // if (!this.isProduct(product.Item)) {
          //   reject(new Error('Product型が不正です'));
          //   return;
          // }

          resolve(product.Item);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }

  // private isProduct = (arg: any): arg is ProductType => {
  //   return (
  //     typeof (arg.id as AttributeValue).S === 'string' &&
  //     typeof (arg.category as AttributeValue).S === 'string' ||
  //     typeof (arg.category as AttributeValue).S === 'undefined' &&
  //     typeof (arg.category as AttributeValue).S === 'string' &&
  //     typeof (arg.id as AttributeValue).S === 'string' &&
  //     typeof (arg.category as AttributeValue).S === 'string' &&

  //     // typeof (arg .category === 'string' &&
  //     // typeof (arg as ).category === 'undefined' &&
  //     // typeof (arg as ).imgUrl === 'string' &&
  //     // typeof (arg as ).imgUrl === 'undefined' &&
  //     // typeof (arg as ).description === 'string' &&
  //     // typeof (arg as ).description === 'undefined' &&
  //     // typeof (arg as ).price === 'string' &&
  //     // typeof (arg as ).currency === 'string' &&
  //     // typeof (arg as ).createdAt === 'string'
  //   );
  //};

  //findByCategory(category: string): Promise<ProductType[]>;
}

export default ProductDynamoService;
