import React from 'react';
import { getProducts } from '@/lib/actions/product';
import { LandingPage } from '@/components/home/LandingPage';

export default async function Home() {
  const products = await getProducts();

  return (
    <LandingPage products={products} />
  );
}