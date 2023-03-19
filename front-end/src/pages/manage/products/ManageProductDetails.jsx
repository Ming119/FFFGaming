import { useState, useEffect } from 'react';
import { Form, Link, useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Card, Row, Col } from 'react-bootstrap';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FloatingLabel } from '../../../components/FloatingLabel';

export const ManageProductDetails = () => {

    const { id } = useParams();
    const product = useLoaderData();
    const navagate = useNavigate();

    const [productName, setProductName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [countInStock, setCountInStock] = useState(product.countInStock);
    const [description, setDescription] = useState(product.description);
    const [isEnabled, setIsEnabled] = useState(product.isEnabled);
    const [imageDataURL, setImageDataURL] = useState(product.image);
    const [file, setFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file.type.match(/image\/(png|jpg|jpeg)/i)) {
            alert('請上傳圖片檔案');
            return;
        }
        setFile(file);
    };

    const handleButtonClick = async (e) => {
        setIsEnabled(!isEnabled);
        const db = getFirestore();
        const docRef = doc(db, 'products', id);
        await setDoc(docRef, { isEnabled: !isEnabled }, {merge: true});
        navagate('..');
    };

    useEffect(() => {
        let fileDataURLReader, isCancel = false;
        if (file) {
            fileDataURLReader = new FileReader();
  
            fileDataURLReader.onload = (e) => {
                if (!isCancel) {
                    setImageDataURL(e.target.result);
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
    <div className="manage-product-details">
        <Button variant="outline-primary" size="sm" as={ Link } to=".." className='my-3'>
            <CaretLeftFill />返回
        </Button>

        <Card>
            <Card.Body>
                <Form method='POST'>
                    <input type="hidden" name="id" value={ id } />
                    <Row className='my-3'>
                        <Col><FloatingLabel type="text" name="productName" id="productName" value={ productName }
                            label="商品名稱" onChange={ (e) => setProductName(e.target.value) }/></Col>

                        <Col><FloatingLabel type="number" name="price" id="price" value={ price }
                            label="價格" onChange={ (e) => setPrice(e.target.value) }/></Col>

                        <Col><FloatingLabel type="number" name="countInStock" id="countInStock" value={ countInStock }
                            label="庫存" onChange={ (e) => setCountInStock(e.target.value) }/></Col>
                    </Row>

                    <Row classname="my-3">
                        <FloatingLabel type="text" name="description" id="description" value={ description }
                            label="說明" onChange={ (e) => setDescription(e.target.value) }
                            textarea />
                    </Row>

                    <Row className="mx-auto my-3">
                        <label className="form-label" htmlFor='image'>圖片</label>
                        <input className="form-control" type="file" name="image" id="image"
                            onChange={ handleImageChange } />
                    </Row>

                    <Row className='mx-auto my-3'>
                        <ButtonGroup>
                            <Button variant='warning' type='submit'>更新</Button>
                            { product.isEnabled ?
                                <Button variant='danger' onClick={ handleButtonClick }>下架</Button>
                                : <Button variant='success' onClick={ handleButtonClick }>上架</Button>
                            }
                        </ButtonGroup>
                    </Row>
                </Form>
            </Card.Body>

            { imageDataURL ?
            <Card.Img src={ imageDataURL } /> : null }
        </Card>
    </div>
    );
};

export default ManageProductDetails;