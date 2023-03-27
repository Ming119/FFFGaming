import { useEffect, useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { ButtonGroup, Button, Card, Col, Row } from "react-bootstrap";
import { FloatingLabel } from "../components/FloatingLabel";

export const Profile = () => {

    const user = useLoaderData();
    const actionData = useActionData();
    
    const [ email, setEmail ] = useState(user.email || '');
    const [ name, setName ] = useState(user.displayName || '');
    const [ phoneNumber, setPhoneNumber ] = useState(user.phoneNumber || '');
    const [ address, setAddress ] = useState(user.address || '');

    const [ isEditState, setIsEditState ] = useState(false);

    const onEditButtonClick = (e) => {
        e.preventDefault();
        setIsEditState(true);
        document.getElementById('email').disabled = false;
        document.getElementById('name').disabled = false;
        document.getElementById('phoneNumber').disabled = false;
        document.getElementById('address').disabled = false;
    };

    useEffect(() => {
        if (actionData && actionData.variant === 'success') {
            setIsEditState(false);
            document.getElementById('email').disabled = true;
            document.getElementById('name').disabled = true;
            document.getElementById('phoneNumber').disabled = true;
            document.getElementById('address').disabled = true;
        }
    }, [actionData])

    return (
        <div className="manage-user-details">
        <Row className="my-3">
            <Col xs={ 2 } />
            <Col xs={ 8 }>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center fs-2 fw-bold">會員資料</Card.Title>
                        <hr />
                        <Form method="POST">
                            <input id="id" name="id" value={ user.id } type="hidden"></input>

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

                            <hr />
                            <ButtonGroup className='w-100'>
                                { isEditState ? <Button type="submit" variant="success">儲存</Button> : 
                                    <> <Button type="button" variant="primary" onClick={ onEditButtonClick }>修改</Button>
                                    <Button type="submit" variant="warning">修改密碼</Button> </>
                                }
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

export default Profile;
