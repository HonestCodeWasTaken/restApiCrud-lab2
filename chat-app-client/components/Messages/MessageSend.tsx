
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
  Tfoot,
  Input,
  Textarea
} from '@chakra-ui/react'
import { IMessage, IMessageItems } from '../../interfaces/IMessage'
import { MessageItem } from '../Messages/MessageItem'
import { IUser } from '../../interfaces/IUser'
import MessagesSVC from '../../pages/api/MessagesSVC'
import { useToasts } from 'react-toast-notifications'

interface IMessageProps {
  formBackground: string;
  users: Array<IUser>;
  restApi:string
}
export const MessageSend: React.FC<IMessageProps> = (props: IMessageProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [letterCount, setLetterCount] = useState(0);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
    setLetterCount(event.target.value.length)
  }

  const { formBackground, users, restApi } = props
  const { addToast } = useToasts();

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
      return;
    }
    const whoIsSendingID: any = urlParams.get('ID')
    MessagesSVC.sendMessage(message, parseInt(whoIsSendingID), userToSend?.id, restApi)
    addToast("Message sent!🔥", {
      appearance: 'success',
      autoDismiss: true,
    })
  }
  return (
    <Flex direction="column" background={formBackground} p={6} rounded={6}>
      <Heading mb={12}>Send message</Heading>
      <span style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Input placeholder="username" variant="outline" mr={5} mb={3} type="text" value={username} onChange={handleUsernameChange}></Input>
        <Input placeholder="example@example.com" variant="outline" ml={5} mb={3} type="email" value={email} onChange={handleEmailChange}></Input>
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

  )
}