import axios from "axios";
import { atom, useAtom } from "jotai";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { productsDataAtom } from "../hooks/useProducts";
import { ProductData } from "../interfaces/product-data.interface";

export const searchBarValueAtom = atom<string>("");
export const filteredProductsAtom = atom<ProductData[]>([]);

function Search(): React.JSX.Element {
  const [productsData] = useAtom(productsDataAtom);
  const [searchBarValue, setSearchBarValue] = useAtom(searchBarValueAtom);
  const [filteredProducts, setFilteredProducts] = useAtom(filteredProductsAtom);

  const handleSearchBarValueChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchBarValue(value);

    if (value.length > 0) {
      try {
        const searchResponse = await axios.get("http://localhost:4000/products-crud/search", { params: { searchFilter: value } });

        console.log(searchResponse.data.filteredProducts);

        setFilteredProducts(searchResponse.data.filteredProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setFilteredProducts([]);
      }
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <section className="grid grid-cols-4 gap-8">
      <label
        htmlFor="products-searchbar"
        className="flex items-center col-span-2 gap-4 h-10 px-2 rounded-lg shadow-gray-300 border-3
         border-transparent shadow focus-within:border-gray-400 focus-within: ease-out duration-150">
        <IoSearch className="h-3/5 w-auto" />
        <input
          type="text"
          name="product"
          id="products-searchbar"
          value={searchBarValue}
          onChange={(e) => handleSearchBarValueChange(e)}
          placeholder="Buscar produtos por nome..."
          className="h-full w-full rounded-lg outline-none"
        />
      </label>
      <div className="flex flex-col justify-center h-40 p-8 rounded-3xl shadow-gray-300 shadow">
        <strong className="text-3xl">{productsData.length}</strong>
        <p className="text-gray-500">Total de produtos</p>
      </div>
      <div className="flex flex-col justify-center h-40 p-8 rounded-3xl shadow-gray-300 shadow">
        <strong className="text-3xl">{filteredProducts.length}</strong>
        <p className="text-gray-500">Produtos filtrados</p>
      </div>
    </section>
  );
}

export default Search;