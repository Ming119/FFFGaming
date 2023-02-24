import { fetchProductDetails } from "../firebase";

export const ProductDetailsLoader = async ({ params }) => {
    const { id } = params

    const productDetails = await fetchProductDetails(id);

    if (!productDetails)
        throw Error("Unable to load product details");

    return productDetails;
};

export default ProductDetailsLoader;