import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CATEGORIES } from "@/constants/categories";
import { FormData } from "@/types/addPages";

interface CategorySelectProps {
    register: UseFormRegister<FormData>
}

const CategorySelect: React.FC<CategorySelectProps> = ({ register }) => {
    const normalizeCategory = (str: string): string =>
        str
            .toLowerCase()
            .replace(
                /[ąćęłńóśźż]/g,
                (c) =>
                    ({
                        ą: "a",
                        ć: "c",
                        ę: "e",
                        ł: "l",
                        ń: "n",
                        ó: "o",
                        ś: "s",
                        ź: "z",
                        ż: "z",
                    }[c] ?? c)
            )
            .replace(/\s+/g, "-");

    return (
        <label className="block">
            <span className="text-sm font-medium text-gray-700">
                Kilka Histori (zdjecia z kategorii)
            </span>
            <select
                {...register("blogCategory")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">-- Wybierz kategorię --</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={normalizeCategory(cat)}>
                        {cat}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default CategorySelect;
