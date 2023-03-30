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
import ForgetPassword from "./pages/ForgetPassword";
import EmailVerification from "./pages/EmailVerification";

// products pages
import Products from "./pages/products/Products";
import ProductDetails from "./pages/products/ProductDetails";
import CreateProduct from "./pages/manage/products/CreateProduct";
import ManageProducts from "./pages/manage/products/ManageProducts";
import ManageProductDetails from "./pages/manage/products/ManageProductDetails";
// users pages
import CreateUser from "./pages/manage/users/CreateUser";
import ManageUsers from "./pages/manage/users/ManageUsers";
import ManageUserDetails from "./pages/manage/users/ManageUserDetails";
// orders pages
import ManageOrders from "./pages/manage/ManageOrders";

// Loaders
import cartLoader from "./loaders/cartLoader";
import usersLoader from "./loaders/usersLoader";
import productsLoader from "./loaders/productsLoader";
import userDetailsLoader from "./loaders/userDetailsLoader";
import productDetailsLoader from "./loaders/productDetailsLoader";

// Actions
import signInAction from "./actions/signInAction";
import signUpAction from "./actions/signUpAction";
import addToCartAction from "./actions/addToCartAction";
import createUserAction from "./actions/createUserAction";
import updateUserAction from "./actions/updateUserAction";
import createProductAction from "./actions/createProductAction";
import updateProductAction from "./actions/updateProductAction";
import resetPasswordAction from "./actions/resetPasswordAction";
import updateProfileAction from "./actions/updateProfileAction";

// Errors
import ProductDetailsError from "./errors/ProductDetailsError";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="cart"
				element={<Cart />}
				loader={ cartLoader } />
			<Route path="signin"
				element={<SignIn />}
				action={ signInAction } />
			<Route path="signup"
				element={<SignUp />}
				action={ signUpAction } />
			<Route path="emailverification" element={<EmailVerification />} />
			<Route path="forgetpassword"
				element={<ForgetPassword />}
				action={ resetPasswordAction } />
			<Route path="profile"
				element={<Profile />}
				loader={ userDetailsLoader }
				action={ updateProfileAction } />

			<Route path="products">
				<Route index
					element={<Products />}
					loader={ productsLoader } />
				<Route
					path=":id"
					element={<ProductDetails />}
					errorElement={ <ProductDetailsError /> }
					loader={ productDetailsLoader }
					action={ addToCartAction } />
			</Route>

			<Route path="manage">
				<Route path="products">	
					<Route index
						element={<ManageProducts />}
						loader={ productsLoader } />
					<Route path="create" element={<CreateProduct />} action={ createProductAction }/>
					<Route
						path=":id"
						element={<ManageProductDetails />}
						loader={ productDetailsLoader }
						action={ updateProductAction } />
				</Route>

				<Route
					path="orders"
					element={<ManageOrders />}
					// loader={ ManageOrdersLoader }
				>
					{/* <Route
						path=":id"
						element={<ManageOrderDetails />}
						loader={ ManageOrderDetailsLoader }
					/> */}
				</Route>

				<Route path="users">
					<Route index element={<ManageUsers />} loader={ usersLoader } />
					<Route path="create" element={<CreateUser />} action={ createUserAction } />
					<Route
						path=":id"
						element={<ManageUserDetails />}
						loader={ userDetailsLoader }
						action={ updateUserAction } />
				</Route>
			</Route>
			
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

export default router;
