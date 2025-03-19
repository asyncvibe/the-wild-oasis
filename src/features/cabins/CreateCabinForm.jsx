import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModel }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const { isUpdating, updateCabin } = useUpdateCabin();
	const { isAdding, addCabin } = useCreateCabin();
	const isEditSession = Boolean(editId);
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	function onSubmit(data) {
		if (!isEditSession) {
			addCabin(
				{ ...data, image: data.image[0] },
				{
					onSuccess: () => {
						reset();
						// calling function optionally. it does not give error when it is not defined.
						onCloseModel?.();
					},
				}
			);
		} else {
			editId &&
				updateCabin(
					{ ...data, id: editId },
					{
						onSuccess: () => {
							reset();
							onCloseModel?.();
						},
					}
				);
		}
	}
	function onError(errors) {
		console.log(errors);
	}
	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModel ? "model" : "regular"}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					{...register("name", { required: "This field is required" })}
					disabled={isAdding || isUpdating}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "This field is required",
						min: { value: 1, message: "Capacity should be at least 1" },
					})}
					disabled={isAdding || isUpdating}
				/>
			</FormRow>
			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					{...register("regularPrice", {
						required: "This field is required",
						min: { value: 50, message: "Price should be at least 50" },
					})}
					disabled={isAdding || isUpdating}
				/>
			</FormRow>
			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value < getValues("regularPrice") ||
							"Discount should be less than regular price",
					})}
					disabled={isAdding || isUpdating}
				/>
			</FormRow>
			<FormRow
				label="Description for website"
				error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description", { required: "This field is required" })}
					disabled={isAdding || isUpdating}
				/>
			</FormRow>
			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
					disabled={isAdding || isUpdating}
				/>
			</FormRow>
			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					$variation="danger"
					type="reset"
					$size="large"
					onClick={() => onCloseModel?.()}>
					Cancel
				</Button>
				<Button
					disabled={isAdding || isUpdating}
					$size="large"
					$variation="primary">
					{isEditSession ? "Update Cabin" : "Create New Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
