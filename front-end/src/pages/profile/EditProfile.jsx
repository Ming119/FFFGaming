import { useState } from 'react';
import { Link, Form, useLoaderData } from 'react-router-dom'; 
import { ButtonGroup, Button, Card, Col, Row } from 'react-bootstrap';
import { FloatingLabel } from '../../components/FloatingLabel';

export const EditProfile = () => {

    const user = useLoaderData();
    const [ displayName, setDisplayName ] = useState(user.displayName);
    const [ phoneNumber, setPhoneNumber ] = useState(user.phoneNumber);
    const [ email, setEmail ] = useState(user.email);

    return (
    <div className="edit-profile"><Row className="my-5"><Col xs={3} />
        <Col xs={6}>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center fw-bold">會員中心</Card.Title>
                    <Form method="POST">
                        <FloatingLabel type="text" name="displayName" id="displayName"
                            label="使用者名稱" value={ displayName }
                            onChange={ (e) => setDisplayName(e.target.value) } />

                        <FloatingLabel type="email" name="email" id="email"
                            label="電子郵箱" value={ email }
                            onChange={ (e) => setEmail(e.target.value) } />

                        <FloatingLabel type="tel" name="phoneNumber" id="phoneNumber"
                            label="電話號碼" value={ phoneNumber }
                            onChange={ (e) => setPhoneNumber(e.target.value) } />
                        
                        <Row className='mx-auto'>
                            <ButtonGroup>
                                <Button variant="danger" as={ Link } to="..">取消</Button>
                                <Button variant="success" type='submit'>完成</Button>
                            </ButtonGroup>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    <Col xs={3} /></Row></div>
    );
};

export default EditProfile;