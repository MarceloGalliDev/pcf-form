import { ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";


type RoomParams = {
  id: string;
}

type Question = {
  id: string;
  author: {
    name: string;
  }
  content: string;
}

type FirebaseQuestions = Record<string, { 
  author: {
    name: string;
  }
  content: string;
}>

export function useRoom() {
  const [question, setQuestion] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  
  const params = useParams<RoomParams>()
  const roomId = params.id

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`)

    //return onValue(roomRef, room => {
    onValue(roomRef, room => {
      const databaseRoom = room.val();
      
      const firebaseQuestions: FirebaseQuestions = databaseRoom.question ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
        }
      });
      setTitle(databaseRoom.title)
      setQuestion(parsedQuestions)
    });
    return () => {
      off(roomRef)
    }
  }, [roomId]);//carrega a página toda vez que é alterado o valor dessas propriedades.
  
  return { title, question }
}