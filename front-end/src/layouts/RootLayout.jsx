import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

export const RootLayout = () => {
	const user = useContext(UserContext);

	return (
		<div className="root-layout">
			<header>
				<Navbar>
					<Container>
						<Navbar.Brand href="/">{/* Logo */}</Navbar.Brand>
						{ user ? (
								<></>
							) : (
								<></>
							)
						}
					</Container>
				</Navbar>
			</header>

			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
		</div>
	);
}

export default RootLayout;
