import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';

export const CreateProduct = () => {

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
    
    const onPaperClick = (e) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = (e) => {
            handleImageChange(e);
        }
    };

    return (
    <div className="add-product">
        <Row className="my-3">
            <Col xs={ 2 }>
                <Button variant="outline-primary" size="sm" as={ Link } to=".." className='my-3'>
                    <CaretLeftFill />返回
                </Button>
            </Col>
            <Col xs={ 8 }>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center fs-1 fw-bold'>新增商品</Card.Title>
                        <hr />
                        <Form method='POST'>
                            <FloatingLabel type="text" name="productName" id="productName" label="商品名稱" />

                            <Row className='my-3'>
                                <Col>
                                    <FloatingLabel type="number" name="price" id="price" label="價格" />
                                </Col>
                                <Col>
                                    <FloatingLabel type="number" name="countInStock" id="countInStock" label="庫存" />
                                </Col>
                            </Row>

                            <FloatingLabel type="text" name="description" id="description" label="說明" textarea />

                            <Box sx={{
                                    display: 'flex',
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 128,
                                    height: 128,
                                    },
                                }} >
                                <Paper variant="outlined"></Paper>
                                <Paper elevation={ 1 } onClick={ onPaperClick }></Paper>
                            </Box>
                                {/* <label className="form-label" htmlFor="image">圖片</label>
                                <input type="file" className="form-control"
                                    name="image" id="image" accept="image/*"
                                    onChange={ handleImageChange } multiple /> */}
                            
                            <Row className='mx-auto my-3'><Button type='submit'>新增</Button></Row>
                        </Form>
                    </Card.Body>

                    { filesDataURL && (
                        <Carousel>{ showImages() }</Carousel>
                    )}
                </Card>
            </Col>
            <Col xs={ 2 } />
        </Row>
    </div>
    );
};

export default CreateProduct;
