import { useAtom } from "jotai";
import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { isProductFormOnAtom } from "./ProductForm";

function Header(): React.JSX.Element {
  const [, setIsProductFormOn] = useAtom(isProductFormOnAtom);

  const handleCreateProductButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setIsProductFormOn(true);
  }

  return (
    <header className="flex items-center justify-between h-16">
      <div className="flex items-center gap-4 h-full w-full">
        <div className="flex justify-center items-center h-2/3 w-auto aspect-square bg-gray-200 rounded-lg">
          <BsBoxSeam className="h-3/5 w-auto" />
        </div>
        <div>
          <h1 className="font-bold text-3xl">Gerenciamento de Produtos</h1>
          <p className="text-gray-500">Gerencie seu catálogo de produtos</p>
        </div>
      </div>
      <button
        type="button"
        className="flex items-center justify-between bg-black text-white cursor-pointer h-10
          gap-4 p-3 rounded-lg hover:bg-neutral-700 ease-out duration-150"
        onClick={(e) => { handleCreateProductButtonClick(e) }}
      >
        <FaPlus />
        <p className="text-nowrap text-normal font-semibold">Novo Produto</p>
      </button>
    </header>
  );
}

export default Header;