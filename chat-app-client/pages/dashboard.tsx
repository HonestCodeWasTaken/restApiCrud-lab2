import { Button } from "@chakra-ui/button";
import React, { useEffect, useState } from "react";
import { Sidebar } from '../components/Sidebar'
import { Flex, Text, IconButton, useColorModeValue, Heading, Input, Textarea } from '@chakra-ui/react'
import { FiMenu } from "react-icons/fi";
import { IUser } from "../interfaces/IUser";
import UsersSVC from "./api/UsersSVC";
import { useToasts } from "react-toast-notifications";
import MessagesSVC from "./api/MessagesSVC";
import {Message} from "../components/Message";
import {DashboardC} from "../components/DashboardC";

const Dashboard = () => {
	const restApi = "http://127.0.0.1:8000/api"

	const [view, setView] = useState("None");
	const [lazyProgrammer, setLazyProgrammer] = useState(false);
	const [whoIsSending, setWhoIsSending] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [letterCount, setLetterCount] = useState(0);
	const [users, setUsers] = useState<Array<IUser>>([])

	const formBackground = useColorModeValue("gray.100", "gray.700")

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
	const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => setWhoIsSending(event.target.value)
	const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(event.target.value)
		setLetterCount(event.target.value.length)
	}
	const { addToast } = useToasts();

	const getUsers = async () => {
		let users: Array<IUser> = await UsersSVC.fetchUrl(`${restApi}/users`)
		setUsers(users)
	}
	const sendMessageToUser = async () => {
		let urlParams = new URLSearchParams(window.location.search)
		let userToSend = users.find(x => x.email === email && x.username === username)
		if (userToSend === null || userToSend === undefined) {
			addToast("User doesn't exist :(", {
				appearance: 'error',
				autoDismiss: true,
			})
			return;
		}
		if (urlParams.get('ID') === null) {
			setLazyProgrammer(true);
			return;
		}
		const whoIsSendingID: any = urlParams.get('ID')
		MessagesSVC.sendMessage(message, parseInt(whoIsSendingID), userToSend?.id, restApi)
		addToast("Message sent!🔥", {
			appearance: 'success',
			autoDismiss: true,
		})
	}
	const setViewSendMessage = () => {
		setView("SendMessage")
	}
	const setViewDashboard = () => {
		setView("ViewDashboard")
	}
	const setViewMessages = () => {
		setView("ViewMessages")
	}

	useEffect(() => {
		getUsers();
	}, []);
	return (
		<div>
			<Sidebar seeMessageSend={setViewSendMessage} seeDashBoard={setViewDashboard} seeMessages={setViewMessages} view={view} />
			{view === "ViewDashboard" ? <DashboardC formBackground={formBackground}/> : null}
			{view === "SendMessage" ? <Flex
			 pos="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				justifyContent="center" alignItems="center"
			>
				<Flex direction="column" background={formBackground} p={6} rounded={6}>
					<Heading mb={12}>Send message</Heading>
					<span style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
						<Input placeholder="username" variant="outline" mr={5} mb={3} type="text" value={username} onChange={handleUsernameChange}></Input>
						<Input placeholder="example@example.com" variant="outline" ml={5} mb={3} type="email" value={email} onChange={handleEmailChange}></Input>
						{lazyProgrammer && <Input placeholder="ID of who's sending" variant="outline" ml={5} mb={3} value={email} onChange={handleIDChange}></Input>}
					</span>
					<Textarea
						placeholder="Send message"
						size="sm"
						resize={'vertical'}
						onChange={handleMessageChange}
						maxLength={255}
						isInvalid={letterCount === 255}
					/>
					<Button justifyContent="center" alignItems="center" colorScheme="teal" mt={5} onClick={() => sendMessageToUser()}>Submit</Button>
					<span style={{ display: "flex" }}>
						<Flex flex={"auto"} alignSelf="end">{letterCount} </Flex>
						{letterCount === 255 ? <Flex textColor={"red.300"} alignSelf="start">{" Too many characters"}</Flex> : null}
					</span>
				</Flex>
			</Flex> : null}
			<Message formBackground={formBackground}></Message>
		</div>
	);
};

export default Dashboard;
