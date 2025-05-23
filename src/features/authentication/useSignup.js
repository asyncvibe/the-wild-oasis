import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signUp, isPending } = useMutation({
		mutationFn: signupApi,
		onSuccess: (user) => {
			console.log(user);
			toast.success(
				"Account Created Successfully.  Please verify the email address"
			);
		},
	});

	return { signUp, isPending };
}
