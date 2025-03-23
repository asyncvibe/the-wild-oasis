import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: (id) => deleteBookingApi(id),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
			toast.success(` Booking deleted successfully`);
		},
		onError: (error) => {
			toast.error("Error Occured while deleting the Booking");
			console.error(error);
		},
	});
	return { isDeleting, deleteBooking };
}
