import { Form, Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FloatingLabel } from '../components/FloatingLabel';

export const SignUp = () => {

	return (
	<div className="sign-up"><Row className='my-5'><Col xs={3} />
		<Col xs={6}>
			<Card className="text-center">
				<Card.Body>
					<Card.Title className='my-3 fw-bold'>註冊</Card.Title>
					<Form method="POST">
						<FloatingLabel type="email" id="email" name="email" label="電子郵件" />
						<FloatingLabel type="password" id="password" name="password" label="密碼" />
						<FloatingLabel type="password" id="confirmPassword" name="confirmPassword" label="確認密碼" />								
						<Button className="my-3" type='submit'>註冊</Button>
					</Form>

					<div className="text-muted">
						已有帳號？<Card.Link as={Link} to="/signin" className="link-secondary">登入</Card.Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	<Col xs={3} /></Row></div>
	);
};

export default SignUp;
