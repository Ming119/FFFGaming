import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/contactUs/ContactUs";
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
import ManageOrders from "./pages/manage/orders/ManageOrders";
import ManageOrderDetails from "./pages/manage/orders/ManageOrderDetails";
// cart/checkout pages
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/cart/Checkout";
import CheckoutSuccess from "./pages/cart/CheckoutSuccess";

// Loaders
import cartLoader from "./loaders/cartLoader";
import usersLoader from "./loaders/usersLoader";
import ordersLoader from "./loaders/ordersLoader";
import productsLoader from "./loaders/productsLoader";
import userDetailsLoader from "./loaders/userDetailsLoader";
import orderDetailsLoader from "./loaders/orderDetailsLoader";
import productDetailsLoader from "./loaders/productDetailsLoader";
import productsManageLoader from "./loaders/productsManageLoader";

// Actions
import signInAction from "./actions/signInAction";
import signUpAction from "./actions/signUpAction";
import checkOutAction from "./actions/checkOutAction";
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
			<Route path="contactus"
				element={<ContactUs />} />
			<Route path="checkout"
				element={<Checkout />}
				action={ checkOutAction }/>
			<Route path="checkout/success"
				element={<CheckoutSuccess />} />


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
						loader={ productsManageLoader } />
					<Route path="create" element={<CreateProduct />} action={ createProductAction }/>
					<Route
						path=":id"
						element={<ManageProductDetails />}
						loader={ productDetailsLoader }
						action={ updateProductAction } />
				</Route>

				<Route path="orders" >
					<Route index
						element={<ManageOrders />}
						loader={ ordersLoader } />
					<Route
						path=":id"
						element={<ManageOrderDetails />}
						loader={ orderDetailsLoader }
					/>
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
