import { atom, useAtom } from "jotai";
import React from "react";

const totalProductsAtom = atom<number>(0);
const filteredProductsAtom = atom<number>(0);

function Search(): React.JSX.Element {
  const [totalProducts, setTotalProducts] = useAtom(totalProductsAtom);
  const [filteredProducts, setFilteredProducts] = useAtom(filteredProductsAtom);

  return (
    <section className="grid grid-cols-4 gap-8">
      <label htmlFor="" className="bg-blue-300 col-span-2 h-fit">
        <input type="text" name="product" id="products-searchbar" placeholder="Buscar produtos por nome..." className="w-full" />
      </label>
      <div className="flex flex-col justify-center h-40 p-8 rounded-3xl shadow-gray-300 shadow">
        <strong className="text-3xl">{totalProducts}</strong>
        <p>Total de produtos</p>
      </div>
      <div className="flex flex-col justify-center h-40 p-8 rounded-3xl shadow-gray-300 shadow">
        <strong className="text-3xl">{filteredProducts}</strong>
        <p>Produtos filtrados</p>
      </div>
    </section>
  );
}

export default Search;