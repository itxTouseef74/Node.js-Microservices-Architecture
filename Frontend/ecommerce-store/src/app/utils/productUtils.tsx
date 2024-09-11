// utils/productUtils.ts
import { Product } from "../products/components/productList";

export const fetchProducts = async (): Promise<Product[]> => {
  const productBaseUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;
  
  try {
    const response = await fetch(`${productBaseUrl}`);
    const data = await response.json();
    
    if (data.products && Array.isArray(data.products)) {
      return data.products;
    } else {
      console.error("Products data is not in the expected format");
      return [];
    }
  } catch (error) {
    console.error("ERROR FETCHING PRODUCTS", error);
    return [];
  }
};
