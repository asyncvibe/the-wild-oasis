import supabase from "./supabase";

export async function getSettings() {
	// const { data, error } = await supabase.from("settings").select("*").single();

	let { data, error } = await supabase.from("Settings").select("*").single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}
	return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
	const { data, error } = await supabase
		.from("Settings")
		.update(newSetting)
		.eq("id", 1)
		.select();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be updated");
	}
	return data;
}
