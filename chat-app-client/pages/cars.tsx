
import React, { useState } from 'react'
import {
	Flex,
	Text,
	IconButton,
	Avatar,
	Heading,
    Image
} from '@chakra-ui/react'

interface IMessageProps {
	name:string | undefined;
	message:string;
	time:string;
	XDDD:string;
}
const Cars: React.FC<IMessageProps> = (props: IMessageProps) => {
	return (
    <Flex class="container">
        <Flex class="row">
            <Flex class="form-group col-lg-6 col-sm-4 col-xs-6">
                <Flex class="w3-container w3-teal">
                    <h1>Mano automobilis</h1>
                </Flex>
                <Image src="Image_car3.jpg" alt="Car" width="555px" height="400px"></Image>
                <Flex class="w3-container w3-yellow">
                    <b style={{color: "red"}}>Automobilis yra su ratukais, savarankiškai varomas transporto priemonė naudojama transportavimui.</b>
                </Flex>
                <Flex class="w3-container w3-red">
                    <p>Automobilio savininkas- XD </p>
                </Flex>
            </Flex>
            <Flex class="form-group col-lg-6 col-sm-4 col-xs-6">
                <Flex class="w3-container w3-teal">
                    <h1>Mano automobilis</h1>
                </Flex>
                <Image src="Image_car2.jpg" alt="Car" width="555px" height="400px"></Image>
                <Flex class="w3-container w3-yellow ">
                    <b style={{color: "red"}}>Automobilis yra su ratukais, savarankiškai varomas transporto priemonė naudojama transportavimui.</b>
                </Flex>
                <Flex class="w3-container w3-red ">
                    <p>Automobilio savininkas- XD </p>
                </Flex>
            </Flex>
            <Flex class="form-group col-lg-6 col-sm-4 col-xs-6 ">
                <Flex class="w3-container w3-teal ">
                    <h1>Mano automobilis</h1>
                </Flex>
                <Image src="Image_car1.jpg " alt="Car" width="555px " height="400px"></Image>
                <Flex class="w3-container w3-yellow ">
                    <b style={{color: "red"}}>Automobilis yra su ratukais, savarankiškai varomas transporto priemonė naudojama transportavimui.</b>
                </Flex>
                <Flex class="w3-container w3-red ">
                    <p>Automobilio savininkas- XD </p>
                </Flex>
            </Flex>
        </Flex>
    </Flex>


	)
    
}
export default Cars;