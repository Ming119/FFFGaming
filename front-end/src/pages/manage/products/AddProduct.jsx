import { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { Carousel } from 'react-bootstrap';

export const AddProduct = () => {

    const [ files, setFiles ] = useState([]);
    const [ filesDataURL, setFilesDataURL ] = useState([]);

    const handleImageChange = (e) => {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match(/image\/(png|jpg|jpeg)/i)) {
                alert('請上傳圖片檔案');
                return;
            }
        }

        setFiles(files);
    };

    const showImages = () => {
        const images = [];
        for (let i = 0; i < files.length; i++) {
            images.push(
                <Carousel.Item key={i}>
                    <img src={filesDataURL[i]} className="w-100" />
                </Carousel.Item>
            );
        }
        return images;
    }

    useEffect(() => {
        let fileDataURLReader, isCancel = false;
        if (files) {
            const readFiles = (index) => {
                if (index >= files.length) return;

                fileDataURLReader = new FileReader();
                fileDataURLReader.onload = (e) => {
                    if (!isCancel) {
                        setFilesDataURL(prev => [...prev, e.target.result]);
                        sessionStorage.setItem(`imageDataURL_${index}`, e.target.result);
                    }
                };

                fileDataURLReader.readAsDataURL(files[index]);
                readFiles(index + 1);
            }
            
            readFiles(0);
            sessionStorage.setItem('imagesLength', files.length);
        }
    
        return () => {
            isCancel = true;
            if (fileDataURLReader && fileDataURLReader.readyState === 1) fileDataURLReader.abort();
        }
    }, [files]);
    
    return (
    <div className="add-product">
        <Row className="my-3">
            <Col xs={1}>
                <Button variant="outline-primary" size="sm" as={ Link } to="..">
                    <CaretLeftFill />返回
                </Button>
            </Col>
            <Col className="text-center fs-1 fw-bold">新增商品</Col>
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
                            onChange={ handleImageChange } multiple />
                    </Row>

                    <Row className='mx-auto my-3'><Button type='submit'>新增</Button></Row>
                </Form>
            </Card.Body>

            { filesDataURL && (
                <Carousel>{ showImages() }</Carousel>
            )}
        </Card>
    </div>
    );
};

export default AddProduct;
