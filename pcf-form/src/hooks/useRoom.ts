import { ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function useRoom() {
  const [question, setQuestion] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  
  const params = useParams<RoomParams>()
  const roomId = params.id
};