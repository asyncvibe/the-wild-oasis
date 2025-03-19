import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin as addCabinApi } from "../../services/apiCabins";
export function useCreateCabin() {
	const queryClient = useQueryClient();
	// Add Cabin
	const { isPending: isAdding, mutate: addCabin } = useMutation({
		mutationFn: (cabin) => addCabinApi(cabin),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Cabin Created Successfully");
			// reset();
		},
		onError: (error) => {
			toast.error("Failed to Create the Cabin");
			console.error(error.message);
		},
	});
	return { isAdding, addCabin };
}
