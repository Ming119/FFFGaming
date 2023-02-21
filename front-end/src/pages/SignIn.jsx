import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const SignIn = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <Form onSubmit={ handleSubmit }>
            <Form.Group controlId="signInEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={ e => setUserName(e.target.value) }
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="signInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={ e => setPassword(e.target.value) }
                />
            </Form.Group>

            <Form.Group controlId="rememberCheck">
                <Form.Check
                    type="checkbox"
                    label="Remember me"
                    onChange={ e => setRememberMe(e.target.checked) }
                />
            </Form.Group>

            <Button variant="primary" type="submit">Sign In</Button>
        </Form>
    );
}

export default SignIn;
