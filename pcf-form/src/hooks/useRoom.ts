import { ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

type Aderidos = {
  idForm: string;
  A_Informacoes_Gerais: {
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
  C_Gestao_do_PCF: {
    questao14: string,
    questao15: string,
    questao16?: string,
    questao17: string,
    questao18?: string,
    questao19: string,
    questao20: string,
    questao21?: {
      a_visitadoresEdital?: boolean,
      b_visitadoresEquipePropria?: boolean,
      c_visitadoresContratacaoDireta?: boolean,
      d_visitadoresContratacaoEstagio?: boolean,
      e_visitadoresNaoSeAplica?: boolean,
      f_visitadoresOutro?: boolean,
      g_visitadoresOutrosDescricao?: string,
    },
  },
  D_Supervisores_do_PCF: {
    questao22: string,
    questao23: string,
    questao24: {
      a_supervisoresHorasSemanais40: boolean,
      b_supervisoresHorasSemanais30: boolean,
      c_supervisoresHorasSemanais20: boolean,
      d_supervisoresHorasSemanaisOutros: boolean,
      e_supervisoresHorasSemanaisOutrosDescricao: string,
    },
    questao25: {
      a_supervisoresGraduacaoIncompleta: string,
      b_supervisoresGraduacaoCompleta: string,
      c_supervisoresEspecializacao: string,
      d_supervisoresMestrado: string,
      e_supervisoresDoutorado: string,
    },
    questao26: {
      a_supervisoresServidorEfetivo: string,
      b_supervisoresMediaRemuneracaoEfetivo: string,
    },
    questao27: {
      a_supervisoresCargoComissionado: string,
      b_supervisoresMediaRemuneracaoComissionado: string,
    },
    questao28: {
      a_supervisoresServidorTemporario: string,
      b_supervisoresMediaRemuneracaoTemporario: string,
    },
    questao29: {
      a_supervisoresBolsista: string,
      b_supervisoresMediaRemuneracaoBolsista: string,
    },
    questao30: {
      a_supervisoresProfissionalAutonomo: string,
      b_supervisoresMediaRemuneracaoProfissionalAutonomo: string,
    },
    questao31: {
      a_supervisoresOutrosCargos: string,
      b_supervisoresMediaRemuneracaoOutrosCargos: string,
    },
  },
  E_Visitadores_do_PCF: {
    questao32: string,
    questao33: string,
    questao34: {
      a_visitadoresHorasSemanais40: boolean,
      b_visitadoresHorasSemanais30: boolean,
      c_visitadoresHorasSemanais20: boolean,
      d_visitadoresHorasSemanaisOutros: boolean,
      e_visitadoresHorasSemanaisOutrosDescricao: string,
    },
    questao35: {
      a_visitadoresEnsinoMedio: string,
      b_visitadoresGraduacaoIncompleto: string,
      c_visitadoresGraduacaoCompleto: string,
      d_visitadoresEspecializacao: string,
      e_visitadoresMestrado: string,
      f_visitadoresDoutorado: string,
    },
    questao36: {
      a_visitadoresServidorEfetivo: string,
      b_visitadoresMediaRemuneracaoEfetivo: string,
    },
    questao37: {
      a_visitadoresCargoComissionado: string,
      b_visitadoresMediaRemuneracaoComissionado: string,
    },
    questao38: {
      a_visitadoresServidorTemporario: string,
      b_visitadoresMediaRemuneracaoTemporario: string,
    },
    questao39: {
      a_visitadoresBolsista: string,
      b_visitadoresMediaRemuneracaoBolsista: string,
    },
    questao40: {
      a_visitadoresEstagiarioNivelSuperior: string,
      b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior: string,
    },
    questao41: {
      a_visitadoresAutonomos: string,
      b_visitadoresMediaRemuneracaoAutonomos: string,
    },
    questao42: {
      a_visitadoresOutrosCargos: string,
      b_visitadoresMediaRemuneracaoOutrosCargos: string,
    },
  },
  F_Outros_Profissionais: {
    questao43: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
      d_inputThree: string;
    },
    questao44: string,
  },
  G_Publico_Atendido_PCF: {
    questao45: string,
    questao46: string,
    questao47: string,
    questao48: string,
  },
  H_Organizacoes_Parceiras: {
    questao49: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
      d_inputThree: string;
    },
    questao50: string,
  },
  I_Recursos_E_Custos: {
    questao51: {
      a_proximidadeDomicilioFamilia: boolean,
      b_proximidadeDomicilioVisitadores: boolean,
      c_caracteristicasCrianca: boolean,
      d_atribuicaoPorVaga: boolean,
      e_sorteio: boolean,
      f_outroDistribuicao: boolean,
      g_outroDistribuicaoText: string,
    },
    questao52: string,
  },
  J_Outros_Custos: {
    questao55: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
      d_inputThree: string;
      e_inputFour: string;
      f_inputFive: string;
      g_inputSix: string;
    },
    questao56: string,
    questao57: string,
    questao58: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
    },
    questao59: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
    },
    questao60: string,
  };
};

