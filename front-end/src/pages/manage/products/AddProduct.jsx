import { Form, Link, useSubmit } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import { CaretLeftFill } from 'react-bootstrap-icons';

export const AddProduct = () => {
    const submit = useSubmit();

    return (
        <div className="add-product">
            <Row className="my-3">
                <Col xs={ 1 }>
                    <Button variant="outline-primary" size="sm"
                        as={ Link } to="..">
                        <CaretLeftFill />返回
                    </Button>
                </Col>

                <Col className="text-center"><h1><b>新增商品</b></h1></Col>
                <Col xs={ 1 } />
            </Row>

            <Form method='POST' onSubmit={ event => submit(event.currentTarget) }>
                <label htmlFor="name">名稱</label>
                <input type="text" name="name" id="name"/>

                <label htmlFor="price">價格</label>
                <input type="number" name="price" id="price"/>

                <label htmlFor="description">說明</label>
                <input type="text" name="description" id="description" />

                <label htmlFor="image">圖片</label>
                <input type="file" name="image" id="image" />

                <label htmlFor="countInStock">庫存</label>
                <input type="number" name="countInStock" id="countInStock" />

                <Button type='submit'>新增</Button>
            </Form>
        </div>
    );
};

export default AddProduct;
