import apiClient from 'lib/apiClient';
import { VFC } from 'react';
import Register, { ProductForm } from '../presentational/register';

const EnhancedRegister: VFC = () => {
  const submitProduct = (product: ProductForm) => {
    if (typeof process.env.NEXT_PUBLIC_BACK_END_API === 'undefined') {
      // エラーハンドリングを追加
      console.log('環境変数が設定されていません');

      return;
    }

    if (product.picture.item.length === 0) {
      // エラーハンドリングを追加
      return;
    }
    const data = new FormData();
    data.append('name', product.name);
    data.append('category', product.category);
    data.append('price', product.price.toString());
    data.append('description', product.description);
    data.append('picture', product.picture.item(0)!);

    apiClient
      .request({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_BACK_END_API}/product`,
        data,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <Register submitProduct={submitProduct} />;
};

export default EnhancedRegister;
