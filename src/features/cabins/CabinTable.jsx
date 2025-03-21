import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useReadCabin } from "./useReadCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
	const { isLoading, cabins } = useReadCabin();
	const [searchParams] = useSearchParams();
	if (isLoading) return <Spinner />;
	if (!cabins.length) return <Empty resource="cabin" />;
	// 1) Filter logic
	const filterValue = searchParams.get("discount") || "all";
	let filterCabins;
	if (filterValue === "all") filterCabins = cabins;
	if (filterValue === "no-discount")
		filterCabins = cabins.filter((cabin) => cabin.discount === 0);
	if (filterValue === "with-discount")
		filterCabins = cabins.filter((cabin) => cabin.discount > 0);
	// 2) Sorting Logic
	const sortBy = searchParams.get("sortBy") || "startDate-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedCabins = filterCabins.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);
	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header role="row">
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				{/* following is the render prop pattern */}
				<Table.Body
					// data={cabins}
					// data={filterCabins}
					data={sortedCabins}
					render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
