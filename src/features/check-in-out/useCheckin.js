import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: checkin, isPending } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
				...breakfast,
			}),
		onSuccess: (data) => {
			toast.success(`Booking ${data.id} successfully checked in`);
			queryClient.invalidateQueries({ active: true });
			navigate("/");
		},
		onError: (error) => {
			toast.error("There was an error while checking in");
			console.error(error);
		},
	});

	return { isPending, checkin };
}
