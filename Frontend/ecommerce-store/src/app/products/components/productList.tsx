'use client';

import { useState, useEffect } from "react";
import { CartItem, useCart } from "@/app/context/cartContext";
import Link from "next/link";
import { fetchProducts } from "@/app/utils/productUtils";
import { handleAddToCart } from "@/app/utils/cartUtils";


export interface Product {
  _id: string;
  name: string;
  desc: string;
  banner: string;
  type: string;
  unit: number;
  price: number;
  available: boolean;
  suplier: string;
  qty : number
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const productBaseUrl = process.env.NEXT_PUBLIC_PRODUCT_API_URL;
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${productBaseUrl}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Products data is not in the expected format");
        }
      })
      .catch((error) => console.error("ERROR FETCHING PRODUCTS", error));
  }, [productBaseUrl]);

  const handleAddToCart = (product: CartItem) => {
    // Create the request body with the product ID and default quantity of 1
    const cartItem: CartItem = {
      ...product,
      qty: 1,

    };

    // Call addToCart with the request body
    addToCart(cartItem);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="relative max-w-xs w-full overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <a href="#">
                <img
                  className="w-full h-60 object-cover object-center rounded-t-lg"
                  src={product.banner}
                  alt={product.name}
                />
              </a>
              <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
              <div className="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">{product.name}</h5>
                </a>
                <div className="mb-4 mt-2 flex items-center justify-between gap-4">
                  <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> Up to 35% off </span>

                  <div className="flex items-center justify-end gap-1">
                    <Link href="/products/details" >
                      <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2  text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">

                        <span className="sr-only"> Quick look </span>
                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                          <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </button>
                    </Link>
                    <div id="tooltip-quick-look" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                      Quick look
                      <div className="tooltip-arrow" data-popper-arrow=""></div>
                    </div>
                    <button type="button" data-tooltip-target="tooltip-add-to-favorites" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <span className="sr-only"> Add to Favorites </span>
                      <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                      </svg>
                    </button>
                    <div id="tooltip-add-to-favorites" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                      Add to favorites
                      <div className="tooltip-arrow" data-popper-arrow=""></div>
                    </div>
                  </div>
                </div>


                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>

                    <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>

                    <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>

                    <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>

                    <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                  </div>

                  <p className="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
                  <p className="text-sm font-medium ml-1 text-gray-500 dark:text-gray-400">({product.unit})</p>
                </div>
                <ul className="mt-3 flex items-center gap-4 mb-3">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                  </li>

                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                  </li>
                </ul>


                <div className="flex items-center justify-between">
                  <p>
                    <span className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${product.price}</span>
                  </p>
                  <button type="button" onClick={() =>{ console.log("Add to cart button clicked For product:" ,); handleAddToCart(product)}} className="inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                    </svg>
                    Add to cart
                  </button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className="w-full text-center">

        <button type="button" className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 mb-10">Show more</button>
      </div>
    </>
  )
}
