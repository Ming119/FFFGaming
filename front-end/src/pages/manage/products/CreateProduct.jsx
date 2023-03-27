import { useEffect, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { PlusSquare, PlusSquareDotted } from 'react-bootstrap-icons';
import { Row, Col, Card, Button, Image, OverlayTrigger, Popover, ListGroup } from 'react-bootstrap';

export const CreateProduct = () => {

    const [ coverImageDataURL, setCoverImageDataURL ] = useState();
    const [ imagesDataURL, setImagesDataURL ] = useState([]);
    const [ attributes, setAttributes ] = useState([]);

    const handleImagechange = (setImage) => {
        const fileInput = document.createElement('input');

        fileInput.type = 'file';
        fileInput.name = 'image';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];

            if (!file.type.match(/image\/(png|jpg|jpeg)/i)) {
                alert('請上傳圖片檔案');
                return;
            }

            const fileDataURLReader = new FileReader();
            fileDataURLReader.onload = (e) => {
                setImage(e.target.result);
            };
            fileDataURLReader.readAsDataURL(file);
        }
        fileInput.click();
    };

    const onCoverImageClick = () => {
        handleImagechange(setCoverImageDataURL);
    };

    const onAddImageClick = () => {
        handleImagechange((imageDataURL) => {
            setImagesDataURL(prev => [...prev, imageDataURL]);
        })
    };

    const removeImage = (index) => {
        setImagesDataURL(prev => {
            const newImagesDataURL = [...prev];
            newImagesDataURL.splice(index, 1);
            return newImagesDataURL;
        });
    };

    useEffect(() => {
        sessionStorage.setItem('coverImage', coverImageDataURL);
        sessionStorage.setItem('images', JSON.stringify(imagesDataURL));
    }, [coverImageDataURL, imagesDataURL]);

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
                            <Row className='my-3'>
                                { coverImageDataURL ? (
                                    <Col xs={ 2 }>
                                        <OverlayTrigger trigger="click"
                                            overlay={
                                                <Popover>
                                                    <Popover.Body className='p-1'>
                                                        <ListGroup variant="flush">
                                                            <ListGroup.Item action
                                                                onClick={ onCoverImageClick }
                                                            >更換圖片</ListGroup.Item>
                                                        </ListGroup>
                                                    </Popover.Body>
                                                </Popover>
                                            }>
                                            <Image src={ coverImageDataURL } fluid rounded />
                                        </OverlayTrigger>
                                    </Col>
                                ) : (
                                    <Col xs={ 2 }>
                                        <PlusSquare size="100%" onClick={ onCoverImageClick }/>
                                    </Col>
                                ) }
                                
                                { imagesDataURL.map((imageDataURL, index) => (
                                    <Col xs={ 2 } key={ index }>
                                        <OverlayTrigger trigger="click"
                                            overlay={
                                                <Popover>
                                                    <Popover.Body className='p-1'>
                                                        <ListGroup variant="flush">
                                                            <ListGroup.Item action
                                                                onClick={ () => removeImage(index) }
                                                            >移除圖片</ListGroup.Item>
                                                        </ListGroup>
                                                    </Popover.Body>
                                                </Popover>
                                            }>
                                            <Image src={ imageDataURL } fluid rounded />
                                        </OverlayTrigger>
                                    </Col>
                                )) }
                                <Col xs={ 2 }>
                                    <PlusSquareDotted size="100%" onClick={ onAddImageClick }/>
                                </Col>
                            </Row>
                            
                            <FloatingLabel type="text" name="productName" id="productName" label="商品名稱" />

                            <Row className='my-3'>
                                <Col>
                                    <FloatingLabel type="number" name="price" id="price" label="價格" />
                                </Col>
                                <Col>
                                    <FloatingLabel type="number" name="countInStock" id="countInStock" label="庫存" />
                                </Col>
                            </Row>

                            <div className='form-floating my-3'>
                                <textarea className="form-control" type="text"
                                    name="description" id="description" placeholder="說明" />
                                <label className="form-label" htmlFor="description">說明</label>
                            </div>
                            
                            {/* TODO */}
                            { attributes.map((attribute, index) => (
                                <Row className='my-3' key={ index }></Row>
                            )) }
                            <Row className='mx-auto my-3'>
                                <Button variant='primary'>新增屬性</Button>
                            </Row>
                            
                            <Row className='mx-auto my-3'><Button variant='success' type='submit'>新增</Button></Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={ 2 } />
        </Row>
    </div>
    );
};

export default CreateProduct;
