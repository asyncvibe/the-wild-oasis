import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";
export function useUpdateSettings() {
	const queryClient = useQueryClient();

	const { isPending: isUpdating, mutate: updateSettings } = useMutation({
		mutationFn: (data) => updateSettingApi(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["settings"],
			});
			toast.success("Settings Updated Successfully");
		},
		onError: (error) => {
			toast.error("Failed to Update the Settings");
			console.error(error.message);
		},
	});
	return { isUpdating, updateSettings };
}
