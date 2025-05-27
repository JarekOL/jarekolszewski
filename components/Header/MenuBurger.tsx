"use client";

import { MenuBurgerProps } from "@/types/types";

export default function MenuBurger({
  handleShowMenu,
  showMenu,
}: MenuBurgerProps) {
  const burgerClass = "h-[1px] w-5 duration-300";

  return (
    <button
      onClick={handleShowMenu}
      aria-label={showMenu ? "Zamknij menu" : "Otwórz menu"}
      aria-expanded={showMenu}
      className="z-[999] flex ml-auto flex-col items-center justify-center space-y-1.5 p-1 lg:hidden"
    >
      <div
        className={`${burgerClass} transform transition-all ${
          showMenu
            ? "bg-black translate-y-1.5 rotate-[405deg]"
            : "bg-brand-nav"
        }`}
      />
      <div
        className={`${burgerClass} transition-all ${
          showMenu ? "bg-black opacity-0" : "bg-brand-nav"
        }`}
      />
      <div
        className={`${burgerClass} transform transition-all ${
          showMenu
            ? "bg-black -translate-y-2 -rotate-45"
            : "bg-brand-nav"
        }`}
      />
    </button>
  );
}