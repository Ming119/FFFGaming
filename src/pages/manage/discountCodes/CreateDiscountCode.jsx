import { useEffect, useState } from 'react';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, Form, useActionData } from 'react-router-dom';
import { FloatingLabel } from '../../../components/FloatingLabel';

export const CreateDiscountCode = () => {

    const actionData = useActionData();

    const [ discountCode, setDiscountCode ] = useState('');
    const [ discountPersentage, setDiscountPersentage ] = useState('');
    const [ isActive, setIsActive ] = useState('true');

    useEffect(() => {
        if (actionData && actionData.variant === 'success') {
            setDiscountCode('');
            setDiscountPersentage('');
            setIsActive('');
        }

        if (actionData && actionData.variant === 'danger') {
            setDiscountPersentage('');
            setIsActive('');
        }
    }, [actionData])

    return (
    <div className='create-user'>
        <Row className="my-3">
            <Col xs={ 2 }>
                <Button as={ Link } to=".." variant="outline-primary" size="sm" className='my-3'>
                    <CaretLeftFill />返回
                </Button>
            </Col>
            <Col xs={ 8 }>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center fs-1 fw-bold">新增折扣碼</Card.Title>
                        <hr />
                        <Form method="POST">
                            <Row>
                                <Col>
                                    <FloatingLabel type="text" id="discountCode" name="discountCode" label="折扣碼" value={ discountCode }
                                        onChange={ (e) => { setDiscountCode(e.target.value) }} />
                                </Col>
                                <Col>
                                    <FloatingLabel type="text" id="discountPersentage" name="discountPersentage" label="折扣比例" value={ discountPersentage }
                                        onChange={ (e) => { setDiscountPersentage(e.target.value) }} />
                                </Col>
                                <Col className="d-none">
                                    <FloatingLabel type="text" id="isActive" name="isActive" label="是否啟用" value={ isActive }
                                        onChange={ (e) => { setIsActive(e.target.value) }} />
                                </Col>
                            </Row>
                            
                            <Row className='mx-auto my-3'><Button type='submit'>新增</Button></Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={ 2 } />
        </Row>
    </div>
    );
};

export default CreateDiscountCode;
