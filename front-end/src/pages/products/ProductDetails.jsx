import { useLoaderData, useParams } from "react-router-dom";

export const ProductDetails = () => {
    const { id } = useParams();
    const productDetails = useLoaderData();
    
    return (
        <div className="product-details">
            <h2>{ id }</h2>
            <h3>Name: { productDetails.name }</h3>
            <p>Description: { productDetails.description }</p>
        </div>
    );
};

export default ProductDetails;