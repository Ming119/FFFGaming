import { useState, useEffect } from "react";
import {
	Link,
	Outlet,
	useActionData,
	useNavigate,
} from "react-router-dom";
import { Alert, Container, Nav, Navbar } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";


export const RootLayout = () => {
	const [ user, setUser ] = useState(null);
	const [ show, setShow ] = useState(false);
	const navigate = useNavigate ();
	const data = useActionData();
	
	useEffect(() => {
		return onAuthStateChanged(auth, user => {
			if (!user) {
				setUser(null);
				localStorage.removeItem('user');
				return null;
			}

			const db = getFirestore();
			getDoc(doc(db, 'users', user.uid)).then(docSnap => {
				if (docSnap.exists()) {
					setUser(docSnap.data());
					localStorage.setItem('user', JSON.stringify({
						...docSnap.data(),
						id: user.uid,
					}));
				}
			});
		});
	}, []);

	useEffect(() => {
		setShow(data && data.message && data.variant);
	}, [data]);

	const onSignOutButtonClick = (e) => {
		auth.signOut().then(() => navigate('/'));
	};

	return (
	<div className="root-layout">
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand as={ Link } to="/">LOGO</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-nav" />
				<Navbar.Collapse id="navbar-nav">
					<Nav className="me-auto">
					<Nav.Link as={ Link } to="products">商品</Nav.Link>
					{ user && user.isAdmin && (
						<>
						<Nav.Link as={ Link } to="manage/products">商品管理</Nav.Link>
						<Nav.Link as={ Link } to="manage/orders">訂單管理</Nav.Link>
						<Nav.Link as={ Link } to="manage/users">會員管理</Nav.Link>
						<Nav.Link as={ Link } to="statistics">統計</Nav.Link>
						</>
					)}
					</Nav>
					<Nav>
						<Nav.Link as={ Link } to="cart">Cart</Nav.Link>
						{ user ? (
							<>
							<Nav.Link as={ Link } to="profile">會員中心</Nav.Link>
							<Nav.Link as={ Link } onClick={ onSignOutButtonClick }>登出</Nav.Link>
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
			{ data && show && <Alert
					variant={ data.variant }
					onClose={ () => setShow(false) }
					className="mt-3"
					dismissible>
					{ data.message }
				</Alert> }
			<Outlet />
		</Container>
	</div>
	);
}

export default RootLayout;
