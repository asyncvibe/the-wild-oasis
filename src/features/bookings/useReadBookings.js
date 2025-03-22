import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useReadBookings() {
	const [searchParams] = useSearchParams();
	// Filter
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", filterValue: filterValue };
	// Sort
	const sortOption = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortOption.split("-");
	const sortBy = { field, direction };
	const {
		isPending,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy],
		queryFn: () => getBookings(filter, sortBy),
	});
	return { isPending, bookings, error };
}
// in queryKey array, we can pass multiple values; now this array depeneds on filter whenever the value of filter changes the react query will refetch the data.
