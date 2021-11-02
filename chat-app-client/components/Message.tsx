
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
import NavItem from '../components/NavItem'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
}