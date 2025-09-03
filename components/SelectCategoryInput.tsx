'use client';

import { FC } from "react";
type CategorySelectProps = {
  value: string[]; // selected categories from react-hook-form
  onChange: (value: string[]) => void;
};

const  categories = ["SUV", "Sedan", "Truck", "Bike", "Bus", "Van"];

export const SelectCategoryInput: FC<CategorySelectProps> = ({value, onChange }) => {
  const toggleCategory = (category: string) => {
    if (value.includes(category)) {
      onChange(value.filter((c) => c !== category));
    } else {
      onChange([...value, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => toggleCategory(category)}
          className={`px-4 py-1 rounded-md border transition ${
            value.includes(category)
              ? "bg-yellow-500 text-white border-yellow-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
