import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { Form, Link, useLoaderData, useParams } from 'react-router-dom';
import { CaretLeftFill, PlusSquareDotted } from 'react-bootstrap-icons';
import { Card, CloseButton, ButtonGroup, Button, Col, Image, Row, OverlayTrigger, Popover, ListGroup,Accordion } from 'react-bootstrap';
import ReactQuill from 'react-quill';

import React, {Component} from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const Selection = [
    { label: "Color"},
    { label: "Size"},
    { label: "Value"}
];

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
    const [ attributes, setAttributes ] = useState(product.attributes);

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

    const onAddAttributeClick = () => {
        setAttributes(prev => [...prev, { name: '', options: ['', ''] }]);
    };

    const removeAttribute = (index) => {
        setAttributes(prev => {
            const newAttributes = [...prev];
            newAttributes.splice(index, 1);
            return newAttributes;
        });
    };

    const removeImage = (index) => {
        setImagesDataURL(prev => {
            const newImagesDataURL = [...prev];
            newImagesDataURL.splice(index, 1);
            return newImagesDataURL;
        });
    };

    const onAttributeNameChange = (index, value) => {
        setAttributes(prev => {
            const newAttributes = [...prev];
            newAttributes[index].name = value;
            return newAttributes;
        });
    };

    const onAttributeOptionChange = (index, valueIndex, value) => {
        setAttributes(prev => {
            const newAttributes = [...prev];
            newAttributes[index].values[valueIndex] = value;
            return newAttributes;
        });
    };

    const onAddOptionClick = (e, index) => {
        setAttributes(prev => {
            const newAttributes = [...prev];
            newAttributes[index].values.push('');
            return newAttributes;
        });
    };

    const onButtonClick = async (e) => {
        const db = getFirestore();
        const docRef = doc(db, 'products', id);
        await setDoc(docRef, { isEnabled: !isEnabled }, {merge: true});
        setIsEnabled(!isEnabled);
    };

    useEffect(() => {
        sessionStorage.setItem('coverImage', coverImageDataURL);
        sessionStorage.setItem('images', JSON.stringify(imagesDataURL));
    }, [coverImageDataURL, imagesDataURL]);

    useEffect(() => {
        sessionStorage.setItem('richText', richText);
    }, [richText]);

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

                            <Accordion className='my-3'>
                            { attributes.map((attribute, index) => (
                                <Accordion.Item eventKey={ index } key={ index }>
                                    <Accordion.Header><CloseButton onClick={ () => removeAttribute(index) }/> 屬性 #{ index + 1}</Accordion.Header>
                                    <Accordion.Body>
                                        屬性名稱<div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Select options={Selection} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
                                        <Row>
                                            <Col>
                                                <FloatingLabel type="text" name="attributeName" label="屬性名稱"
                                                    onChange={ (e) => onAttributeNameChange(index, e.target.value) } value={attribute.name}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            { attribute.values.map((option, optionIndex) => (
                                                <Col xs={12} lg={6} key={ optionIndex }>
                                                    <FloatingLabel type="text" name={ `attributeValues_${attributes[index].name}` } label="屬性值"
                                                        onChange={ (e) => onAttributeOptionChange(index, optionIndex, e.target.value) } value={option}/>
                                                </Col>
                                            )) }
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button type="button" onClick={ (e) => onAddOptionClick(e, index) }>增加選項</Button>
                                            </Col>
                                        </Row>

                                    </Accordion.Body>
                                </Accordion.Item>
                            )) }
                            </Accordion>
                            
                            <Row className='mx-auto my-3'>
                            <Button type="button" variant='primary' onClick={ onAddAttributeClick }>增加屬性</Button>
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
