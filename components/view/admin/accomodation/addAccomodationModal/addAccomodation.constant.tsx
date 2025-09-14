import { FaTv } from "react-icons/fa";
import { LuWifi } from "react-icons/lu";
import { MdOutlineFastfood, MdOutlineKitchen } from "react-icons/md";
import { PiGarage, PiShower } from "react-icons/pi";

export const FACILITIES_LIST = [
	{key: "wifi", label: "Wifi", icon: <LuWifi />},
	{key: "parking", label: "Free Parking", icon: <PiGarage />},
	{key: "kitchen", label: "Kitchen", icon: <MdOutlineKitchen />},
	{key: "bathroom", label: "Bathroom", icon: <PiShower />},
	{key: "breakfast", label: "Breakfast", icon: <MdOutlineFastfood />},
	{key: "entertaiment", label: "Entertaiment", icon: <FaTv />},
]