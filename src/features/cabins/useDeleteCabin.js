import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useDeleteCabin() {
	const queryClient = useQueryClient();
	const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: (id) => deleteCabinApi(id),
		// the following line will update the cabins ASAP when a row is deleted
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Cabin deleted successfully");
		},
		onError: (error) => {
			toast.error("Failed to delete the cabin");
			console.error(error);
		},
	});
	return { isDeleting, deleteCabin };
}
