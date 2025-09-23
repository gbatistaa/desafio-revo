import axios from "axios";
import { atom, useAtom } from "jotai";
import React, { useEffect } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { ProductData } from "../interfaces/product-data.interface";

const initialProductsData: ProductData[] = [
  {
    id: "1",
    name: "Produto A",
    description: "Descrição do Produto A",
    price: 100.0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Produto B",
    description: "Descrição do Produto B",
    price: 200.0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const productsDataAtom = atom<ProductData[]>(initialProductsData);

function ProductsTable(): React.JSX.Element {
  const [productsData, setProductsData] = useAtom(productsDataAtom);

  useEffect(() => {
    async function fetchData() {
      const productsResponse = await axios.get("http://localhost:4000/products-crud");
      setProductsData(productsResponse.data.productsData);
      console.log(productsResponse.data.productsData)
    }
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto shadow shadow-gray-300 p-4 rounded-lg">
      <table className="table-auto w-full">
        <thead>
          <tr className="h-13">
            <th className="px-4 py-2 text-left text-gray-400 font-semibold min-w-[150px]">
              Nome
            </th>
            <th className="px-4 py-2 text-left text-gray-400 font-semibold">
              Descrição
            </th>
            <th className="px-4 py-2 text-left text-gray-400 font-semibold min-w-[120px]">
              Preço
            </th>
            <th className="px-4 py-2 text-left text-gray-400 font-semibold">
              Criado em
            </th>
            <th className="px-4 py-2 text-left text-gray-400 font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product, index) => {
            return (
              <tr key={index} className="h-13 border-t border-gray-300">
                <td className="px-4 py-2 font-semibold text-nowrap">
                  {product.name}
                </td>
                <td className="px-4 py-2 font-semibold text-gray-400 text-nowrap">
                  {product.description}
                </td>
                <td className="px-4 py-2 font-semibold text-nowrap">
                  R${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 font-semibold text-gray-400 text-nowrap">
                  {new Date(product.createdAt).toLocaleDateString("pt-br")}
                </td>
                <td className="px-4 py-2 font-semibold text-nowrap">
                  <div className="flex h-full items-center gap-4">
                    <button type="button" className="flex justify-center items-center cursor-pointer">
                      <FaRegEdit />
                    </button>
                    <button type="button" className="flex justify-center items-center cursor-pointer">
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;