
import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiMessageCircle,
    FiMessageSquare,
    FiUser
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from '../components/NavItem'
import { INavBarProps } from '../interfaces/INavBarProps'

export const Sidebar: React.FC<INavBarProps> = (props: INavBarProps) => {
    const [active, setActive] = useState()
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="0"
            h="95vh"
            marginTop="0"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                aria-label="XD"
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem onClick={props.seeDashBoard} navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." active={props.view === "ViewDashboard"}  />
                <NavItem onClick={props.seeMessages} navSize={navSize} icon={FiMessageSquare} title="Messages" active={props.view === "ViewMessages"} description={undefined} />
                <NavItem onClick={() => props.universalViewSetter("ViewJobs")} navSize={navSize} icon={FiHome} title="Jobs" active={props.view === "ViewJobs"} description={undefined} />
                {props.isAdmin ? <NavItem onClick={() => props.universalViewSetter("ManageUsers")} navSize={navSize} icon={FiUser} title="Users" active={props.view === "ManageUsers"} description={undefined} /> : null}
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{props.currentUsername}</Heading>
                        <Heading  as="h4" size="xm">
                        <Link href={"/"} >
                        {"Log off"}</Link></Heading>
                    
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}