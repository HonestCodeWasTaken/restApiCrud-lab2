
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
import { MessageSend } from '../Messages/MessageSend'

interface IJobProps {
  restApi: string
  formBackground: string;
  users: Array<IUser>;
  currentUsername: string;
}
export const Jobs: React.FC<IJobProps> = (props: IJobProps) => {
  const [jobs, setJobs] = useState<Array<IJob>>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { restApi, users, currentUsername, formBackground } = props
  const getJobs = async () => {
    let jobs: Array<IJob> = await UsersSVC.fetchUrl(`${restApi}/jobs`)
    let urlParams = new URLSearchParams(window.location.search)
    const whoIsSendingID: any = urlParams.get('ID')
    setJobs(jobs)
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
    </Flex>

  )
}