type FirebaseQuestions = Record<string, {
  idForm: string;
  A_Informacoes_Gerais: {
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
  C_Gestao_do_PCF: {
    questao14: string,
    questao15: string,
    questao16?: string,
    questao17: string,
    questao18?: string,
    questao19: string,
    questao20: string,
    questao21?: {
      a_visitadoresEdital?: boolean,
      b_visitadoresEquipePropria?: boolean,
      c_visitadoresContratacaoDireta?: boolean,
      d_visitadoresContratacaoEstagio?: boolean,
      e_visitadoresNaoSeAplica?: boolean,
      f_visitadoresOutro?: boolean,
      g_visitadoresOutrosDescricao?: string,
    },
  },
  D_Supervisores_do_PCF: {
    questao22: string,
    questao23: string,
    questao24: {
      a_supervisoresHorasSemanais40: boolean,
      b_supervisoresHorasSemanais30: boolean,
      c_supervisoresHorasSemanais20: boolean,
      d_supervisoresHorasSemanaisOutros: boolean,
      e_supervisoresHorasSemanaisOutrosDescricao: string,
    },
    questao25: {
      a_supervisoresGraduacaoIncompleta: string,
      b_supervisoresGraduacaoCompleta: string,
      c_supervisoresEspecializacao: string,
      d_supervisoresMestrado: string,
      e_supervisoresDoutorado: string,
    },
    questao26: {
      a_supervisoresServidorEfetivo: string,
      b_supervisoresMediaRemuneracaoEfetivo: string,
    },
    questao27: {
      a_supervisoresCargoComissionado: string,
      b_supervisoresMediaRemuneracaoComissionado: string,
    },
    questao28: {
      a_supervisoresServidorTemporario: string,
      b_supervisoresMediaRemuneracaoTemporario: string,
    },
    questao29: {
      a_supervisoresBolsista: string,
      b_supervisoresMediaRemuneracaoBolsista: string,
    },
    questao30: {
      a_supervisoresProfissionalAutonomo: string,
      b_supervisoresMediaRemuneracaoProfissionalAutonomo: string,
    },
    questao31: {
      a_supervisoresOutrosCargos: string,
      b_supervisoresMediaRemuneracaoOutrosCargos: string,
    },
  },
  E_Visitadores_do_PCF: {
    questao32: string,
    questao33: string,
    questao34: {
      a_visitadoresHorasSemanais40: boolean,
      b_visitadoresHorasSemanais30: boolean,
      c_visitadoresHorasSemanais20: boolean,
      d_visitadoresHorasSemanaisOutros: boolean,
      e_visitadoresHorasSemanaisOutrosDescricao: string,
    },
    questao35: {
      a_visitadoresEnsinoMedio: string,
      b_visitadoresGraduacaoIncompleto: string,
      c_visitadoresGraduacaoCompleto: string,
      d_visitadoresEspecializacao: string,
      e_visitadoresMestrado: string,
      f_visitadoresDoutorado: string,
    },
    questao36: {
      a_visitadoresServidorEfetivo: string,
      b_visitadoresMediaRemuneracaoEfetivo: string,
    },
    questao37: {
      a_visitadoresCargoComissionado: string,
      b_visitadoresMediaRemuneracaoComissionado: string,
    },
    questao38: {
      a_visitadoresServidorTemporario: string,
      b_visitadoresMediaRemuneracaoTemporario: string,
    },
    questao39: {
      a_visitadoresBolsista: string,
      b_visitadoresMediaRemuneracaoBolsista: string,
    },
    questao40: {
      a_visitadoresEstagiarioNivelSuperior: string,
      b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior: string,
    },
    questao41: {
      a_visitadoresAutonomos: string,
      b_visitadoresMediaRemuneracaoAutonomos: string,
    },
    questao42: {
      a_visitadoresOutrosCargos: string,
      b_visitadoresMediaRemuneracaoOutrosCargos: string,
    },
  },
  F_Outros_Profissionais: {
    questao43: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
      d_inputThree: string;
    },
    questao44: string,
  },
  G_Publico_Atendido_PCF: {
    questao45: string,
    questao46: string,
    questao47: string,
    questao48: string,
  },
  H_Organizacoes_Parceiras: {
    questao49: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
      d_inputThree: string;
    },
    questao50: string,
  },
  I_Recursos_E_Custos: {
    questao51: {
      a_proximidadeDomicilioFamilia: boolean,
      b_proximidadeDomicilioVisitadores: boolean,
      c_caracteristicasCrianca: boolean,
      d_atribuicaoPorVaga: boolean,
      e_sorteio: boolean,
      f_outroDistribuicao: boolean,
      g_outroDistribuicaoText: string,
    },
    questao52: string,
  },
  J_Outros_Custos: {
    questao53: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
      d_inputThree: string;
      e_inputFour: string;
      f_inputFive: string;
      g_inputSix: string;
    },
    questao54: string,
    questao55: string,
    questao56: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
    },
    questao57: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
    },
    questao58: string,
  };
}>;

