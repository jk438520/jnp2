import React from "react";
import GifWrapper, { SquareContainer } from "./GifWrapper";
import { useSelector } from "react-redux";


export const GifDisplay = () => {
    const gifurl = useSelector(state => state.image.image);


    return <SquareContainer>
            <GifWrapper src={gifurl} alt=" "/>
        </SquareContainer>


}