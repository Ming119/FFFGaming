import { useEffect, useState } from 'react';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { ButtonGroup, Button, Card, Col, Row } from 'react-bootstrap';
import { Link, Form, useParams, useLoaderData, useActionData } from 'react-router-dom';

export const ManageUserDetails = () => {

    const { id } = useParams();
    const user = useLoaderData();
    const actionData = useActionData();

    const [ email, setEmail ] = useState(user.email || '');
    const [ name, setName ] = useState(user.displayName || '');
    const [ phoneNumber, setPhoneNumber ] = useState(user.phoneNumber || '');
    const [ address, setAddress ] = useState(user.address || '');

    const [ buttonText, setButtonText ] = useState('編輯');
    const [ buttonVariant, setButtonVariant ] = useState('primary');

    const handleButtonClick = async () => {
        const db = getFirestore();
        await setDoc(doc(db, "users", id), {
            isDisable: !user.isDisable,
        }, { merge: true });
    };
    
    const onEditButtonClick = (e) => {
        if (buttonText === '編輯') {
            e.preventDefault();
            setButtonText('儲存');
            setButtonVariant('success');
            document.getElementById('email').disabled = false;
            document.getElementById('name').disabled = false;
            document.getElementById('phoneNumber').disabled = false;
            document.getElementById('address').disabled = false;
        }
    };

    useEffect(() => {
        if (actionData && actionData.variant === 'success') {
            setButtonText('編輯');
            setButtonVariant('primary');
            document.getElementById('email').disabled = true;
            document.getElementById('name').disabled = true;
            document.getElementById('phoneNumber').disabled = true;
            document.getElementById('address').disabled = true;
        }
    }, [actionData])
    
    return (
    <div className="manage-user-details">
        <Row className="my-3">
            <Col xs={ 2 }>
                <Button as={ Link } to=".." variant="outline-primary" size="sm" className='my-3'>
                    <CaretLeftFill />返回
                </Button>
            </Col>
            <Col xs={ 8 }>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center fs-2 fw-bold">會員資料</Card.Title>
                        <hr />
                        <Form method="POST">
                            <FloatingLabel type="text"label="會員編號" value={ id } disabled />
                            <input id="id" name="id" value={ id } type="hidden"></input>

                            <FloatingLabel type="email" id="email" name="email" label="電子郵件" value={ email }
                                onChange={ (e) => { setEmail(e.target.value) }} disabled />
                           
                            <Row>
                                <Col>
                                    <FloatingLabel type="text" id="name" name="name" label="姓名" value={ name }
                                        onChange={ (e) => { setName(e.target.value) }} disabled />
                                </Col>
                                <Col>
                                    <FloatingLabel type="tel" id="phoneNumber" name="phoneNumber" label="電話" value={ phoneNumber }
                                        onChange={ (e) => { setPhoneNumber(e.target.value) }} disabled />
                                </Col>
                            </Row>

                            <FloatingLabel type="text" id="address" name="address" label="地址" value={ address }
                                onChange={ (e) => { setAddress(e.target.value) }} disabled />

                            <ButtonGroup className='w-100'>
                                <Button type="submit" variant={ buttonVariant } onClick={ onEditButtonClick }>{ buttonText }</Button>
                                { user.isDisable ?
                                    <Button type="button" variant="success" onClick={ handleButtonClick }>啟用</Button> :
                                    <Button type="button" variant="danger" onClick={ handleButtonClick }>停用</Button> }
                            </ButtonGroup>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={ 2 } />
        </Row>
    </div>
    );
};

export default ManageUserDetails;
