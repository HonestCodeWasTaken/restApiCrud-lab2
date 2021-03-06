
import React, { useEffect, useState } from 'react'
import {
	Flex,
	Text,
	IconButton,
	Divider,
	Avatar,
	Heading,
	Button,
	TableCaption,
	Table,
	Thead,
	Th,
	Tr,
	Tbody,
	Td,
	Tfoot
} from '@chakra-ui/react'
import { IMessage, IMessageItems } from '../../interfaces/IMessage'
import { MessageItem } from '../Messages/MessageItem'
import { IUser } from '../../interfaces/IUser'

interface IMessageProps {
	formBackground: string;
	messages: IMessage;
	users: Array<IUser>;
}
export const Message: React.FC<IMessageProps> = (props: IMessageProps) => {
	const [messagesNeeded, setMessagesNeeded] = useState<Array<IMessageItems>>(props.messages.messages)
	let urlParams = new URLSearchParams(window.location.search)
	const whoIsSendingID: any = urlParams.get('ID')
	const getMessagedNeeded = () => {
		let messagesParsed = props.messages.messages.filter(x => x.receiver_ID === parseInt(whoIsSendingID))
		setMessagesNeeded(messagesParsed)
	}
	// const filtermesage = () => {
	// 	messagesParsed = messagesParsed.filter(x => x.checkbox === "true")
	// 	setMessagesNeeded(messagesParsed)
	// }
	// const filtermesageFull = () => {
	// 	messagesParsed = props.messages.messages
	// 	setMessagesNeeded(messagesParsed)
	// }
	// const filterJobs = () => {
	// 	jobsState = jobsState.filter(x => x.jobName === selectedJob)
	// 	setJobs(jobsState)
	// }
	useEffect(() => {
		getMessagedNeeded();
	}, []);
	return (
		<Flex
			pos="absolute"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)"
			justifyContent="center" alignItems="center" width={"90vh"}>
			<Flex direction="column" w="inherit" background={props.formBackground} p={3} rounded={6}>
				<Heading mb={6}>
					{"Messages"}
				</Heading>
				<Divider></Divider>
				{/* <Button onClick={filtermesage}> filter messages</Button>
				<Button onClick={filtermesageFull}>dont filter messages</Button> */}
				{messagesNeeded.map((item, index) => {
					const { id, created_at, updated_at, message, whoSent_ID, receiver_ID, XDDD, checkbox } = item;
					return (
						<MessageItem checkbox={checkbox} XDDD={XDDD} key={id} message={message} time={created_at} name={props.users.find(x => x.id === whoSent_ID)?.username} ></MessageItem>
					)
				})}

			</Flex>
		</Flex>

	)
}