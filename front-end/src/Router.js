import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Products from "./pages/products/Products";
import ManageUsers from "./pages/manage/ManageUsers";
import ManageOrders from "./pages/manage/ManageOrders";
import ManageProducts from "./pages/manage/ManageProducts";
import ProductDetails from "./pages/products/ProductDetails";

// Loaders
import productsLoader from "./loaders/productsLoader";
import ProductDetailsLoader from "./loaders/productDetailsLoader";

// Actions
import signInAction from "./actions/signInAction";
import signUpAction from "./actions/signUpAction";

// Errors
import ProductDetailsError from "./errors/ProductDetailsError";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="cart" element={<Cart />} />
			<Route
				path="signin"
				element={<SignIn />}
				action={ signInAction }
			/>
			<Route
				path="signup"
				element={<SignUp />}
				action={ signUpAction }
			/>

			<Route path="products">
				<Route index
					element={<Products />}
					loader={ productsLoader }
				/>

				<Route
					path=":id"
					element={<ProductDetails />}
					errorElement={ <ProductDetailsError /> }
					loader={ ProductDetailsLoader }
				/>
			</Route>

			<Route path="manage">
				<Route
					path="products"
					element={<ManageProducts />}
					// loader={ ManageProductsLoader }
				>
					{/* <Route
						path=":id"
						element={<ManageProductDetails />}
						loader={ ManageProductDetailsLoader }
					/> */}
				</Route>
		
				<Route
					path="orders"
					element={<ManageOrders />}
					// loader={ ManageOrdersLoader }
				>
					{/* <Route
						path=":id"
						element={<ManageOrderDetails />}
						laaader={ ManageOrderDetailsLoader }
					/> */}
				</Route>

				<Route
					path="users"
					element={<ManageUsers />}
					// loader={ ManageUsersLoader }
				>
					{/* <Route
						path=":id"
						element={<ManageUserDetails />}
						laaader={ ManageUserDetailsLoader }
					/> */}
				</Route>
			</Route>
			
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

export default router;
