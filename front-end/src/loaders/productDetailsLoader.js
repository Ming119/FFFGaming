
export const productDetailsLoader = async ({ params }) => {
    const { id } = params
    return { id, name: "Product Name", price: 100, description: "Product Description" };
    
    // const productDetails = await fetchProductDetails(id);

    // if (!productDetails)
    //     throw Error("Unable to load product details");

    // return productDetails;
};

export default productDetailsLoader;