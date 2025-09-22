import { atom, useAtom } from "jotai";
import React from "react";
import { IoSearch } from "react-icons/io5";

const totalProductsAtom = atom<number>(0);
const filteredProductsAtom = atom<number>(0);

function Search(): React.JSX.Element {
  const [totalProducts, setTotalProducts] = useAtom(totalProductsAtom);
  const [filteredProducts, setFilteredProducts] = useAtom(filteredProductsAtom);

  return (
    <section className="grid grid-cols-4 gap-8">
      <label
        htmlFor="products-searchbar"
        className="flex items-center col-span-2 gap-4 h-10 px-2 rounded-lg shadow-gray-300 shadow
        focus-within:border-gray-400 focus-within:border-2">
        <IoSearch className="h-3/5 w-auto" />
        <input
          type="text"
          name="product"
          id="products-searchbar"
          placeholder="Buscar produtos por nome..."
          className="h-full w-full rounded-lg outline-none"
        />
      </label>
      <div className="flex flex-col justify-center h-40 p-8 rounded-3xl shadow-gray-300 shadow">
        <strong className="text-3xl">{totalProducts}</strong>
        <p className="text-gray-500">Total de produtos</p>
      </div>
      <div className="flex flex-col justify-center h-40 p-8 rounded-3xl shadow-gray-300 shadow">
        <strong className="text-3xl">{filteredProducts}</strong>
        <p className="text-gray-500">Produtos filtrados</p>
      </div>
    </section>
  );
}

export default Search;