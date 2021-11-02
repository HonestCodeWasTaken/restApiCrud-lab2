import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { ToastProvider, useToasts } from 'react-toast-notifications'
import useSWR from 'swr'
import { Spinner, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Link from 'next/link'
import UsersSVC from "./api/UsersSVC";
import { IUser } from "../interfaces/IUser";

const Home: NextPage = () => {
   const restApi = "http://127.0.0.1:8000/api"
   const [register, setRegister] = useState(false);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);
   const [userChecked, setUserChecked] = useState(false);

   const formBackground = useColorModeValue("gray.100", "gray.700")
   const {toggleColorMode} = useColorMode()

   const { addToast } = useToasts();
   const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)

   const uploadUser = async () => {
      setLoading(true);
      await UsersSVC.uploadUser(username, email, restApi)
      setLoading(false);
      setRegister(false);
   }
   const checkIfLoginExists = async () => {
      setLoading(true);
      let users: Array<IUser> = await UsersSVC.fetchUrl(`${restApi}/users`)
      const user: IUser | undefined = users.find(x => x.email === email && x.username === username)
      const exists: boolean = user !== null && user !== undefined 
      setTimeout(() => { console.log("World!"); }, 2000);
      setLoading(false);
      if (exists === false) {
         addToast("❌Account is missing, please create a new account", {
            appearance: 'error',
            autoDismiss: true,
         })
      }
      else {
         window.location.href = `/dashboard?ID=${user?.id}`
      }
   }
   return (
      <div>
         <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
               <Heading mb={6}>
                  {register ? "Register" : "Log in"}
               </Heading>
               <Input placeholder="username" variant="filled" mb={3} type="text" value={username} onChange={handleUsernameChange}></Input>
               <Input placeholder="example@example.com" variant="filled" mb={6} type="email" value={email} onChange={handleEmailChange}></Input>
               <span style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                  {register ? null :
                     <Button colorScheme="teal" mr={5} onClick={checkIfLoginExists} >Log in</Button>}
                  {register ? null : <Button colorScheme="teal" ml={5} onClick={() => setRegister(true)}>Register</Button>}
                  {register ? <Button colorScheme="teal" ml={5} onClick={() => {
                     uploadUser()
                     addToast("Account created!❤️\nFeel free to log in now!🔥", {
                        appearance: 'success',
                        autoDismiss: true,
                     })

                  }}>Submit</Button> : null}
               </span>
               <Button onClick={toggleColorMode} mt={6}>Dark mode</Button>
               {loading && <Spinner mt={3} alignItems="center" justifyContent="center" />}
            </Flex>
         </Flex>
      </div>
   );
};

export default Home;
