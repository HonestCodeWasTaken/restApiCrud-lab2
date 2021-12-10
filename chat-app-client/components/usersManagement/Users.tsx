import React, { useEffect, useState } from 'react'
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Tfoot,
  useDisclosure,
  Button
} from '@chakra-ui/react'
import { IUser } from '../../interfaces/IUser'
import { IJob } from '../../interfaces/IJob'
import UsersSVC from '../../pages/api/UsersSVC'

interface IUserProps {
  formBackground: string;
  users: Array<IUser>;
  currentUsername: string | undefined;
  restApi: string;
  updateUsers: () => void;
}
export const Users: React.FC<IUserProps> = (props: IUserProps) => {
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { restApi, users, currentUsername, formBackground, updateUsers } = props
  const givePermissionsToUser = async () => {
    if (selectedUser !== undefined) {
      await UsersSVC.putUser(selectedUser, restApi)
    }
    location.reload()
    onClose()
  }
  let urlParams = new URLSearchParams(window.location.search)
  const whoIsSendingID: any = urlParams.get('ID')
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center">
      <Flex
        justifyContent="center" alignItems="center" width={"110vh"}>
        <Flex direction="column" w="inherit" background={props.formBackground} p={3} rounded={6}>
          <Heading mb={6}>
            {"Users"}
          </Heading>
          <Divider></Divider>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>created_at</Th>
                <Th>updated_at</Th>
                <Th>email</Th>
                <Th>username</Th>
                <Th>role</Th>
                <Th>certifiedToPost</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.id}</Td>
                    <Td>{new Date(item.created_at).toUTCString()}</Td>
                    <Td>{new Date(item.updated_at).toUTCString()}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.username}</Td>
                    <Td>{item.role}</Td>
                    <Td>{item.certifiedToPost}</Td>
                    <Td><Button disabled={currentUsername === item.username ? true : false} onClick={() => {
                      onOpen()
                      setSelectedUser(item)
                    }}>Permission to post</Button></Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you really want to let this user post ads?</ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={givePermissionsToUser} mr={3}>
              Yes
            </Button>
            <Button onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>

  )
}