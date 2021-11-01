import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { ToastProvider, useToasts } from 'react-toast-notifications'
import useSWR from 'swr'
import { Spinner } from "@chakra-ui/react";
import Link from 'next/link'
import UsersSVC from "./api/users";

const Home: NextPage = () => {
   const restApi = "http://127.0.0.1:8000/api"
   const [register, setRegister] = useState(false);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);


   const { addToast } = useToasts();
   const { data, error } = useSWR('/api/data', UsersSVC.fetchUsers)
   const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
   const uploadUser = async () => {
      setLoading(true);
      await UsersSVC.uploadUser(username, email, restApi)
      setLoading(false);
      setRegister(false);
   }
   return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
         <Flex direction="column" background="gray.100" p={12} rounded={6}>
            <Heading mb={6}>
               {register ? "Register" : "Log in"}
            </Heading>
            <Input placeholder="username" variant="filled" mb={3} type="text" value={username} onChange={handleUsernameChange}></Input>
            <Input placeholder="example@example.com" variant="filled" mb={6} type="email" value={email} onChange={handleEmailChange}></Input>
            <span style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
               {register ? null : <Link href={"/chat"}>
                  <Button colorScheme="teal" mr={5} >Log in</Button>
               </Link>}
               {register ? null : <Button colorScheme="teal" ml={5} onClick={() => setRegister(true)}>Register</Button>}
               {register ? <Button colorScheme="teal" ml={5} onClick={() => {
                  uploadUser()
                  addToast("Account created!❤️\nFeel free to log in now!🔥", {
                     appearance: 'success',
                     autoDismiss: true,
                  })

               }}>Submit</Button> : null}
            </span>
            {loading && <Spinner />}
         </Flex>
      </Flex>
   );
};

export default Home;
