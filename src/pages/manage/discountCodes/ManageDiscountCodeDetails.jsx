import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FloatingLabel } from '../../../components/FloatingLabel';
import { Link, Form, useParams, useLoaderData, useActionData } from 'react-router-dom';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { Card, ButtonGroup, Button, Col, Row } from 'react-bootstrap';

export const ManageDiscountCodeDetails = () => {

    const { id } = useParams();
    const _discountCode = useLoaderData();
    const actionData = useActionData();


    const [ discountCode, setDiscountCode ] = useState(_discountCode.discountCode);
    const [ discountPersentage, setDiscountPersentage ] = useState(_discountCode.discountPersentage);

    const [ buttonText, setButtonText ] = useState('編輯');
    const [ buttonVariant, setButtonVariant ] = useState('primary');

    const handleButtonClick = async () => {
        const db = getFirestore();
        await setDoc(doc(db, "discountCodes", id), {
            isActive: !_discountCode.isActive,
        }, { merge: true });
    };
    
    const onEditButtonClick = (e) => {
        if (buttonText === '編輯') {
            e.preventDefault();
            setButtonText('儲存');
            setButtonVariant('success');
            document.getElementById('discountPersentage').disabled = false;
        }
    };

    useEffect(() => {
        if (actionData && actionData.variant === 'success') {
            setButtonText('編輯');
            setButtonVariant('primary');
            document.getElementById('discountPersentage').disabled = true;
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
                        <Card.Title className="text-center fs-2 fw-bold">折扣碼資料</Card.Title>
                        <hr />
                        <Form method="POST">
                            <input id="id" name="id" value={ id } type="hidden"></input>

                            <FloatingLabel type="discountCode" id="discountCode" name="discountCode" label="折扣碼" value={ discountCode }
                                onChange={ (e) => { setDiscountCode(e.target.value) }} disabled />
                            
                            <FloatingLabel type="discountPersentage" id="discountPersentage" name="discountPersentage" label="折扣比例" value={ discountPersentage }
                                        onChange={ (e) => { setDiscountPersentage(e.target.value) }} />

                            <hr />
                            <ButtonGroup className='w-100'>
                                <Button type="submit" variant={ buttonVariant } onClick={ onEditButtonClick }>{ buttonText }</Button>
                                { _discountCode.isActive ?
                                    <Button type="button" variant="danger" onClick={ handleButtonClick }>停用</Button> :
                                    <Button type="button" variant="success" onClick={ handleButtonClick }>啟用</Button>}
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

export default ManageDiscountCodeDetails;
