import { ref, onValue, off, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

type Desistentes = {
  idForm: string;
  A_Informacoes_Gerais_Desistentes: {
    questao01: string,
    questao02: string,
    questao03: string,
    questao04: string,
    questao05: string,
    questao06: string,
  },
  B_Caracteristicas_do_PCF: {
    questao07: string,
    questao08: string,
    questao09: string,
    questao10: string,
    questao11: string,
    questao12: string,
    questao13: string,
  },
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
    questao07: {
      questionTwo: string,
      questionThree: number,
      questionFour: number,
    },
    questao08: {
      questionOne: {
        a_recursoFinanceiroInsuficiente: boolean,
        b_naoHaInteresseMunicipio: boolean,
        c_possuiPrograma: boolean,
        d_criouPrograma: boolean,
      },
      questionSeven: string,
      questionEight: number,
      questionNine: number,
      questionTen: string,
      questionEleven: number,
      questionTwelve: number,
    },
    questao09: {
      questionFive: string,
      questionSix: string,
    },
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
              questao07: {
                questionTwo: value?.B_Desistentes?.questao07 || null,
                questionThree: value?.B_Desistentes?.questao07 || null,
                questionFour: value?.B_Desistentes?.questao07 || null,
              },
              questao08: {
                questionOne: {
                  a_recursoFinanceiroInsuficiente: value?.B_Desistentes?.questao08 || null,

                  b_naoHaInteresseMunicipio: value?.B_Desistentes?.questao08 || null,

                  c_possuiPrograma: value?.B_Desistentes?.questao08 || null,

                  d_criouPrograma: value?.B_Desistentes?.questao08 || null,
                },
                questionSeven: value?.B_Desistentes?.questao08 || null,
                questionEight: value?.B_Desistentes?.questao08 || null,
                questionNine: value?.B_Desistentes?.questao08 || null,
                questionTen: value?.B_Desistentes?.questao08 || null,
                questionEleven: value?.B_Desistentes?.questao08 || null,
                questionTwelve: value?.B_Desistentes?.questao08 || null,
              },
              questao09: {
                questionFive: value?.B_Desistentes?.questao09 || null,
                questionSix: value?.B_Desistentes?.questao09 || null,
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
