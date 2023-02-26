import { useState, useEffect } from "react";
import {
	Link,
	Outlet,
	useActionData,
	useNavigate,
} from "react-router-dom";
import { Alert, Container, Nav, Navbar } from "react-bootstrap";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const RootLayout = () => {
	const [ user, setUser ] = useState(null);
	const [ show, setShow ] = useState(false);
	const navigate = useNavigate ();
	const data = useActionData();
	
	useEffect(() => {
		const auth = getAuth();
		return onAuthStateChanged(auth, user => {
			if (!user) return setUser(null);

			const db = getFirestore();
			getDoc(doc(db, 'users', user.uid)).then(docSnap => {
				if (docSnap.exists()) setUser(docSnap.data());
			});
		});
	}, []);

	useEffect(() => {
		setShow(data && data.error);
	}, [data]);

	const onSignOutButtonClick = (e) => {
		const auth = getAuth();
		auth.signOut().then(() => {
			navigate('/');
		});
	};

	return (
		<div className="root-layout">
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand as={ Link } to="/">LOGO</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbar-nav" />
					<Navbar.Collapse id="navbar-nav">
						<Nav className="me-auto">
						{ user && user.isAdmin ? (
							<>
							<Nav.Link as={ Link } to="manage/products">Manage Products</Nav.Link>
							<Nav.Link as={ Link } to="manage/orders">Manage Orders</Nav.Link>
							<Nav.Link as={ Link } to="manage/users">Manage Users</Nav.Link>
							</>
						) : (
							<Nav.Link as={ Link } to="products">Products</Nav.Link>
						)}
						</Nav>
						<Nav>
							<Nav.Link as={ Link } to="cart">Cart</Nav.Link>
							{ user ? (
								<>
								<Nav.Link as={ Link } onClick={ onSignOutButtonClick }>Sign Out</Nav.Link>
								</>
							) : (
								<>
								<Nav.Link as={ Link } to="signin">登入</Nav.Link>
								<Nav.Link as={ Link } to="signup">註冊</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Container>
				{ show && <Alert
						variant={ data.variant }
						onClose={ () => setShow(false) }
						className="mt-3"
						dismissible>
						{ data.error }
					</Alert>}
				<Outlet />
			</Container>
		</div>
	);
}

export default RootLayout;
