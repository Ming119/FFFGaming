import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CheckoutSuccess = () => {
	const navigate = useNavigate();

	return (
		<div className='checkout-success'>
		<h1>訂單已成立</h1>
		<Button variant="primary" onClick={_ => navigate("/")} >回首頁</Button>
		</div>
	);
};

export default CheckoutSuccess;
