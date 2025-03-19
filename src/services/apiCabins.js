import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("Cabins").select("*");
	if (error) {
		console.error(error);
		throw new Error("Cabins could not be fetched");
	}
	return data;
}
export async function deleteCabin(id) {
	const { data, error } = await supabase.from("Cabins").delete().eq("id", id);
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}
	return data;
}
export async function addCabin(cabin) {
	let imagePath = cabin?.image;
	let imageName = cabin?.image?.name;
	if (typeof cabin?.image === "object") {
		imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
		imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	}
	// 1. Insert the cabin into the database
	const { data, error } = await supabase
		.from("Cabins")
		.insert([{ ...cabin, image: imagePath }])
		.select()
		.single();
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}
	// 2. Upload the image to the storage
	if (typeof cabin?.image === "string") return data;
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, cabin.image);
	if (storageError) {
		// if the image upload fails, delete the cabin
		await supabase.from("Cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(
			"cabin image could not be uploaded and cabin was no created"
		);
	}

	return data;
}
export async function updateCabin(update) {
	const { id } = update;

	if (typeof update?.image === "object") {
		const imageName = `${Math.random()}-${update.image.name}`.replaceAll(
			"/",
			""
		);
		const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
		const { error: storageError } = await supabase.storage
			.from("cabin-images")
			.upload(imageName, update.image[0]);
		if (storageError) {
			console.error(storageError);
			throw new Error("Cabin image could not be uploaded");
		}
		const updates = { ...update, image: imagePath };
		const { data, error } = await supabase
			.from("Cabins")
			.update(updates)
			.eq("id", id)
			.select()
			.single();
		if (error) {
			console.error(error);
			throw new Error("Cabin could not be updated");
		}
		return data;
	} else {
		const { data, error } = await supabase
			.from("Cabins")
			.update(update)
			.eq("id", id)
			.select()
			.single();
		if (error) {
			console.error(error);
			throw new Error("Cabin could not be updated");
		}
		return data;
	}
}
