import React, { useState } from 'react'
import {
	Flex,
	Text,
	IconButton,
	Divider,
	Avatar,
	Heading
} from '@chakra-ui/react'
import {
	FiMenu,
	FiHome,
	FiCalendar,
	FiUser,
	FiDollarSign,
	FiBriefcase,
	FiSettings,
	FiMessageCircle,
	FiMessageSquare
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
interface IDashboardProps {
	formBackground: string;

}
export const DashboardC: React.FC<IDashboardProps> = (props: IDashboardProps) => {
	const [navSize, changeNavSize] = useState("large")
	return (
		<Flex pos="absolute"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)" >

			This is the dashboard, go to the buttons in the navigation bar to select more stuff :D

		</Flex>
	)
}