import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useReadSettings } from "../settings/useReadSettings";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const moveBack = useMoveBack();
	const { booking, isPending } = useBooking();
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { settings, isLoading: isSettingsLoading } = useReadSettings();
	const { checkin, isPending: isCheckinPending } = useCheckin();
	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
	if (isPending || isSettingsLoading) return <Spinner />;

	const {
		id: bookingId,
		Guests,
		totalPrice,
		numGuests,
		hasBreakfast,
		numNights,
	} = booking;
	const optionalBreakfast = settings.breakfastPrice * numNights * numGuests;

	function handleCheckin() {
		if (!confirmPaid) return;
		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfast,
					totalPrice: totalPrice + optionalBreakfast,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row $type="horizontal">
				<Heading $as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />
			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((add) => !add);
							setConfirmPaid(false);
						}}
						$id="confirm">
						Would you like to add breakfast for{" "}
						<b>{formatCurrency(optionalBreakfast)}</b>?
					</Checkbox>
				</Box>
			)}
			<Box>
				<Checkbox
					checked={confirmPaid}
					disabled={confirmPaid || isCheckinPending}
					onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
					$id="confirm">
					I confirm that <b>{Guests.fullName}</b> has paid the total amount of
					<b>
						{!addBreakfast
							? formatCurrency(totalPrice)
							: `${formatCurrency(totalPrice)} + ${formatCurrency(
									optionalBreakfast
							  )}`}
					</b>
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					$variation="primary"
					disabled={!confirmPaid || isCheckinPending}
					$size="large">
					Check in booking #{bookingId}
				</Button>
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
