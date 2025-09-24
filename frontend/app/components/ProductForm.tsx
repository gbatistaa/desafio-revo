import axios from "axios";
import { atom, useAtom } from "jotai";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useProducts } from "../hooks/useProducts";
import { productIdToEditAtom } from "./ProductsTable";

export const isCreateMethodAtom = atom<boolean>(true);
export const isProductFormOnAtom = atom<boolean>(true);

function ProductForm(): React.JSX.Element {
  const [productIdToEdit] = useAtom(productIdToEditAtom);
  const [isProductFormOn, setIsCreateProductFormOn] = useAtom(isProductFormOnAtom);
  const [isCreateMethod] = useAtom(isCreateMethodAtom);
  const { refetch } = useProducts();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCreateProductFormOn(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsCreateProductFormOn]);

  const handleProductFormsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const product = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
    };

    if (isCreateMethod)
      await axios.post("http://localhost:4000/products-crud", product);
    else
      await axios.put(`http://localhost:4000/products-crud/${productIdToEdit}`, product);

    setIsCreateProductFormOn(false);
    refetch();
  };

  const handleFormCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsCreateProductFormOn(false);
  }

  return (
    <div className={`justify-center items-center flex h-screen w-screen absolute z-20 bg-black/70 ${isProductFormOn ? "" : "hidden"}`}>
      <div className="flex flex-col gap-4 w-150 min-h-105 p-8 rounded-3xl bg-white">
        <header className="flex pb-4 justify-between border-b-1 border-gray-300">
          <h1 className="text-2xl font-semibold">{isCreateMethod ? "Criar novo produto" : "Editar produto"}</h1>
          <button
            type="button"
            onClick={(e) => handleFormCloseButtonClick(e)}
            className="flex justify-center items-center aspect-square cursor-pointer hover:-rotate-90 duration-150"
          >
            <IoClose className="h-3/4 w-auto" />
          </button>
        </header>
        <form className="flex flex-col items-center gap-6 px-4" onSubmit={(e) => { handleProductFormsSubmit(e) }} >
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="name" className="font-medium text-lg">Nome</label>
            <input type="text"
              name="name"
              autoComplete="off"
              id="name"
              className="h-8 px-2 py-1 rounded shadow text-gray-600 shadow-gray-400"
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label
              htmlFor="description"
              className="font-medium text-lg"
            >
              Descrição
            </label>
            <textarea name="description" autoComplete="off" id="description" className="h-20 px-2 py-1 resize-none rounded shadow text-gray-600 shadow-gray-400" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="price" className="font-medium text-lg">Preço</label>
            <input type="number" name="price" autoComplete="off" className="h-8 px-2 py-1 rounded shadow text-gray-600 shadow-gray-400" />
          </div>

          <button
            type="submit"
            className="w-35 h-10 rounded-lg cursor-pointer font-semibold hover:bg-neutral-700 ease-out duration-150
           bg-black text-white"
          >
            {isCreateMethod ? "Criar" : "Editar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;