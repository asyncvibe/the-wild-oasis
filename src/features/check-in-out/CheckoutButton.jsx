import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
function CheckoutButton({ bookingId }) {
	const { checkout, isCheckingOut } = useCheckout();

	return (
		<Button
			$variation="primary"
			$type="small"
			$disabled={isCheckingOut}
			onClick={() => checkout({ bookingId })}>
			Check out
		</Button>
	);
}

export default CheckoutButton;
