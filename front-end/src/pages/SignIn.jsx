import { Form, Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, doc } from "firebase/firestore";

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
                lastLoginAt: user.metadata.lastSignInTime,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
            }).then(() => {
                console.log("Document successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });

            navigate('/');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    };

    return (
        <div className="sign-in">
        <Row>
        <Col />
        <Col xs={5}>
        <Card className="text-center my-5">
        <Card.Body>
            <Card.Title className='my-3'><b>登入</b></Card.Title>
            <Form method="POST" action="/signin">
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

                <Button className="my-3" type='submit'>登入</Button>
            </Form>

            <Card.Link as={Link} to="/signup">註冊</Card.Link>
            <Card.Link as={Link} to="/forgotpassword">忘記密碼</Card.Link>

            <hr />
            <Button variant="outline-link" size="lg"
                onClick={ handleSignInWithGoogle }><Google />
            </Button>
        </Card.Body>
        </Card>
        </Col>
        <Col />
        </Row>
        </div>
    );
}

export default SignIn;
