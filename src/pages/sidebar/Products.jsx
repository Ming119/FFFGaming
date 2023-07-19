import { Link, useLoaderData } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';


const AllProducts = (props) => {

    const products = useLoaderData();

    return (
            <div className="products">
                <h1>{props.title}</h1>
                <Row className='my-3'>
                    { products.map((product) => (
                        product.isEnabled && (
                        <Col key={ product.id } sm={12} md={6} lg={4} xl={3}>
                            <Card as={ Link } to={`/products/${product.id}`} className="text-reset text-decoration-none">
                                <Card.Img variant="top" src={ product.image } />
                                <Card.Body>
                                    <Card.Title>{ product.name }</Card.Title>
                                    <Card.Text>{ `$${product.price}` }</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))) }
                </Row>
            </div>
    );
};

export default AllProducts;