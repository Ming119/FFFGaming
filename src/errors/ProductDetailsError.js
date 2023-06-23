import { Link, useRouteError } from "react-router-dom";

export const ProductDetailsError = () => {
    const error = useRouteError();

    return (
        <div className="product-details-error">
            <h1>Product Details Error</h1>
            <p>{ error.message }</p>
            <Link to="/products">Back to Products</Link>
        </div>
    )
};

export default ProductDetailsError;