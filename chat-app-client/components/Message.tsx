
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
import { IMessage, IMessageItems } from '../interfaces/IMessage'
import { MessageItem } from './MessageItem'
import { IUser } from '../interfaces/IUser'

interface IMessageProps {
	formBackground: string;
	messages: IMessage;
	users: Array<IUser>;
}
export const Message: React.FC<IMessageProps> = (props: IMessageProps) => {
	const [messagesNeeded, setMessagesNeeded] = useState<Array<IMessageItems>>(props.messages.messages)
	let urlParams = new URLSearchParams(window.location.search)
	const whoIsSendingID: any = urlParams.get('ID')
	let messagesParsed = props.messages.messages.filter(x => x.receiver_ID === parseInt(whoIsSendingID))
	//setMessagesNeeded(messagesParsed)
	const filtermesage = () => {
		messagesParsed = messagesParsed.filter(x => x.checkbox === "true")
		setMessagesNeeded(messagesParsed)
	}
	const filtermesageFull = () => {
		messagesParsed = props.messages.messages
		setMessagesNeeded(messagesParsed)
	}

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
				<Button onClick={filtermesage}> filter messages</Button>
				<Button onClick={filtermesageFull}>dont filter messages</Button>
				<Table  variant="simple">

            <TableCaption>Lifts</TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>sukurta</Th>
                <Th>atnaujintas</Th>
                <Th>zinute</Th>
                <Th isNumeric>kas issiunte id</Th>
                <Th isNumeric>gavejo id</Th>
                <Th isNumeric>pasirininkimas naujienlaiskiui</Th>
              </Tr>
            </Thead>
            <Tbody>
			{messagesNeeded.map((item, index) => {
					const { id, created_at, updated_at, message, whoSent_ID, receiver_ID, XDDD, checkbox } = item;
                return (
                  <Tr key={id}>
                    <Td isNumeric>{created_at}</Td>
                    <Td>{updated_at}</Td>
                    <Td>{message.toUpperCase()}</Td>
                    <Td isNumeric>{whoSent_ID}</Td>
                    <Td isNumeric>{receiver_ID}</Td>
                    <Td isNumeric>{checkbox}</Td>
                  </Tr>
                )
              })
              }
            </Tbody>
          </Table>
				{/* {messagesNeeded.map((item, index) => {
					const { id, created_at, updated_at, message, whoSent_ID, receiver_ID, XDDD, checkbox } = item;
					return (
						<MessageItem checkbox={checkbox} XDDD={XDDD} key={id} message={message} time={created_at} name={props.users.find(x => x.id === whoSent_ID)?.username} ></MessageItem>
					)
				})} */}
				
			</Flex>
		</Flex>

	)
}