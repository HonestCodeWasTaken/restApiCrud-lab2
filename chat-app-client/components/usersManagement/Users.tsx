
import React, { useState } from 'react'
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
import { IUser } from '../../interfaces/IUser'

interface IMessageProps {
	formBackground: string;
	users: Array<IUser>;
    currentUsername: string | undefined;

}
export const Users: React.FC<IMessageProps> = (props: IMessageProps) => {
	// const [messagesNeeded, setMessagesNeeded] = useState<Array<IMessageItems>>(props.messages.messages)
	let urlParams = new URLSearchParams(window.location.search)
	const whoIsSendingID: any = urlParams.get('ID')
	// let messagesParsed = props.messages.messages.filter(x => x.receiver_ID === parseInt(whoIsSendingID))

	// const filterJobs = () => {
	// 	jobsState = jobsState.filter(x => x.jobName === selectedJob)
	// 	setJobs(jobsState)
	// }
	return (
		<Flex></Flex>

	)
}