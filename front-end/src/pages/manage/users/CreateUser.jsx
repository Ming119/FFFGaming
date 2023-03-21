import { useEffect, useState } from 'react';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, Form, useActionData } from 'react-router-dom';
import { FloatingLabel } from '../../../components/FloatingLabel';

export const CreateUser = () => {

    const actionData = useActionData();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ name, setName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ address, setAddress ] = useState('');

    useEffect(() => {
        if (actionData && actionData.variant === 'success') {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setPhone('');
            setAddress('');
        }

        if (actionData && actionData.variant === 'danger') {
            setPassword('');
            setConfirmPassword('');
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
                        <Card.Title className="text-center fs-1 fw-bold my-3">新增會員</Card.Title>
                        <hr />
                        <Form method="POST">
                            <FloatingLabel type="email" id="email" name="email" label="電子郵件" value={ email }
                                onChange={ (e) => { setEmail(e.target.value) }} />
                            
                            <Row>
                                <Col>
                                    <FloatingLabel type="password" id="password" name="password" label="密碼" value={ password }
                                        onChange={ (e) => { setPassword(e.target.value) }} />
                                </Col>
                                <Col>
                                    <FloatingLabel type="password" id="confirmPassword" name="confirmPassword" label="確認密碼" value={ confirmPassword }
                                        onChange={ (e) => { setConfirmPassword(e.target.value) }} />
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col>
                                    <FloatingLabel type="text" id="name" name="name" label="姓名" value={ name }
                                        onChange={ (e) => { setName(e.target.value) }} />
                                </Col>
                                <Col>
                                    <FloatingLabel type="tel" id="phone" name="phone" label="電話" value={ phone }
                                        onChange={ (e) => { setPhone(e.target.value) }} />
                                </Col>
                            </Row>

                            <FloatingLabel type="text" id="address" name="address" label="地址" value={ address }
                                onChange={ (e) => { setAddress(e.target.value) }} />
                            
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

export default CreateUser;
