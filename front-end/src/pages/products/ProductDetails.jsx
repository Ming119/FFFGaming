import { useState } from "react";
import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import { Button, Carousel, Col, Image, Row } from "react-bootstrap";
import { CartPlus, CaretLeftFill } from "react-bootstrap-icons";

export const ProductDetails = () => {
    const { id } = useParams();
    const product = useLoaderData();

    const [ quantity, setQuantity ] = useState(1);

    return (
    <div className="product-details">
        <Button variant="outline-primary" size="sm" as={ Link } to=".." className="my-3">
            <CaretLeftFill />返回
        </Button>

        <Row className="my-3">
            <Col sm={12} md={6} lg={4}>
                <Carousel>
                    { product.images && (
                        product.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <Image src={image} className="w-100" />
                            </Carousel.Item>
                    ))) }
                </Carousel>
            </Col>

            <Col sm={12} md={6} lg={8}>
                <Form method="POST">
                    <input type="hidden" name="productId" id="productId" value={ id } />

                    <Row className="my-3">
                        <Col className="fs-1 fw-bold">{ product.name }</Col>
                    </Row>

                    <Row className="my-3">
                        <Col className="fs-2 fw-bold">{ `$${product.price}` }</Col>
                    </Row>

                    <Row className="my-3">
                        <Col className="fs-6">
                            數量<input type="number" name="quantity" id="quantity" min="1" max={ product.countInStock } value={ quantity } onChange={ (e) => { setQuantity(e.target.value) }} /> { `還剩 ${product.countInStock} 件` }
                        </Col>
                    </Row>

                    
                    <Button variant="success" type="submit"><CartPlus size="1.5rem" /> 加入購物車</Button>
                    
                </Form>
            </Col>
        </Row>

        <hr />

        <div dangerouslySetInnerHTML={{ __html: product.richText }} />
    </div>
    );
};

export default ProductDetails;