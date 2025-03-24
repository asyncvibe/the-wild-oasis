import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
	const queryClient = useQueryClient();
	const { mutate: updateUser, isPending } = useMutation({
		mutationFn: (data) => updateCurrentUser(data),
		onSuccess: () => {
			toast.success("User Account Updated Successfully");
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (error) => {
			toast.error(error.message);
			console.error(error);
		},
	});
	return { updateUser, isPending };
}
export default useUpdateUser;
