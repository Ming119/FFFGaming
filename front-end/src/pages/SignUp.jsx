import { Form, Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";

export const SignUp = () => {

	return (
		<div className="sign-up">
			<Row>
				<Col />
				<Col xs={6}>
					<Card className="text-center my-5">
						<Card.Body>
							<Card.Title className='my-3'><b>註冊</b></Card.Title>
							<Form method="POST">
								<div className='form-floating my-3'>
									<input className="form-control"
										type="email"
										name="email"
										id="email"
										placeholder="Email" />
									<label htmlFor="email">電子郵件</label>
								</div>

								<div className='form-floating my-3'>
									<input className="form-control"
										type="password"
										name="password"
										id="password"
										placeholder="Password" />
									<label htmlFor="password">密碼</label>
								</div>

								<div className='form-floating my-3'>
									<input className="form-control"
										type="password"
										name="confirmPassword"
										id="confirmPassword"
										placeholder="Confirm Password" />
									<label htmlFor="confirmPassword">確認密碼</label>
								</div>
								
								<Button className="my-3" type='submit'>註冊</Button>
							</Form>

							<div className="text-muted">
								已有帳號？<Card.Link as={Link} to="/signin" className="link-secondary">登入</Card.Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col />
			</Row>
		</div>
	);
};

export default SignUp;
