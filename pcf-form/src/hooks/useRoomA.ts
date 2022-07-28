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
    questao07a: string,
    questao07b: string,
    questao07c: number,
    questao07d: number,
    questao08a: {
      a_recursoFinanceiroInsuficiente: boolean,
      b_naoHaInteresseMunicipio: boolean,
      c_naoConhecePrograma: boolean,
    },
    questao09a: boolean,
    questao09b: string,
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
              questao07a: value?.B_Elegiveis_ao_PCF?.questao07a || null,
              questao07b: value?.B_Elegiveis_ao_PCF?.questao07b || null,
              questao07c: value?.B_Elegiveis_ao_PCF?.questao07c || null,
              questao07d: value?.B_Elegiveis_ao_PCF?.questao07d || null,
              questao08a: {
                a_recursoFinanceiroInsuficiente: value?.B_Elegiveis_ao_PCF?.questao08a?.a_recursoFinanceiroInsuficiente || null,
                b_naoHaInteresseMunicipio: value?.B_Elegiveis_ao_PCF?.questao08a?.b_naoHaInteresseMunicipio || null,
                c_naoConhecePrograma: value?.B_Elegiveis_ao_PCF?.questao08a?.c_naoConhecePrograma || null,
              },
              questao09a: value?.B_Elegiveis_ao_PCF?.questao09a || null,
              questao09b: value?.B_Elegiveis_ao_PCF?.questao09b || null,
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
