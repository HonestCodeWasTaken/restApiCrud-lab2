
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
  Button,
  Icon,
  Stack,
  Input
} from '@chakra-ui/react'
import { useToasts } from "react-toast-notifications";

import { IUser } from '../../interfaces/IUser'
import { IJob } from '../../interfaces/IJob'
import UsersSVC from '../../pages/api/UsersSVC'
import { MessageSend } from '../Messages/MessageSend'
import { FiPlusCircle } from 'react-icons/fi'

interface IJobProps {
  restApi: string
  formBackground: string;
  users: Array<IUser>;
  currentUsername: string;
  currentUserId: number | undefined;
  currentUser: IUser | undefined
}
export const Jobs: React.FC<IJobProps> = (props: IJobProps) => {
  const [jobs, setJobs] = useState<Array<IJob>>([])
  const [title, SetTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [howLongItLasts, setHowLongItLasts] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isAddOpen,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const { restApi, users, currentUsername, formBackground, currentUserId, currentUser } = props
  const { addToast } = useToasts();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => SetTitle(event.target.value)
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => setType(event.target.value)
  const handleHowLongItLastsChange = (event: React.ChangeEvent<HTMLInputElement>) => setHowLongItLasts(event.target.value)

  const getJobs = async () => {
    let jobs: Array<IJob> = await UsersSVC.fetchUrl(`${restApi}/jobs`)
    let urlParams = new URLSearchParams(window.location.search)
    const whoIsSendingID: any = urlParams.get('ID')
    setJobs(jobs)
  }
  const createNewTask = async () => {
    await UsersSVC.postJob(title, description, type, howLongItLasts, currentUserId, props.restApi);
    await getJobs();
  }
  const getUserByID = (creatorID: number) => {
    let name = users.find(x => x.id === creatorID)?.username
    return name
  }
  useEffect(() => {
    getJobs();

  }, []);
  // const filterJobs = () => {
  // 	jobsState = jobsState.filter(x => x.jobName === selectedJob)
  // 	setJobs(jobsState)
  // }
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center">
      <Flex
        justifyContent="center" alignItems="center" width={"90vh"}>
        <Flex direction="column" w="inherit" background={props.formBackground} p={3} rounded={6}>
          <Heading mb={6}>
            {"Jobs"}
          </Heading>
          <Divider></Divider>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>title</Th>
                <Th>description</Th>
                <Th>type</Th>
                <Th>howLongItLasts</Th>
                <Th>creator</Th>
                <Th>Send message</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobs.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.title}</Td>
                    <Td>{item.description}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.howLongItLasts}</Td>
                    <Td>{getUserByID(item.creatorId)}</Td>
                    <Td><Button disabled={currentUsername === "Guest" ? true : false} onClick={onOpen}>Send message</Button></Td>
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
          <MessageSend formBackground={formBackground} users={users} restApi={restApi}> </MessageSend>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <IconButton
        colorScheme="teal"
        aria-label="Call Segun"
        size="sm"
        icon={<Icon as={FiPlusCircle} />}
        margin={4}
        onClick={onOpenAdd}
        disabled={currentUser?.certifiedToPost !== "yes"}
      />

      <Modal closeOnOverlayClick={true} isOpen={isAddOpen} onClose={onCloseAdd}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input onChange={handleTitleChange} placeholder='title' />
              <Input onChange={handleDescriptionChange} placeholder='description' />
              <Input onChange={handleTypeChange} placeholder='type' />
              <Input type={"date"} onChange={handleHowLongItLastsChange} placeholder='howLongItLasts' />
            </Stack>
          </ModalBody>


          <ModalFooter>
            <Button onClick={() => {
              createNewTask()
              addToast("Task created", {
                appearance: 'success',
                autoDismiss: true,
              })

            }}>Submit</Button>
            <Button ml={4} onClick={onCloseAdd}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>

  )
}