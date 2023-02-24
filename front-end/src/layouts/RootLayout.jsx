import { useState, useEffect } from "react";
import {
	Link,
	NavLink,
	Outlet,
	useActionData,
	redirect
} from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const RootLayout = () => {
	const [ user, setUser ] = useState(null);
	const data = useActionData();
	
	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, user => setUser(user));
		return () => unsubscribe();
	}, []);

	const onSignOutButtonClick = (e) => {
		const auth = getAuth();
		auth.signOut();
		return redirect('/');
	};

	return (
		<div className="root-layout">
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand as={ Link } to="/">LOGO</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbar-nav" />
					<Navbar.Collapse id="navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={ NavLink } to="/products">Products</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link as={ Link } to="/cart">Cart</Nav.Link>

							{ user ? (
								<>
								<Nav.Link as={ Link } onClick={ onSignOutButtonClick }>Sign Out</Nav.Link>
								</>
							) : (
								<>
								<Nav.Link as={ Link } to="/signin">Sign In</Nav.Link>
								<Nav.Link as={ Link } to="/signup">Sign Up</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Container>
				{ data && data.error && <p>{ data.error }</p> }
				<Outlet setUser={ setUser } />
			</Container>
		</div>
	);
}

export default RootLayout;
