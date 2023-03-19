import { Form, Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { FloatingLabel } from '../components/FloatingLabel';

export const SignIn = () => {
    const navigate = useNavigate();

    const handleSignInWithGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            
            const db = getFirestore();
            setDoc(doc(db, "users", user.uid), {
                createdAt: user.metadata.createdAt,
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                lastLoginAt: user.metadata.lastLoginAt,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
            }, { merge: true }).catch((error) => {
                console.error("Error writing document: ", error);
            });

            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
    <div className="sign-in"><Row className='my-5'><Col xs={3} />
        <Col xs={6}>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title className='my-3 fw-bold'>登入</Card.Title>
                    <Form method="POST">
                        <FloatingLabel type="email" id="email" name="email" label="電子郵件" />
                        <FloatingLabel type="password" id="password" name="password" label="密碼" />
                        <Button className="my-3" type='submit'>登入</Button>
                    </Form>

                    <Card.Link as={Link} to="/signup" className="link-secondary">註冊</Card.Link>
                    <Card.Link as={Link} to="/forgetpassword" className="link-secondary">忘記密碼</Card.Link>

                    <hr />
                    
                    <Button variant="outline-link" size="lg"
                        onClick={ handleSignInWithGoogle }><Google />
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    <Col xs={3} /></Row></div>
    );
}

export default SignIn;
