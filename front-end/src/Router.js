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
import ForgetPassword from "./pages/ForgetPassword";
import EmailVerification from "./pages/EmailVerification";
//Profile pages
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
// products pages
import Products from "./pages/products/Products";
import AddProduct from "./pages/manage/products/AddProduct";
import ProductDetails from "./pages/products/ProductDetails";
import ManageProducts from "./pages/manage/products/ManageProducts";
import ManageProductDetails from "./pages/manage/products/ManageProductDetails";
// users pages
import CreateUser from "./pages/manage/users/CreateUser";
import ManageUsers from "./pages/manage/users/ManageUsers";
import ManageUserDetails from "./pages/manage/users/ManageUserDetails";
// orders pages
import ManageOrders from "./pages/manage/ManageOrders";

// Loaders
import usersLoader from "./loaders/usersLoader";
import productsLoader from "./loaders/productsLoader";
import userDetailsLoader from "./loaders/userDetailsLoader";
import productDetailsLoader from "./loaders/productDetailsLoader";

// Actions
import signInAction from "./actions/signInAction";
import signUpAction from "./actions/signUpAction";
import createUserAction from "./actions/createUserAction";
import updateUserAction from "./actions/updateUserAction";
import addProductAction from "./actions/addProductAction";
import updateProductAction from "./actions/updateProductAction";
import resetPasswordAction from "./actions/resetPasswordAction";

// Errors
import ProductDetailsError from "./errors/ProductDetailsError";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path="cart" element={<Cart />} />
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
			<Route path="profile">
				<Route index
					element={<Profile />}
					loader={ userDetailsLoader } />
				<Route path="edit"
					element={<EditProfile />}
					loader={ userDetailsLoader } />
			</Route>

			<Route path="products">
				<Route index
					element={<Products />}
					loader={ productsLoader } />
				<Route
					path=":id"
					element={<ProductDetails />}
					errorElement={ <ProductDetailsError /> }
					loader={ productDetailsLoader } />
			</Route>

			<Route path="manage">
				<Route path="products">	
					<Route index
						element={<ManageProducts />}
						loader={ productsLoader } />
					<Route path="add" element={<AddProduct />} action={ addProductAction }/>
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
