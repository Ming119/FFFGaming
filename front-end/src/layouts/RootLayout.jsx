import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { auth, getUser } from '../firebase';

export const RootLayout = () => {
	const [ user, setUser ] = useState(auth.currentUser);

	useEffect(() => {
		getUser(auth, (user) => {
			setUser(user);
		});
	}, []);

	return (
		<div className="root-layout">
			<header>
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand>
							<NavLink to="/">{/* Logo */} LOGO</NavLink>
						</Navbar.Brand>
						{ user ? (
								<>Logout</>
							) : (
								<Nav>
									<NavLink to="/signIn">SignIn</NavLink>
									<NavLink to="/signUp">SignUp</NavLink>
								</Nav>
							)
						}
					</Container>
				</Navbar>
			</header>

			<main>
				<Container>
					<Outlet user={ user } />
				</Container>
			</main>
		</div>
	);
}

export default RootLayout;
