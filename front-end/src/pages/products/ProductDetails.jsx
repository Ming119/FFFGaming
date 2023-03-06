import { Link, useLoaderData, useParams } from "react-router-dom";
import { Button, Row, Col, Image } from "react-bootstrap";
import { CaretLeftFill } from "react-bootstrap-icons";

export const ProductDetails = () => {
    const { id } = useParams();
    const productDetails = useLoaderData();
    
    return (
    <div className="product-details">
        <Button variant="outline-primary" size="sm" as={ Link } to=".." className="my-3">
            <CaretLeftFill />返回
        </Button>

        <Row className="my-3">
            <Col sm={12} md={6}>
                <Image src={ productDetails.image } alt={ productDetails.name } fluid />
            </Col>
            <Col sm={12} md={6}>
                <h1>{ productDetails.name }</h1>
                <p>{ `價格：$${productDetails.price}` }</p>
                <p>{ `庫存：${productDetails.countInStock}` }</p>
            </Col>
        </Row>

        <hr />

        <p>{ productDetails.description }</p>
    </div>
    );
};

export default ProductDetails;