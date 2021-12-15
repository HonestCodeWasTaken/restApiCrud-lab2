
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
  Input,
  Image,
  Spacer
} from '@chakra-ui/react'
import { useToasts } from "react-toast-notifications";

import { IUser } from '../../interfaces/IUser'
import { IJob } from '../../interfaces/IJob'
import UsersSVC from '../../pages/api/UsersSVC'
import { MessageSend } from '../Messages/MessageSend'
import { FiPlusCircle } from 'react-icons/fi'
import { rest } from 'lodash';

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
  const [filteredJobs, setFilteredJobs] = useState<Array<IJob>>([])
  const [title, SetTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("");
  const [howLongItLasts, setHowLongItLasts] = useState("");
  const [selectedJob, setSelectedJob] = useState<IJob>();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isAddOpen,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isDescriptionOpen,
    onOpen: onOpenDescriptionOpen,
    onClose: onCloseDescriptionOpen,
  } = useDisclosure();
  const { restApi, users, currentUsername, formBackground, currentUserId, currentUser } = props
  const { addToast } = useToasts();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => SetTitle(event.target.value)
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)
  const handleImageUrl = (event: React.ChangeEvent<HTMLInputElement>) => setImageUrl(event.target.value)
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => setType(event.target.value)
  const handleHowLongItLastsChange = (event: React.ChangeEvent<HTMLInputElement>) => setHowLongItLasts(event.target.value)

  const getJobs = async () => {
    let jobs: Array<IJob> = await UsersSVC.fetchUrl(`${restApi}/jobs`)
    let urlParams = new URLSearchParams(window.location.search)
    setFilteredJobs(jobs)
    setJobs(jobs)
  }
  const createNewTask = async () => {
    
    await UsersSVC.postJob(title, description, type, howLongItLasts, currentUserId, props.restApi, imageUrl);
    await getJobs();
    location.reload()
  }
  const incrementCounter = async (counter: number, item: IJob) => {
    const counterPlus = counter + 1;
    const { title, description, type, howLongItLasts, imageUrl, city, id } = item
    await UsersSVC.putJob(title, description, type, howLongItLasts, currentUserId, props.restApi, counterPlus, imageUrl, city, id);
    await getJobs();
  }
  const deleteTask = async () => {
    await UsersSVC.deleteJob(selectedJob?.id, restApi)
    await getJobs();
    location.reload()
  }
  const getUserByID = (creatorID: number) => {
    let name = users.find(x => x.id === creatorID)?.username
    return name
  }
  const sortByCity = (city: string) => {
    setFilteredJobs(jobs.filter(x => x.city === city))
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
          <span>
            <Button m={2} maxWidth={"200px"} onClick={() => sortByCity("Kaunas")}>Sort by Kaunas</Button>
            <Button m={2} maxWidth={"200px"} onClick={() => sortByCity("Vilnius")}>Sort by Vilnius</Button>
            <Button m={2} maxWidth={"200px"} onClick={() => setFilteredJobs(jobs)}>Show all</Button>
          </span>

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
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredJobs.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.title}</Td>
                    <Td>{<Button disabled={currentUsername === "Guest" ? true : false} onClick={() => {
                      setSelectedJob(item);
                      incrementCounter(item.counter !== undefined ? item.counter : 0, item)
                      onOpenDescriptionOpen()
                    }}>View more</Button>}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.howLongItLasts}</Td>
                    <Td>{getUserByID(item.creatorId)}</Td>
                    <Td><Button disabled={currentUsername === "Guest" ? true : false} onClick={onOpen}>Send message</Button></Td>
                    <Td><Button disabled={currentUser?.role !== "Admin" ? true : false} onClick={() => {
                      setSelectedJob(item);
                      onOpenDelete();
                    }}>Delete</Button></Td>
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
              <Input onChange={handleImageUrl} placeholder='Image url' />
              <Input onChange={handleTypeChange} placeholder='type' />
              <Input type={"date"} onChange={handleHowLongItLastsChange} placeholder='howLongItLasts' />
            </Stack>
          </ModalBody>


          <ModalFooter>
            <Button onClick={() => {
              createNewTask()
              addToast("Job created", {
                appearance: 'success',
                autoDismiss: true,
              })

            }}>Submit</Button>
            <Button ml={4} onClick={onCloseAdd}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



      <Modal closeOnOverlayClick={true} isOpen={isDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Do you really want to delete this job?
          </ModalBody>
          <ModalFooter>
            <Button bgColor={"red"} onClick={() => {
              deleteTask()
              addToast("Deleted a job", {
                appearance: 'success',
                autoDismiss: true,
              })
            }}>Delete</Button>
            <Button ml={4} onClick={onCloseDelete}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal closeOnOverlayClick={true} isOpen={isDescriptionOpen} onClose={onCloseDescriptionOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedJob?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image maxWidth={"300px"} maxHeight={"300px"} alt="image missing" src={selectedJob?.imageUrl} ></Image>
            {selectedJob?.description}
            <Divider mb={3}></Divider>
            <Text>{selectedJob?.counter === undefined ? 0 : selectedJob?.counter} people clicked on this ad</Text>
          </ModalBody>
          <ModalFooter>
            <Button ml={10} onClick={onCloseDescriptionOpen}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>

  )
}