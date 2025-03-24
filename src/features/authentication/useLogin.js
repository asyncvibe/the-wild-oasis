import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
export function useLogin() {
	const navigate = useNavigate();
	const { mutate: login, isPending } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: () => {
			navigate("/dashboard", { replace: true });
		},
		onError: (error) => {
			toast.error(error.message);
			console.error(error);
		},
	});
	return { login, isPending };
}