export function useRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [question, setQuestion] = useState<any>([]);

  useEffect(() => {
    const getDatabase = () => {
      const roomRef = ref(database, `rooms/${roomId}/`);

      onValue(roomRef, (room) => {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions = databaseRoom.aderidos ?? {};
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
          return {
            idForm: key,
            A_Informacoes_Gerais: {
              questao01: value?.A_Informacoes_Gerais?.questao01,
              questao02: value?.A_Informacoes_Gerais?.questao02,
              questao03: value?.A_Informacoes_Gerais?.questao03,
              questao04: value?.A_Informacoes_Gerais?.questao04,
              questao05: value?.A_Informacoes_Gerais?.questao05,
              questao06: value?.A_Informacoes_Gerais?.questao06,
            },
            B_Caracteristicas_do_PCF: {
              questao07: value?.B_Caracteristicas_do_PCF?.questao07,
              questao08: value?.B_Caracteristicas_do_PCF?.questao08,
              questao09: value?.B_Caracteristicas_do_PCF?.questao09,
              questao10: value?.B_Caracteristicas_do_PCF?.questao10,
              questao11: value?.B_Caracteristicas_do_PCF?.questao11,
              questao12: value?.B_Caracteristicas_do_PCF?.questao12,
              questao13: value?.B_Caracteristicas_do_PCF?.questao13,
            },
            C_Gestao_do_PCF: {
              questao14: value?.C_Gestao_do_PCF?.questao14,
              questao15: value?.C_Gestao_do_PCF?.questao15,
              questao16: value?.C_Gestao_do_PCF?.questao16,
              questao17: value?.C_Gestao_do_PCF?.questao17,
              questao18: value?.C_Gestao_do_PCF?.questao18,
              questao19: value?.C_Gestao_do_PCF?.questao19,
              questao20: value?.C_Gestao_do_PCF?.questao20,
              questao21:
              {
                a_visitadoresEdital: value?.C_Gestao_do_PCF?.questao21?.a_visitadoresEdital,

                b_visitadoresEquipePropria: value?.C_Gestao_do_PCF?.questao21?.b_visitadoresEquipePropria,

                c_visitadoresContratacaoDireta: value?.C_Gestao_do_PCF?.questao21?.c_visitadoresContratacaoDireta,

                d_visitadoresContratacaoEstagio: value?.C_Gestao_do_PCF?.questao21?.d_visitadoresContratacaoEstagio,

                e_visitadoresNaoSeAplica: value?.C_Gestao_do_PCF?.questao21?.e_visitadoresNaoSeAplica,

                f_visitadoresOutro: value?.C_Gestao_do_PCF?.questao21?.f_visitadoresOutro,
                
                g_visitadoresOutrosDescricao: value?.C_Gestao_do_PCF?.questao21?.g_visitadoresOutrosDescricao,
              },
            },
            D_Supervisores_do_PCF: {
              questao22: value?.D_Supervisores_do_PCF?.questao22,
              questao23: value?.D_Supervisores_do_PCF?.questao23,
              questao24: {
                a_supervisoresHorasSemanais40: value?.D_Supervisores_do_PCF?.questao24?.a_supervisoresHorasSemanais40,
                b_supervisoresHorasSemanais30: value?.D_Supervisores_do_PCF?.questao24?.b_supervisoresHorasSemanais30,
                c_supervisoresHorasSemanais20: value?.D_Supervisores_do_PCF?.questao24?.c_supervisoresHorasSemanais20,
                d_supervisoresHorasSemanaisOutros: value?.D_Supervisores_do_PCF?.questao24?.d_supervisoresHorasSemanaisOutros,
                e_supervisoresHorasSemanaisOutrosDescricao: value?.D_Supervisores_do_PCF?.questao24?.e_supervisoresHorasSemanaisOutrosDescricao,
              },
              questao25: {
                a_supervisoresGraduacaoIncompleta: value?.D_Supervisores_do_PCF?.questao25?.a_supervisoresGraduacaoIncompleta,
                b_supervisoresGraduacaoCompleta: value?.D_Supervisores_do_PCF?.questao25?.b_supervisoresGraduacaoCompleta,
                c_supervisoresEspecializacao: value?.D_Supervisores_do_PCF?.questao25?.c_supervisoresEspecializacao,
                d_supervisoresMestrado: value?.D_Supervisores_do_PCF?.questao25?.d_supervisoresMestrado,
                e_supervisoresDoutorado: value?.D_Supervisores_do_PCF?.questao25?.e_supervisoresDoutorado,
              },
              questao26: {
                a_supervisoresServidorEfetivo: value?.D_Supervisores_do_PCF?.questao26?.a_supervisoresServidorEfetivo,
                b_supervisoresMediaRemuneracaoEfetivo: value?.D_Supervisores_do_PCF?.questao26?.b_supervisoresMediaRemuneracaoEfetivo,
              },
              questao27: {
                a_supervisoresCargoComissionado: value?.D_Supervisores_do_PCF?.questao27?.a_supervisoresCargoComissionado,
                b_supervisoresMediaRemuneracaoComissionado: value?.D_Supervisores_do_PCF?.questao27?.b_supervisoresMediaRemuneracaoComissionado,
              },
              questao28: {
                a_supervisoresServidorTemporario: value?.D_Supervisores_do_PCF?.questao28?.a_supervisoresServidorTemporario,
                b_supervisoresMediaRemuneracaoTemporario: value?.D_Supervisores_do_PCF?.questao28?.b_supervisoresMediaRemuneracaoTemporario,
              },
              questao29: {
                a_supervisoresBolsista: value?.D_Supervisores_do_PCF?.questao29?.a_supervisoresBolsista,
                b_supervisoresMediaRemuneracaoBolsista: value?.D_Supervisores_do_PCF?.questao29?.b_supervisoresMediaRemuneracaoBolsista,
              },
              questao30: {
                a_supervisoresProfissionalAutonomo: value?.D_Supervisores_do_PCF?.questao30?.a_supervisoresProfissionalAutonomo,
                b_supervisoresMediaRemuneracaoProfissionalAutonomo: value?.D_Supervisores_do_PCF?.questao30?.b_supervisoresMediaRemuneracaoProfissionalAutonomo,
              },
              questao31: {
                a_supervisoresOutrosCargos: value?.D_Supervisores_do_PCF?.questao31?.a_supervisoresOutrosCargos,
                b_supervisoresMediaRemuneracaoOutrosCargos: value?.D_Supervisores_do_PCF?.questao31?.b_supervisoresMediaRemuneracaoOutrosCargos,
              },
            },
            E_Visitadores_do_PCF: {
              questao32: value?.E_Visitadores_do_PCF?.questao32,
              questao33: value?.E_Visitadores_do_PCF?.questao33,
              questao34: {
                a_visitadoresHorasSemanais40: value?.E_Visitadores_do_PCF?.questao34?.a_visitadoresHorasSemanais40,
                b_visitadoresHorasSemanais30: value?.E_Visitadores_do_PCF?.questao34?.b_visitadoresHorasSemanais30,
                c_visitadoresHorasSemanais20: value?.E_Visitadores_do_PCF?.questao34?.c_visitadoresHorasSemanais20,
                d_visitadoresHorasSemanaisOutros: value?.E_Visitadores_do_PCF?.questao34?.d_visitadoresHorasSemanaisOutros,
                e_visitadoresHorasSemanaisOutrosDescricao: value?.E_Visitadores_do_PCF?.questao34?.e_visitadoresHorasSemanaisOutrosDescricao,
              },
              questao35: {
                a_visitadoresEnsinoMedio: value?.E_Visitadores_do_PCF?.questao35?.a_visitadoresEnsinoMedio,
                b_visitadoresGraduacaoIncompleto: value?.E_Visitadores_do_PCF?.questao35?.b_visitadoresGraduacaoIncompleto,
                c_visitadoresGraduacaoCompleto: value?.E_Visitadores_do_PCF?.questao35?.c_visitadoresGraduacaoCompleto,
                d_visitadoresEspecializacao: value?.E_Visitadores_do_PCF?.questao35?.d_visitadoresEspecializacao,
                e_visitadoresMestrado: value?.E_Visitadores_do_PCF?.questao35?.e_visitadoresMestrado,
                f_visitadoresDoutorado: value?.E_Visitadores_do_PCF?.questao35?.f_visitadoresDoutorado,
              },
              questao36: {
                a_visitadoresServidorEfetivo: value?.E_Visitadores_do_PCF?.questao36?.a_visitadoresServidorEfetivo,
                b_visitadoresMediaRemuneracaoEfetivo: value?.E_Visitadores_do_PCF?.questao36?.b_visitadoresMediaRemuneracaoEfetivo,
              },
              questao37: {
                a_visitadoresCargoComissionado: value?.E_Visitadores_do_PCF?.questao37?.a_visitadoresCargoComissionado,
                b_visitadoresMediaRemuneracaoComissionado: value?.E_Visitadores_do_PCF?.questao37?.b_visitadoresMediaRemuneracaoComissionado,
              },
              questao38: {
                a_visitadoresServidorTemporario: value?.E_Visitadores_do_PCF?.questao38?.a_visitadoresServidorTemporario,
                b_visitadoresMediaRemuneracaoTemporario: value?.E_Visitadores_do_PCF?.questao38?.b_visitadoresMediaRemuneracaoTemporario,
              },
              questao39: {
                a_visitadoresBolsista: value?.E_Visitadores_do_PCF?.questao39?.a_visitadoresBolsista,
                b_visitadoresMediaRemuneracaoBolsista: value?.E_Visitadores_do_PCF?.questao39?.b_visitadoresMediaRemuneracaoBolsista,
              },
              questao40: {
                a_visitadoresEstagiarioNivelSuperior: value?.E_Visitadores_do_PCF?.questao40?.a_visitadoresEstagiarioNivelSuperior,
                b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior: value?.E_Visitadores_do_PCF?.questao40?.b_visitadoresMediaRemuneracaoEstagiarioNivelSuperior,
              },
              questao41: {
                a_visitadoresAutonomos: value?.E_Visitadores_do_PCF?.questao41?.a_visitadoresAutonomos,
                b_visitadoresMediaRemuneracaoAutonomos: value?.E_Visitadores_do_PCF?.questao41?.b_visitadoresMediaRemuneracaoAutonomos,
              },
              questao42: {
                a_visitadoresOutrosCargos: value?.E_Visitadores_do_PCF?.questao42?.a_visitadoresOutrosCargos,
                b_visitadoresMediaRemuneracaoOutrosCargos: value?.E_Visitadores_do_PCF?.questao42?.b_visitadoresMediaRemuneracaoOutrosCargos,
              },
            },
            F_Outros_Profissionais: {
              questao43: {
                a_id: value?.F_Outros_Profissionais?.questao43?.a_id,
                b_inputOne: value?.F_Outros_Profissionais?.questao43?.b_inputOne,
                c_inputTwo: value?.F_Outros_Profissionais?.questao43?.c_inputTwo,
                d_inputThree: value?.F_Outros_Profissionais?.questao43?.d_inputThree,
              },
              questao44: value?.F_Outros_Profissionais?.questao44,
            },
            G_Publico_Atendido_PCF: {
              questao45: value?.G_Publico_Atendido_PCF?.questao45,
              questao46: value?.G_Publico_Atendido_PCF?.questao46,
              questao47: value?.G_Publico_Atendido_PCF?.questao47,
              questao48: value?.G_Publico_Atendido_PCF?.questao48,
            },
            H_Organizacoes_Parceiras: {
              questao49: {
                a_id: value?.H_Organizacoes_Parceiras?.questao49?.a_id,
                b_inputOne: value?.H_Organizacoes_Parceiras?.questao49?.b_inputOne,
                c_inputTwo: value?.H_Organizacoes_Parceiras?.questao49?.c_inputTwo,
                d_inputThree: value?.H_Organizacoes_Parceiras?.questao49?.d_inputThree,
              },
              questao50: value?.H_Organizacoes_Parceiras?.questao50,
            },
            I_Recursos_E_Custos: {
              questao51: {
                a_proximidadeDomicilioFamilia: value?.I_Recursos_E_Custos?.questao51?.a_proximidadeDomicilioFamilia,
                b_proximidadeDomicilioVisitadores: value?.I_Recursos_E_Custos?.questao51?.b_proximidadeDomicilioVisitadores,
                c_caracteristicasCrianca: value?.I_Recursos_E_Custos?.questao51?.c_caracteristicasCrianca,
                d_atribuicaoPorVaga: value?.I_Recursos_E_Custos?.questao51?.d_atribuicaoPorVaga,
                e_sorteio: value?.I_Recursos_E_Custos?.questao51?.e_sorteio,
                f_outroDistribuicao: value?.I_Recursos_E_Custos?.questao51?.f_outroDistribuicao,
                g_outroDistribuicaoText: value?.I_Recursos_E_Custos?.questao51?.g_outroDistribuicaoText,
              },
              questao52: value?.I_Recursos_E_Custos?.questao52,
            },
            J_Outros_Custos: {
              questao53: {
                a_id: value?.J_Outros_Custos?.questao53?.a_id,
                b_inputOne: value?.J_Outros_Custos?.questao53?.b_inputOne,
                c_inputTwo: value?.J_Outros_Custos?.questao53?.c_inputTwo,
                d_inputThree: value?.J_Outros_Custos?.questao53?.d_inputThree,
                e_inputFour: value?.J_Outros_Custos?.questao53?.e_inputFour,
                f_inputFive: value?.J_Outros_Custos?.questao53?.f_inputFive,
                g_inputSix: value?.J_Outros_Custos?.questao53?.g_inputSix,
              },
              questao54: value?.J_Outros_Custos?.questao54,
              questao55: value?.J_Outros_Custos?.questao55,
              questao56: {
                a_id: value?.J_Outros_Custos?.questao56?.a_id,
                b_inputOne: value?.J_Outros_Custos?.questao56?.b_inputOne,
                c_inputTwo: value?.J_Outros_Custos?.questao56?.c_inputTwo,
              },
              questao57: {
                a_id: value?.J_Outros_Custos?.questao57?.a_id,
                b_inputOne: value?.J_Outros_Custos?.questao57?.b_inputOne,
                c_inputTwo: value?.J_Outros_Custos?.questao57?.c_inputTwo,
              },
              questao58: value?.J_Outros_Custos?.questao58,
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