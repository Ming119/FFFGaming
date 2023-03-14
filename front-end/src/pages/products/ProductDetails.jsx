import { Link, useLoaderData, useParams } from "react-router-dom";
import { Button, Row, Col, Image } from "react-bootstrap";
import { CaretLeftFill } from "react-bootstrap-icons";
import { Carousel } from 'react-bootstrap';

export const ProductDetails = () => {
    const { id } = useParams();
    const productDetails = useLoaderData();
    
    const getAllImages = () => {
        const images = [];
        for (let i = 0; i < productDetails.images.length; i++) {
            images.push(
                <Carousel.Item>
                    <img src={productDetails.images[i]} className="w-100" />
                </Carousel.Item>
            );
        }
        return images;
    }

    return (
    <div className="product-details">
        <Button variant="outline-primary" size="sm" as={ Link } to=".." className="my-3">
            <CaretLeftFill />返回
        </Button>

        <Row className="my-3">
            <Col sm={12} md={6}>
            <Carousel>{ getAllImages() }</Carousel>
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