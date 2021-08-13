import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

const Like = ({like,handleLike}) => {
    
    if (!like) return (
        <AiOutlineHeart onClick={handleLike} size={'24px'}/>
        )
        else return (
        <i onClick={handleLike} className="fa fa-heart fa-lg"></i>
    )
}

export default Like
