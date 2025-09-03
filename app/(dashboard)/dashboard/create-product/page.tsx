'use client';

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "@/redux/api/api";
import { slugify as transliterateSlug } from "transliteration";
import { ProductFormType, TGenericErrorResponse } from "@/types/types";
import ProductForm from "@/components/ProductForm";

export default function CreateProduct() {
  const [createProduct] = useCreateProductMutation();

  const form = useForm<ProductFormType>({
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      discount: undefined,
      categories: [],
      photos: [],
    },
  });

  const onSubmit = async (data: ProductFormType) => {
    try {
      const formData = new FormData();
      const baseSlug = transliterateSlug(data.name, { lowercase: true, separator: "-" });
      const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 8)}`;

      // photos append
      if (data.photos && data.photos.length > 0) {
        data.photos.forEach((file) => {
          formData.append("photos", file);
        });
      }

      // JSON data append
      formData.append(
        "data",
        JSON.stringify({
          name: data.name,
          slug,
          description: data.description,
          price: data.price,
          discount: data.discount,
          categories: data.categories,
          photos: data.photos.map((file) => file.name), // for zod validation
        })
      );

      const response = await createProduct(formData).unwrap();
      console.log("response", response);
      if (response.success) {

        toast.success(response.message || "Product created successfully");
        form.reset();
      } else {
        toast.error(response.message || "Failed to create product");
      }
    } catch (error: unknown) {
      console.log(error);
      const err = error as { data: TGenericErrorResponse };
      if (err?.data?.errorSources && Array.isArray(err.data.errorSources)) {
        err.data.errorSources.forEach(({ path, message }) => {
          form.setError(path as keyof ProductFormType, { type: "server", message });
        });
      } else {
        toast.error(err?.data?.message || "Something went wrong");
      }
    }
  };

  return <ProductForm form={form} onSubmit={onSubmit} />;
}
