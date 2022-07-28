import { ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<string, {
  idForm: string;
  A_Informacoes_Gerais_Desistentes: {
    questao01: string,
    questao02: string,
    questao03: number,
    questao04: string,
    questao05: string,
    questao06: string,
  },
  B_Desistentes: {
    questao07a: string ,
    questao07b: string,
    questao07c: number,
    questao07d: number,
    questao08a: {
      a_recursoFinanceiroInsuficiente: boolean,
      b_naoHaInteresseMunicipio: boolean,
      c_criouPrograma: boolean,
    },
    questao08b: string,
    questao08c: number,
    questao08d: number,
    questao09a: boolean,
    questao09b: string,
  },
}>;

export function useRoomB() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [question, setQuestion] = useState<any>([]);

  useEffect(() => {
    const getDatabase = () => {
      const roomRef = ref(database, `rooms/${roomId}/`);

      onValue(roomRef, (room) => {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions = databaseRoom.desistentes ?? {};
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
          return {
            idForm: key,
            A_Informacoes_Gerais_Desistentes: {
              questao01: value?.A_Informacoes_Gerais_Desistentes?.questao01,
              questao02: value?.A_Informacoes_Gerais_Desistentes?.questao02,
              questao03: value?.A_Informacoes_Gerais_Desistentes?.questao03,
              questao04: value?.A_Informacoes_Gerais_Desistentes?.questao04,
              questao05: value?.A_Informacoes_Gerais_Desistentes?.questao05,
              questao06: value?.A_Informacoes_Gerais_Desistentes?.questao06,
            },
            B_Desistentes: {
              questao07a: value?.B_Desistentes?.questao07a || null,
              questao07b: value?.B_Desistentes?.questao07b || null,
              questao07c: value?.B_Desistentes?.questao07c || null,
              questao07d: value?.B_Desistentes?.questao07d || null,
              questao08a: {
                a_recursoFinanceiroInsuficiente: value?.B_Desistentes?.questao08a?.a_recursoFinanceiroInsuficiente || null,
                b_naoHaInteresseMunicipio: value?.B_Desistentes?.questao08a?.b_naoHaInteresseMunicipio || null,
                c_criouPrograma: value?.B_Desistentes?.questao08a?.c_criouPrograma || null,
              },
              questao08b: value?.B_Desistentes?.questao08b || null,
              questao08c: value?.B_Desistentes?.questao08c || null,
              questao08d: value?.B_Desistentes?.questao08d || null,
              questao09a: value?.B_Desistentes?.questao09a || null,
              questao09b: value?.B_Desistentes?.questao09b || null,
            },
          };
        });
        setQuestion(parsedQuestions)
      });
      return () => {
        off(roomRef)
      }
    }
    getDatabase()
  }, [roomId]);
  return [question];
};
