import axios from "axios";
import { atom, useAtom } from "jotai";
import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { useProducts } from "../hooks/useProducts";
import Loader from "./Loader";
import { isCreateMethodAtom, isProductFormOnAtom } from "./ProductForm";
import { filteredProductsAtom, searchBarValueAtom } from "./Search";

export const productIdToEditAtom = atom<string>("");

function ProductsTable(): React.JSX.Element {
  const [searchBarValue] = useAtom(searchBarValueAtom);
  const [filteredProducts] = useAtom(filteredProductsAtom);
  const [, setIsCreateMethod] = useAtom(isCreateMethodAtom);
  const [, setProductIdToEdit] = useAtom(productIdToEditAtom);
  const [, setIsCreateProductFormOn] = useAtom(isProductFormOnAtom);
  const { productsData, loading, error, refetch } = useProducts();

  const handleEditButtonClick = (event: React.MouseEvent<HTMLButtonElement>, productId: string): void => {
    event.preventDefault();

    setIsCreateMethod(false);
    setIsCreateProductFormOn(true);
    setProductIdToEdit(productId);
  }

  const handleDeleteProduct = async (event: React.MouseEvent<HTMLButtonElement>, productId: string) => {
    event.preventDefault();

    const deleteResponse = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${productId}`);
    console.log(deleteResponse.data.message);

    refetch();
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col gap-2 overflow-x-auto shadow shadow-gray-300 p-4 rounded-lg">
      <h1 className="text-2xl font-semibold">Lista de produtos</h1>
      {
        (searchBarValue.length === 0 ? productsData.length === 0 : filteredProducts.length === 0) &&
        <div className="flex flex-col items-center justify-center h-40 w-full gap-3">
          <FaRegFaceSadCry className="h-15 w-auto" fill="#99a1af" />
          <p className="text-xl font-semibold text-gray-400">Nenhum produto {productsData.length === 0 ? "cadastrado" : "filtrado"}</p>
        </div>
      }

      {loading && <Loader />}

      {!loading && (
        searchBarValue.length > 0
          ? filteredProducts.length > 0
          : productsData.length > 0
      ) &&
        <table className="table-auto w-full">
          <thead>
            <tr className="h-13">
              <th className="px-4 py-2 text-left text-xl text-gray-400 font-semibold min-w-[150px]">
                Nome
              </th>
              <th className="px-4 py-2 text-left text-xl text-gray-400 font-semibold">
                Descrição
              </th>
              <th className="px-4 py-2 text-left text-xl text-gray-400 font-semibold min-w-[120px]">
                Preço
              </th>
              <th className="px-4 py-2 text-left text-xl text-gray-400 font-semibold">
                Criado em
              </th>
              <th className="px-4 py-2 text-left text-xl text-gray-400 font-semibold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {(searchBarValue.length === 0 ? productsData : filteredProducts).map((product, index) => {
              return (
                <tr key={index} className="h-13 border-t border-gray-300">
                  <td className="px-4 py-2 font-semibold text-nowrap">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-400 text-nowrap">
                    {product.description}
                  </td>
                  <td className="px-4 py-2 font-semibold text-nowrap">
                    R$ {product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-400 text-nowrap">
                    {new Date(product.createdAt).toLocaleDateString("pt-br")}
                  </td>
                  <td className="px-4 py-2 font-semibold text-nowrap">
                    <div className="flex h-full items-center gap-4">
                      <button
                        type="button"
                        className="flex justify-center items-center cursor-pointer"
                        onClick={(e) => handleEditButtonClick(e, product.id)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        type="button"
                        className="flex justify-center items-center cursor-pointer"
                        onClick={(e) => handleDeleteProduct(e, product.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>}
    </div>
  );
}

export default ProductsTable;