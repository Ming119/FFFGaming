import { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { CaretLeftFill } from 'react-bootstrap-icons';

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
      let fileDataURLReader, fileBytesReader, isCancel = false;
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
        if (fileBytesReader && fileBytesReader.readyState === 1) fileBytesReader.abort();
    }
    }, [file])
    

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

            <Card>
                <Card.Body>
                    <Form method='POST'>
                        <Row className='my-3'>
                            <Col><div className='form-floating'>
                                <input type="text" className="form-control" 
                                    name="productName" id="productName"
                                    placeholder='商品名稱' />
                                <label htmlFor="productName">商品名稱</label>
                            </div></Col>

                            <Col><div className='form-floating'>
                                <input type="text" className="form-control" 
                                    name="price" id="price"
                                    placeholder='價格' />
                                <label htmlFor="price">價格</label>
                            </div></Col>

                            <Col><div className='form-floating'>
                                <input type="text" className="form-control" 
                                    name="countInStock" id="countInStock"
                                    placeholder='庫存' />
                                <label htmlFor="countInStock">庫存</label>
                            </div></Col>
                        </Row>

                        <Row><div className='my-3'>
                            <label className="form-label" htmlFor="image">圖片</label>
                            <input type="file" className="form-control"
                                name="image" id="image" accept="image/*"
                                onChange={ handleImageChange } />
                        </div></Row>

                        <Row><div className='form-floating my-3'>
                            <textarea className="form-control"
                                name="description" id="description"
                                placeholder='說明' />
                            <label htmlFor="description">說明</label>
                        </div></Row>

                        <Button type='submit'>新增</Button>
                    </Form>
                </Card.Body>

                { fileDataURL ?
                <Card.Img src={ fileDataURL } /> : null }
            </Card>
        </div>
    );
};

export default AddProduct;
