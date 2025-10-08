import axios from "axios";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { ProductData } from "../interfaces/product-data.interface";
import { socketAtom } from "../page";

export const productsDataAtom = atom<ProductData[]>([]);


export function useProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [socket] = useAtom(socketAtom);
  const [productsData, setProductsData] = useAtom(productsDataAtom);

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

  socket.on("products", async (data: { action: string }) => {
    if (data.action === "refetch") {
      fetchProducts();
    }
  })

  const updateServerProducts = () => {
    socket.emit("products", { action: "refetch" });
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { productsData, loading, error, refetch: updateServerProducts };
}
