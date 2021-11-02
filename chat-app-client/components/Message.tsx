
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
	formBackground: string;
}
export const Message: React.FC<IMessageProps> = (props: IMessageProps) => {
	return (
		<Flex
			pos="absolute"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)"
			justifyContent="center" alignItems="center" width={"90vh"}>
			<Flex direction="column" background={props.formBackground} p={3} rounded={6}>
				<Heading mb={6}>
					{"Messages"}
				</Heading>
				<Divider></Divider>

			</Flex>
		</Flex>

	)
}