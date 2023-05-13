import { useState } from 'react'

interface Props 
{
    front: string;
    back: string;
    handleClick: () => void;
    selected: boolean;
}

export default function CardListItem({front, back, handleClick, selected}: Props) {



  return (
    <li className={`${selected ? 'bg-gray-400': ''} `} onClick={handleClick}>Front of Card: {front} | Back of Card: {back} </li>
  )
}
