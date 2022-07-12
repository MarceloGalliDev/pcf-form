import { FormEvent, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { CopySvg } from "../../assets/CopySvg";
import './styles.scss';


type RoomParams = {
  id: string;
}

export function RoomCode() {
  const params = useParams<RoomParams>();
  const roomId = JSON.stringify(params.id);

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(roomId)
    alert('copied')
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <CopySvg />
      </div>
      <span>{params.id}</span>
    </button>
  )
}