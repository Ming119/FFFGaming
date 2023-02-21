import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { handleSignUpWithEmailPassword, create } from "../firebase";

export const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        handleSignUpWithEmailPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            create('users', user.uid, {
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                role: 'customer',
            })
            .then(() => {
                console.log('User created');
                navigate('/');
            })
        }).catch(() => {

        });
    };

    return (
        <div>
            <h1>SignUp</h1>
            <Form onSubmit={ handleSubmit }>
                <Form.Group controlId="signUpEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={ e => setEmail(e.target.value) }
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="signUpPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={ e => setPassword(e.target.value) }
                    />
                </Form.Group>

                <Form.Group controlId="signUpPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        onChange={ e => setPasswordConfirm(e.target.value) }
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Sign Up</Button>
            </Form>
        </div>
    );
};

export default SignUp;