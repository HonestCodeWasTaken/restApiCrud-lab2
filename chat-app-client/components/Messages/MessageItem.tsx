
import React, { useState } from 'react'
import {
	Flex,
	Text,
	IconButton,
	Divider,
	Avatar,
	Heading
} from '@chakra-ui/react'

interface IMessageProps {
	name:string | undefined;
	message:string;
	time:string;
	XDDD:string;
	checkbox:string;
}
export const MessageItem: React.FC<IMessageProps> = (props: IMessageProps) => {
	return (
		<Flex mt={1} align="center">
			<Avatar size="sm" src="avatar-1.jpg" />
			<Flex flexDir="column" ml={4} display={"flex"} >
				<span style={{ display: "flex" }}>
					<Heading color="white" as="h3" size="sm">{props.name}</Heading>
					<Heading fontSize="11px" color="#9b9797" style={{ marginTop: "6px" }} ml={2} as="h3" size="xs">{new Date(props.time).toUTCString()}</Heading>
				</span>

				<Text fontSize="14px" color="#DCDAD9">{props.message} {props.XDDD}</Text>
				<Text fontSize="14px" color="#DCDAD9">{props.XDDD}</Text>
				<Text fontSize="14px" color="#DCDAD9">{props.checkbox}</Text>
			</Flex>
		</Flex>


	)
}