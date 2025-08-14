import { Button } from "@heroui/button";
import {
	Dropdown,
	DropdownTrigger,
	DropdownItem,
	DropdownMenu,
} from "@heroui/dropdown";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
	onPressButtonDetails: () => void;
	onPressButtonDelete: () => void;
}

const DropDownActions = (props: PropTypes) => {
	const { onPressButtonDelete, onPressButtonDetails } = props;

	return (
		<Dropdown className="bg-white shadow-sm">
			<DropdownTrigger className="bg-transparent ">
				<Button isIconOnly size="sm" className="">
					<CiMenuKebab className="text-black" />
				</Button>
			</DropdownTrigger>

			<DropdownMenu className="text-black ">
				<DropdownItem key="details-event-button" onPress={onPressButtonDetails}>
					Details
				</DropdownItem>
				<DropdownItem key="delete-event-button" onPress={onPressButtonDelete}>
					<span className="text-danger">Delete</span>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default DropDownActions;
