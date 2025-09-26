import axios from "axios";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { ProductData } from "../interfaces/product-data.interface";

export const productsDataAtom = atom<ProductData[]>([]);


export function useProducts() {
  const [productsData, setProductsData] = useAtom(productsDataAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products-crud`);
      setProductsData(response.data.productsData);
    } catch (err) {
      setError("Erro ao buscar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { productsData, loading, error, refetch: fetchProducts };
}
