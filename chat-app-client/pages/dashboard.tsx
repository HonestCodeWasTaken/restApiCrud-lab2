import { Button } from "@chakra-ui/button";
import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar'
import { Flex, Text, IconButton, useColorModeValue, Heading, Input, Textarea } from '@chakra-ui/react'
import { FiMenu } from "react-icons/fi";
import { IUser } from "../interfaces/IUser";
import UsersSVC from "./api/UsersSVC";
import { useToasts } from "react-toast-notifications";

const Dashboard = () => {
  const restApi = "http://127.0.0.1:8000/api"

  const [sendMessage, setSendMessage] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [viewMessage, setViewMessage] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [letterCount, setLetterCount] = useState(0);
  const [users, setUsers] = useState<Array<IUser>>([])

  const formBackground = useColorModeValue("gray.100", "gray.700")

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
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

  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <Sidebar />
      <Flex pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
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
           <Button colorScheme="teal" ml={5} onClick={() => {
                     uploadUser()
                     addToast("Account created!❤️\nFeel free to log in now!🔥", {
                        appearance: 'success',
                        autoDismiss: true,
                     })

                  }}>Submit</Button> : null}
          <span style={{ display: "flex" }}>
            <Flex flex={"auto"} alignSelf="end">{letterCount} </Flex>
            {letterCount === 255 ? <Flex textColor={"red.300"} alignSelf="start">{" Too many characters"}</Flex> : null}
            </span>
        </Flex>
      </Flex>
    </div>
  );
};

export default Dashboard;
