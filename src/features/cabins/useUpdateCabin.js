import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";

export function useUpdateCabin() {
	const queryClient = useQueryClient();
	const { isPending: isUpdating, mutate: updateCabin } = useMutation({
		mutationFn: (data) => updateCabinApi(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Cabin Updated Successfully");
		},
		onError: (error) => {
			toast.error("Failed to Update the Cabin");
			console.error(error.message);
		},
	});
	return { isUpdating, updateCabin };
}
