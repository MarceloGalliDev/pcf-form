import { ref, onValue, off, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<string, {
  idForm: string;
  A_Informacoes_Gerais_Nao_Aderidos: {
    questao01: string,
    questao02: string,
    questao03: number,
    questao04: string,
    questao05: string,
    questao06: string,
  },
  B_Elegiveis_ao_PCF: {
    questao07: {
      questionOne: string,
      questionTwo: string,
      questionThree: number,
      questionFour: number,
    },
    questao08: {
      questionFive: {
        a_recursoFinanceiroInsuficiente: boolean,
        b_naoHaInteresseMunicipio: boolean,
        c_naoConhecePrograma: boolean,
      },
    },
    questao09: {
      questionSix: boolean,
      questionSeven: string,
    },
  },
}>;

export function useRoomA() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [question, setQuestion] = useState<any>([]);

  useEffect(() => {
    const getDatabase = () => {
      const roomRef = ref(database, `rooms/${roomId}/`);

      onValue(roomRef, (room) => {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions = databaseRoom.nao_aderidos ?? {};
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
          return {
            idForm: key,
            A_Informacoes_Gerais_Nao_Aderidos: {
              questao01: value?.A_Informacoes_Gerais_Nao_Aderidos?.questao01,
              questao02: value?.A_Informacoes_Gerais_Nao_Aderidos?.questao02,
              questao03: value?.A_Informacoes_Gerais_Nao_Aderidos?.questao03,
              questao04: value?.A_Informacoes_Gerais_Nao_Aderidos?.questao04,
              questao05: value?.A_Informacoes_Gerais_Nao_Aderidos?.questao05,
              questao06: value?.A_Informacoes_Gerais_Nao_Aderidos?.questao06,
            },
            B_Elegiveis_ao_PCF: {
              questao07: {
                questionOne: value?.B_Elegiveis_ao_PCF?.questao07 || null,

                questionTwo: value?.B_Elegiveis_ao_PCF?.questao07 || null,

                questionThree: value?.B_Elegiveis_ao_PCF?.questao07 || null,

                questionFour: value?.B_Elegiveis_ao_PCF?.questao07 || null,
              },
              questao08: {
                questionFive: {
                  a_recursoFinanceiroInsuficiente: value?.B_Elegiveis_ao_PCF?.questao08 || null,

                  b_naoHaInteresseMunicipio: value?.B_Elegiveis_ao_PCF?.questao08 || null,

                  c_naoConhecePrograma: value?.B_Elegiveis_ao_PCF?.questao08 || null,
                },
              },
              questao09: {
                questionSix: value?.B_Elegiveis_ao_PCF?.questao09 || null,
                questionSeven: value?.B_Elegiveis_ao_PCF?.questao09 || null,
              },
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
