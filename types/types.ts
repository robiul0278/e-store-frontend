
export type LoginFormType = {
  email: string;
  password: string;
};
export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  photo: string;
};

export type TErrorSource = {
  path: string;
  message: string;
};

export type TGenericErrorResponse = {
  success?: boolean;
  statusCode: number;
  message: string;
  errorSources: TErrorSource[];
  stack?: string;
};

export type ProductFormType = {
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  categories: string[];
  photos: File[];
};


export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  photos: string[]; // array of photo URLs
  banner: string;
  description: string;
  price: number;
  discount?: number;
  discountPrice?: number;
  inStock: boolean; // stock status
  status: "active" | "inactive";
  categories: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type TUsers = {
  _id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  role: string;
}

export type TOrder = {
  shippingAddress: string;
  phone: string;
  paymentMethod: string;
}


export type TOrderProduct = {
  product: TProduct;
  quantity: number;
  price: number;
};

type User = {
  name: string;
  email: string;
  password: string;
  photo: string;
}

export type TOrderTable = {
  _id: string;
  user: User;
  products: TOrderProduct[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  phone: string;
  paymentMethod?: string;
  paymentStatus?: "pending" | "paid" | "failed";
  orderId: string;
  createdAt?: Date;
  updatedAt?: Date;
};