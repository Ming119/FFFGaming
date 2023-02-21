import {
	createBrowserRouter,
	createRoutesFromElements,
	Route
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

// Loaders
import productsLoader from "./loaders/productsLoader";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="signIn" element={<SignIn />} />
			<Route path="signUp" element={<SignUp />} />
			<Route path="products" element={<Products />} loader={productsLoader} />

			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

export default router;
