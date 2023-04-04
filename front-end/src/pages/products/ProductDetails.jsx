import { useState } from "react";
import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import { Button, Carousel, Col, Image, Row } from "react-bootstrap";
import { CartPlus, CaretLeftFill } from "react-bootstrap-icons";

export const ProductDetails = () => {
    const { id } = useParams();
    const product = useLoaderData();

    const [ quantity, setQuantity ] = useState(1);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const attributes = product.attributes;

    const onRadioClick = (index, e) => {
        if (e.target.tagName === "A" || e.target.tagName === "SPAN") {            
            const className = e.target.className;
            if (className === "carousel-control-prev" || className === "carousel-control-prev-icon") {
                if (currentIndex === 0) setCurrentIndex(product.images.length - 1);
                else setCurrentIndex(currentIndex - 1);
            } else if (className === "carousel-control-next" || className === "carousel-control-next-icon") {
                if (currentIndex === product.images.length - 1) setCurrentIndex(0);
                else setCurrentIndex(currentIndex + 1);
            }
            return;
        }

        const name = e.target.name.split('_')[1];
        const correspondingImage = product.correspondingImage;

        if (!correspondingImage || correspondingImage !== name) return;

        setCurrentIndex(index);
    };

    return (
    <div className="product-details">
        <Button variant="outline-primary" size="sm" as={ Link } to=".." className="my-3">
            <CaretLeftFill />返回
        </Button>

        <Row className="my-3">
            <Col sm={12} md={6} lg={4}>
                { product.correspondingImage ? (
                    <Carousel interval={ null } activeIndex={ currentIndex } onSelect={ onRadioClick }>
                        { product.images && (
                        product.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <Image src={image} className="w-100" />
                            </Carousel.Item>
                        ))) }
                    </Carousel>
                    ) : (
                    <Carousel>
                        { product.images && (
                            product.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <Image src={image} className="w-100" />
                                </Carousel.Item>
                        ))) }
                    </Carousel>
                ) }
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
                    
                    { attributes && (attributes.map((attribute, index) => (
                        <Row className="my-3" key={index}>
                            <Col className="fs-6">
                                { attribute.name }
                                <input type="hidden" name="options" value={ attribute.name } />
                                { attribute.values.map((item, index) => (
                                    <div key={index} className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name={ `options_${attribute.name}` } id={ item } value={ item }
                                            onClick={ (e) => onRadioClick(index, e) }/>
                                        <label className="form-check-label" htmlFor={ item }>{ item }</label>
                                    </div>
                                )) }
                            </Col>
                        </Row>
                    ))) }
                    
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