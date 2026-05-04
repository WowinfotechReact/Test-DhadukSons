import {
  getApiWithAuthorization,
  postApiWithAuthorization,
} from "../APIServices/APIServices/APIServices";
import { Base_URL } from "../components/Base_URL";

export interface productSize {
  productSizeID: number;
  ProductSizeKeyID: string; //Changed due to home page sizekeyid
  productKeyID: string;
  imageUrl: string;
  ProductSize: string; // "5", "2", etc.
  productTitle: string; // "5", "2", etc.
  productPrice: string; // "750.00"
  productDiscount: string; // "12.00"
  productUnitKeyID: string;
  productUnitName: string; // "Dozen", "KG"
  productPriceUSD: string;
  productDiscountUSD: string; // "12.00"
  Status: number; // "12.00"
}

export interface productSizeHome {
  productSizeID: number;
  slug: string;
  productSizeKeyID: string; //Changed due to home page sizekeyid
  key: string; //Changed due to home page sizekeyid
  productKeyID: string;
  imageUrl: string;
  productSize: string; // "5", "2", etc.
  productTitle: string; // "5", "2", etc.
  productPrice: string; // "750.00"
  productDiscount: string; // "12.00"
  productUnitKeyID: string;
  productUnitName: string; // "Dozen", "KG"
  productPriceUSD: string;
  productDiscountUSD: string; // "12.00"
  Status: number; // "12.00"
  sizeStatus: number; // "12.00"
}

export interface Product {
  productID: number;
  productKeyID: string;
  productTitle: string;
  productDescription: string;
  imageUrl: string;
  status: string; // e.g. "Active"
  createdAt: string; // ISO string
  productSizes: productSize[];
  faqSchema: string; // New field for FAQ schema,
  slug: string; // New field for slug,
  productSchema: string; // New field for product schema,
  canonicalTag: string; // New field for canonical tag
  breadcrumbSchema: string; // New field for breadcrumb schema
  metaTitle: string; // New field for meta title
  metaDescription: string; // New field for meta description
}

export interface ProductHome {
  productID: number;
  productKeyID: string;
  productTitle: string;
  productDescription: string;
  slug: string;
  imageUrl: string;
  status: string; // e.g. "Active"
  createdAt: string; // ISO string
  productSizes: productSizeHome[];
}

export interface GetAllProductsForWebResponse {
  statusCode: number;
  errorMessage: string | null;
  message: string;
  totalCount: number;
  responseData: {
    data: ProductHome[];
  };
}

export const GetAllProductsForWeb = async (params: {
  pageNo: number;
  pageSize: number;
}): Promise<GetAllProductsForWebResponse> => {
  const url = `${Base_URL}/product/getAllProductsForWeb`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};
export const GetWishListProductListForWebData = async (params: {
  pageNo: number;
  pageSize: number;
  userKeyID?: string;
}): Promise<GetAllProductsForWebResponse> => {
  const url = `${Base_URL}/product/GetWishListProductListForWebData`;
  const res = await postApiWithAuthorization(url, params);

  return res;
};
export interface GetProductDetailsForWebResponse {
  statusCode: number;
  errorMessage: string | null;
  message: string;
  responseData: Product; // We already have Product interface from before
}

export const GetProductDetailsForWeb = async (productKeyID: string) => {
  const url = `${Base_URL}/product/GetProductDetailsForWeb?productKeyID=${productKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
export const getAllProductImageByProductIDForWeb = async (
  productKeyID: string
) => {
  const url = `${Base_URL}/productImage/getAllProductImageByProductIDForWeb?productKeyID=${productKeyID}`;
  const res = await getApiWithAuthorization(url);

  return res;
};
export const getWishlistCount = async (userKeyID: string): Promise<number> => {
  const url = `${Base_URL}/product/getWishlistCount?userKeyID=${userKeyID}`;
  const res = await getApiWithAuthorization(url);
  return res.responseData.data || 0; // Assuming the API returns the count in this format
};
