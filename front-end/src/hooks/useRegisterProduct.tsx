import { useEffect } from 'react';
import apiClient from '../lib/apiClient';

type Product = {
  name: string;
  category: string;
  description: string;
  price: number;
};

const useRegisterProduct = (product: Product): void => {
  useEffect(() => {
    apiClient
      .request({
        method: 'post',
        url: process.env.NEXT_PUBLIC_BACK_END_API,
        data: product,
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default useRegisterProduct;
