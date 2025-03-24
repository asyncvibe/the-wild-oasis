import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isPending } = useBooking();
	const { isDeleting, deleteBooking } = useDeleteBooking();
	const moveBack = useMoveBack();
	const navigate = useNavigate();
	const { checkout, isCheckingOut } = useCheckout();

	if (isPending) return <Spinner />;
	const { status, id } = booking;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row $type="horizontal">
				<HeadingGroup>
					<Heading $as="h1">Booking {id}</Heading>
					<Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />
			<Modal>
				<ButtonGroup>
					{status === "unconfirmed" && (
						<Button
							onClick={() => navigate(`/checkin/${id}`)}
							$variation="primary"
							$size="large">
							Check in
						</Button>
					)}
					{status === "checked-in" && (
						<Button
							onClick={() => checkout({ bookingId: id })}
							$variation="primary"
							$size="large"
							disabled={isCheckingOut}>
							Check out
						</Button>
					)}
					<Modal.Open opens="delete">
						<Button $variation="danger" $size="large" disabled={isDeleting}>
							Delete
						</Button>
					</Modal.Open>

					<Button $variation="secondary" onClick={moveBack} $size="large">
						Back
					</Button>
				</ButtonGroup>
				<Modal.Window name="delete">
					<ConfirmDelete
						resourceName="booking"
						onConfirm={() => {
							deleteBooking(id, {
								onSettled: () => navigate(-1),
							});
						}}
					/>
				</Modal.Window>
			</Modal>
		</>
	);
}

export default BookingDetail;
/* onSuccess and onSettled are the optional parameters that we can pass on the client side in the case of success or the failure of the api call and then we can navigate back or perform any other action. following is its example: onConfirm={() => {
							deleteBooking(id, {
								onSettled: () => navigate(-1),
							});
						}}
*/
