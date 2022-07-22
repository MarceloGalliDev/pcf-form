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
    questao07a: { aQuestionOne: string },
    questao07b: { bQuestionTwo: string },
    questao07c: { cQuestionThree: number },
    questao07d: { dQuestionFour: number },
    questao08a: {
      aQuestionFive: {
        a_recursoFinanceiroInsuficiente: boolean,
        b_naoHaInteresseMunicipio: boolean,
        c_criouPrograma: boolean,
      },
    }
    questao08b: { bQuestionSix: string },
    questao08c: { cQuestionSeven: number },
    questao08d: { dQuestionEight: number },
    questao09a: { questionNine: boolean },
    questao09b: { questionTen: string },
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
                aQuestionOne: value?.B_Desistentes?.questao07a || null,
                bQuestionTwo: value?.B_Desistentes?.questao07b || null,
                cQuestionThree: value?.B_Desistentes?.questao07c || null,
                dQuestionFour: value?.B_Desistentes?.questao07d || null,
              },
              questao08a: {
                aQuestionFive: {
                  a_recursoFinanceiroInsuficiente: value?.B_Desistentes?.questao08a || null,

                  b_naoHaInteresseMunicipio: value?.B_Desistentes?.questao08a || null,

                  c_criouPrograma: value?.B_Desistentes?.questao08a || null,
                },
                bQuestionSix: value?.B_Desistentes?.questao08b || null,
                cQuestionSeven: value?.B_Desistentes?.questao08c || null,
                duestionEight: value?.B_Desistentes?.questao08d || null,
              },
              questao09: {
                aQuestionNine: value?.B_Desistentes?.questao09a || null,
                bQuestionTen: value?.B_Desistentes?.questao09b || null,
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
