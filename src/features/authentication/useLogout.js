import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: logout, isPending } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/login", { replace: true });
			toast.success("Successfully Logged Out");
		},
	});

	return { logout, isPending };
}
