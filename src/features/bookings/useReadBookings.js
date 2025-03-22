import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useReadBookings() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();
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
	// pagination
	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
	const {
		isPending,
		data: { count, data: bookings } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});
	// Pre-fetching
	const pageCount = Math.ceil(count / PAGE_SIZE);
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});
	return { isPending, bookings, count, error };
}
// in queryKey array, we can pass multiple values; now this array depeneds on filter whenever the value of filter changes the react query will refetch the data.
