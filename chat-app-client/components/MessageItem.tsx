
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
	name:string;
	message:string;
	time:Date;
}
export const MessageItem: React.FC<IMessageProps> = (props: IMessageProps) => {
	return (
		<Flex mt={1} align="center">
			<Avatar size="sm" src="avatar-1.jpg" />
			<Flex flexDir="column" ml={4} display={"flex"}>
				<span style={{ display: "flex" }}>
					<Heading color="white" as="h3" size="sm">{props.name}</Heading>
					<Heading fontSize="11px" color="#9b9797" style={{ marginTop: "6px" }} ml={2} as="h3" size="xs">{props.time}</Heading>
				</span>

				<Text fontSize="14px" color="#DCDAD9">{props.message}</Text>
			</Flex>
		</Flex>


	)
}