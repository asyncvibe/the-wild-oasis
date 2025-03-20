import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

/* the following code is with compound componnent usage */
function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button $variation="primary" $size="large">
						Add New Cabin
					</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}
/*
the following code is the conventional code without the compound component
function AddCabin() {
	const [isOpenModel, setIsOpenModel] = useState(false);
	return (
		<div>
			<Button
				onClick={() => setIsOpenModel((show) => !show)}
				$size="large"
				$variation="primary">
				Add new cabin
			</Button>
			{isOpenModel && (
				<Modal onClose={() => setIsOpenModel(false)}>
					<CreateCabinForm onCloseModel={() => setIsOpenModel(false)} />
				</Modal>
			)}
		</div>
	);
}
*/
export default AddCabin;
