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
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
// products pages
import Products from "./pages/products/Products";
import ProductDetails from "./pages/products/ProductDetails";
import ManageProducts from "./pages/manage/products/ManageProducts";
import AddProduct from "./pages/manage/products/AddProduct";
// users pages
import ManageUsers from "./pages/manage/users/ManageUsers";
import ManageUserDetails from "./pages/manage/users/ManageUserDetails";
// orders pages
import ManageOrders from "./pages/manage/ManageOrders";

// Loaders
import productsLoader from "./loaders/productsLoader";
import productDetailsLoader from "./loaders/productDetailsLoader";
import usersLoader from "./loaders/usersLoader";
import userDetailsLoader from "./loaders/userDetailsLoader";

// Actions
import signInAction from "./actions/signInAction";
import signUpAction from "./actions/signUpAction";
import addProductAction from "./actions/addProductAction";

// Errors
import ProductDetailsError from "./errors/ProductDetailsError";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="cart" element={<Cart />} />
			<Route path="signin"
				element={<SignIn />}
				action={ signInAction }
			/>
			<Route path="signup"
				element={<SignUp />}
				action={ signUpAction }
			/>
			<Route path="profile"
				element={<Profile />}
				loader={ userDetailsLoader } />

			<Route path="products">
				<Route index
					element={<Products />}
					loader={ productsLoader }
				/>

				<Route
					path=":id"
					element={<ProductDetails />}
					errorElement={ <ProductDetailsError /> }
					loader={ productDetailsLoader }
				/>
			</Route>

			<Route path="manage">
				<Route path="products">	
					<Route index
						element={<ManageProducts />}
						loader={ productsLoader }
					/>
					<Route path="add" element={<AddProduct />} action={ addProductAction }/>
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

				<Route path="users">
					<Route index element={<ManageUsers />} loader={ usersLoader }/>
					<Route
						path=":id"
						element={<ManageUserDetails />}
						laaader={ userDetailsLoader }
					/>
				</Route>
			</Route>
			
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

export default router;
