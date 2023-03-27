import { useState, useEffect } from "react";
import { Link, Outlet, useActionData, useNavigate,} from "react-router-dom";
import { Alert, Button, Container, Nav, Navbar } from "react-bootstrap";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
import logo from "../assets/logo.png";
import { CartFill, PersonFill, BoxArrowInLeft, BoxArrowInRight, PersonFillAdd, PeopleFill } from "react-bootstrap-icons"

export const RootLayout = () => {
	const navigate = useNavigate ();
	const actionData = useActionData();
	const [ user, setUser ] = useState(null);
	const [ data, setData ] = useState(actionData);

	useEffect(() => {
		setData(actionData);
	}, [actionData]);

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

					if (!docSnap.data().emailVerified) {
						setData({
							message: '請先驗證電子郵件。',
							variant: 'warning',
							linkMessage: '點擊此處驗證電子郵件。',
							onLinkClick: () => {
								sendEmailVerification(auth.currentUser, {
									url: `http://localhost:3000/emailVerification?id=${auth.currentUser.uid}`,
								}).then(() => {
									setData({
										message: '已發送驗證電子郵件。',
										variant: 'success',
									});
								});
							}
						});
					}
				}
			});
		});
	}, []);

	const onSignOutButtonClick = (e) => {
		auth.signOut().then(() => navigate('/'));
	};

	return (
	<div className="root-layout">
		<Navbar bg="light" variant="light">
			<Container>
				<Navbar.Brand as={ Link } to="/" className="p-0"><img src={ logo } width="40" height="40" className="d-inline-block align-top" alt="logo" /></Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-nav" />
				<Navbar.Collapse id="navbar-nav">
					<Nav className="me-auto">
					<Nav.Link as={ Link } to="products">商品</Nav.Link>
					{ user && user.isAdmin && (
						<>
						<Nav.Link as={ Link } to="manage/products">商品管理</Nav.Link>
						<Nav.Link as={ Link } to="manage/orders">訂單管理</Nav.Link>
						<Nav.Link as={ Link } to="manage/users"><PeopleFill /> 會員管理</Nav.Link>
						<Nav.Link as={ Link } to="statistics">統計</Nav.Link>
						</>
					)}
					</Nav>
					<Nav>
						<Nav.Link as={ Link } to="cart"><CartFill /></Nav.Link>
						{ user ? (
							<>
							<Nav.Link as={ Link } to="profile"><PersonFill /></Nav.Link>
							<Nav.Link as={ Link } onClick={ onSignOutButtonClick }><BoxArrowInRight /> 登出</Nav.Link>
							</>
						) : (
							<>
							<Nav.Link as={ Link } to="signin"><BoxArrowInLeft /> 登入</Nav.Link>
							<Nav.Link as={ Link } to="signup"><PersonFillAdd /> 註冊</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>

		<Container>
			{ data && <Alert
					variant={ data.variant }
					onClose={ () => setData(false) }
					className="mt-3"
					dismissible>
					{ data.message }
					<Alert.Link as={ Button } variant="link" onClick={ data.onLinkClick }>{ data.linkMessage }</Alert.Link>
				</Alert> }
			<Outlet />
		</Container>
	</div>
	);
}

export default RootLayout;
