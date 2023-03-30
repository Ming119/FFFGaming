import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { Form, Link, useLoaderData, useParams } from 'react-router-dom';
import { CaretLeftFill, PlusSquareDotted } from 'react-bootstrap-icons';
import { Row, Col, Card, ButtonGroup, Button, Image, OverlayTrigger, Popover, ListGroup } from 'react-bootstrap';
import ReactQuill from 'react-quill';

export const ManageProductDetails = () => {

    const { id } = useParams();
    const product = useLoaderData();

    const [ productName, setProductName ] = useState(product.name);
    const [ price, setPrice ] = useState(product.price);
    const [ countInStock, setCountInStock ] = useState(product.countInStock);
    const [ richText, setRichText ] = useState(product.richText);
    const [ isEnabled, setIsEnabled ] = useState(product.isEnabled);

    const [ coverImageDataURL, setCoverImageDataURL ] = useState(product.images[0]);
    const [ imagesDataURL, setImagesDataURL ] = useState(product.images.slice(1));
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

    const onButtonClick = async (e) => {
        const db = getFirestore();
        const docRef = doc(db, 'products', id);
        await setDoc(docRef, { isEnabled: !isEnabled }, {merge: true});
        setIsEnabled(!isEnabled);
    };

    return (
    <div className="manage-product-details">
        <Row className="my-3">
            <Col xs={ 2 }>
                <Button variant="outline-primary" size="sm" as={ Link } to=".." className='my-3'>
                    <CaretLeftFill />返回
                </Button>
            </Col>
            <Col xs={ 8 }>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center fs-1 fw-bold'>商品詳細</Card.Title>
                        <hr />
                        <Form method='POST'>
                            <input type="hidden" name="id" value={ id } />

                            <Row className='my-3'>
                                { coverImageDataURL && (
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

                            <Row className='my-3'>
                                <Col><FloatingLabel type="text" name="productName" id="productName" value={ productName }
                                    label="商品名稱" onChange={ (e) => setProductName(e.target.value) }/></Col>

                                <Col><FloatingLabel type="number" name="price" id="price" value={ price }
                                    label="價格" onChange={ (e) => setPrice(e.target.value) }/></Col>

                                <Col><FloatingLabel type="number" name="countInStock" id="countInStock" value={ countInStock }
                                    label="庫存" onChange={ (e) => setCountInStock(e.target.value) }/></Col>
                            </Row>
                            
                            <ReactQuill 
                                theme="snow"
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                        ['link', 'image'],
                                        ['clean'],
                                    ],
                                }}
                                value={ richText }
                                onChange={ setRichText } />

                            {/* TODO */}
                            { attributes.map((attribute, index) => (
                                <Row className='my-3' key={ index }></Row>
                            )) }
                            <Row className='mx-auto my-3'>
                                <Button variant='primary'>新增屬性</Button>
                            </Row>

                            <Row className='mx-auto my-3'>
                                <ButtonGroup>
                                    <Button variant='warning' type='submit'>更新</Button>
                                    { isEnabled ?
                                        <Button variant='danger' onClick={ onButtonClick }>下架</Button>
                                        : <Button variant='success' onClick={ onButtonClick }>上架</Button>
                                    }
                                </ButtonGroup>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={ 2 } />
        </Row>
    </div>
    );
};

export default ManageProductDetails;
