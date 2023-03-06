import { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { FloatingLabel } from '../../../components/FloatingLabel';

export const AddProduct = () => {

    const [ file, setFile ] = useState(null);
    const [ fileDataURL, setFileDataURL ] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file.type.match(/image\/(png|jpg|jpeg)/i)) {
            alert('請上傳圖片檔案');
            return;
        }
        setFile(file);
    };

    useEffect(() => {
        let fileDataURLReader, isCancel = false;
        if (file) {
            fileDataURLReader = new FileReader();

            fileDataURLReader.onload = (e) => {
                if (!isCancel) {
                    setFileDataURL(e.target.result);
                    sessionStorage.setItem('imageDataURL', e.target.result);
                }
            };

            fileDataURLReader.readAsDataURL(file);
        }
    
        return () => {
            isCancel = true;
            if (fileDataURLReader && fileDataURLReader.readyState === 1) fileDataURLReader.abort();
        }
    }, [file]);
    
    return (
    <div className="add-product">
        <Row className="my-3">
            <Col xs={1}>
                <Button variant="outline-primary" size="sm" as={ Link } to="..">
                    <CaretLeftFill />返回
                </Button>
            </Col>
            <Col className="text-center"><h1><b>新增商品</b></h1></Col>
            <Col xs={1} />
        </Row>

        <Card>
            <Card.Body>
                <Form method='POST'>
                    <Row className='my-3'>
                        <Col><FloatingLabel type="text" name="productName" id="productName" label="商品名稱" /></Col>
                        <Col><FloatingLabel type="number" name="price" id="price" label="價格" /></Col>
                        <Col> <FloatingLabel type="number" name="countInStock" id="countInStock" label="庫存" /></Col>
                    </Row>

                    <Row className='my-3'>
                        <FloatingLabel type="text" name="description" id="description" label="說明" textarea />
                    </Row>

                    <Row className='my-3 mx-auto'>
                        <label className="form-label" htmlFor="image">圖片</label>
                        <input type="file" className="form-control"
                            name="image" id="image" accept="image/*"
                            onChange={ handleImageChange } />
                    </Row>

                    <Row className='mx-auto my-3'><Button type='submit'>新增</Button></Row>
                </Form>
            </Card.Body>

            { fileDataURL ?
            <Card.Img src={ fileDataURL } /> : null }
        </Card>
    </div>
    );
};

export default AddProduct;
