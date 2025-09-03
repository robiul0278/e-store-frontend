'use client';

import { Controller, UseFormReturn } from "react-hook-form";
import { ProductFormType } from "@/types/types";
import ImageUpload from "@/components/ImageUpload";
import { SelectCategoryInput } from "@/components/SelectCategoryInput";

interface ProductFormProps {
    form: UseFormReturn<ProductFormType>;
    onSubmit: (data: ProductFormType) => void;
}

export default function ProductForm({ form, onSubmit }: ProductFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = form;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Photos Upload */}
            <div>
                <Controller
                    control={control}
                    name="photos"
                    render={({ field }) => (
                        <ImageUpload
                            value={field.value || []}
                            onChange={(files) => field.onChange(files)}
                        />
                    )}
                />
                {errors.photos && (
                    <p className="text-red-500 text-sm">{errors.photos.message}</p>
                )}
            </div>
            {/* Name */}
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    placeholder="Product name"
                    className="w-full rounded-md border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Price */}
                <div>
                    <label className="block text-sm font-medium">Price ($)</label>
                    <input
                        type="number"
                        placeholder="00"
                        className="w-full rounded-md border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                        {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                {/* Discount */}
                <div>
                    <label className="block text-sm font-medium">Discount (%)</label>
                    <input
                        type="number"
                        placeholder="00"
                        className="w-full rounded-md border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                        {...register("discount", { valueAsNumber: true })}
                    />
                    {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
                </div>

                {/* Categories with Controller */}
                <div>
                    <label className="block text-sm font-medium">Categories</label>
                    <Controller
                        control={control}
                        name="categories"
                        render={({ field }) => (
                            <SelectCategoryInput
                                value={field.value || []}
                                onChange={(val) => field.onChange(val)}
                            />
                        )}
                    />
                    {errors.categories && <p className="text-red-500 text-sm">{errors.categories.message}</p>}
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    rows={3}
                    placeholder="Product description"
                    className="w-full rounded-md border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                    {...register("description")}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md border border-amber-500 px-4 py-2 text-sm dark:text-gray-200 disabled:opacity-70 cursor-pointer"
            >
                {isSubmitting ? "Creating..." : "Create Product"}
            </button>
        </form>
    );
}
