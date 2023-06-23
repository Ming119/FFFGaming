import { Form, Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FloatingLabel } from '../components/FloatingLabel';

export const ForgetPassword = () => {
    return (
    <div className="forget-password"><Row className='my-5'><Col xs={3} />
        <Col xs={6}>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title className='my-3 fw-bold'>忘記密碼</Card.Title>
                    <Form method="POST">
                        <FloatingLabel type="email" id="email" name="email" label="電子郵件" />
                        <Button className="my-3" type='submit'>重置密碼</Button>
                    </Form>

                    <Card.Link as={Link} to="/signin" className="link-secondary">登入</Card.Link>
                    <Card.Link as={Link} to="/signup" className="link-secondary">註冊</Card.Link>                    
                </Card.Body>
            </Card>
        </Col>
    <Col xs={3} /></Row></div>
    );
};

export default ForgetPassword;