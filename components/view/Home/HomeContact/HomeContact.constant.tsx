import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const CONTACT_LIST = [
	{
		label: "Office Location",
		value: "Jl Ketintang no 56, Surabaya, Indonesia",
		icon: <FaLocationDot size={25} />,
		key: "location"
	},
	{
		label: "Phone",
		value: "081234567890",
		icon: <FaPhoneAlt size={25} />,
		key: "phone"
	},
	{
		label: "Email",
		value: "support@fixinaja.com",
		icon: <MdEmail size={25} />,
		key: "email"
	},
];

const MESSAGE_LIST = [
	{
		image: "/images/general/muka.jpg",
		name: "Fiandra Lazuart Adi H. A.",
		job: "Tech Interest",
		description: "Terimakasih Telah berkunjung di project FixInAja Home & Service, Semoga kedepannya project ini menjadi lebih baik lagi.",
		key: "1"
	},
	{
		image: "/images/general/muka.jpg",
		name: "Fiandra Lazuart Adi H. A.",
		job: "Tech Interest",
		description: "FixInAja Home & Service adalah project kedua saya setelah FixInAja Ticket & Management, Berbekal ilmu sebelumnya saya akan berusaha mengembangkan nya lebih baik lagi.",
		key: "2"
	},
	{
		image: "/images/general/muka.jpg",
		name: "Fiandra Lazuart Adi H. A.",
		job: "Tech Interest",
		description: "Atas dukungannya terima kasih kepada orang orang yang senantiasa mendukung dan menikmati segala progres dari project ini.",
		key: "3"
	},
]

export { CONTACT_LIST, MESSAGE_LIST };
