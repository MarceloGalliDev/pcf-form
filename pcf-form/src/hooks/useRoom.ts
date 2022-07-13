import { ref, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

type Aderidos = {
  idForm: number;
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
    questao16: string,
    questao17: string,
    questao18: string,
    questao19: string,
    questao20: string,
    questao21: {
      a_visitadoresEdital: boolean,
      b_visitadoresEquipePropria: boolean,
      c_visitadoresContratacaoDireta: boolean,
      d_visitadoresContratacaoEstagio: boolean,
      e_visitadoresNaoSeAplica: boolean,
      f_visitadoresOutro: boolean,
      g_visitadoresOutrosDescricao: string,
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
    questao49: string,
    questao50: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
      d_inputThree: string;
    },
    questao51: string,
    questao52: string,
  },
  I_Recursos_E_Custos: {
    questao53: {
      a_proximidadeDomicilioFamilia: boolean,
      b_proximidadeDomicilioVisitadores: boolean,
      c_caracteristicasCrianca: boolean,
      d_atribuicaoPorVaga: boolean,
      e_sorteio: boolean,
      f_outroDistribuicao: boolean,
      g_outroDistribuicaoText: string,
    },
    questao54: string,
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

type FirebaseQuestions = {
  idForm: number;
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
    questao16: string,
    questao17: string,
    questao18: string,
    questao19: string,
    questao20: string,
    questao21: {
      a_visitadoresEdital: boolean,
      b_visitadoresEquipePropria: boolean,
      c_visitadoresContratacaoDireta: boolean,
      d_visitadoresContratacaoEstagio: boolean,
      e_visitadoresNaoSeAplica: boolean,
      f_visitadoresOutro: boolean,
      g_visitadoresOutrosDescricao: string,
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
    questao49: string,
    questao50: {
      a_id: number;
      b_inputOne: string;
      c_inputTwo: string;
      d_inputThree: string;
    },
    questao51: string,
    questao52: string,
  },
  I_Recursos_E_Custos: {
    questao53: {
      a_proximidadeDomicilioFamilia: boolean,
      b_proximidadeDomicilioVisitadores: boolean,
      c_caracteristicasCrianca: boolean,
      d_atribuicaoPorVaga: boolean,
      e_sorteio: boolean,
      f_outroDistribuicao: boolean,
      g_outroDistribuicaoText: string,
    },
    questao54: string,
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

export function useRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [question, setQuestion] = useState<Aderidos[]>([]);
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);

    onValue(roomRef, room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.question ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          idForm: key,
          A_Informacoes_Gerais: {
            questao01: value.questao01,
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
            questao16: string,
            questao17: string,
            questao18: string,
            questao19: string,
            questao20: string,
            questao21: {
              a_visitadoresEdital: boolean,
              b_visitadoresEquipePropria: boolean,
              c_visitadoresContratacaoDireta: boolean,
              d_visitadoresContratacaoEstagio: boolean,
              e_visitadoresNaoSeAplica: boolean,
              f_visitadoresOutro: boolean,
              g_visitadoresOutrosDescricao: string,
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
            questao49: string,
            questao50: {
              a_id: number;
              b_inputOne: string;
              c_inputTwo: string;
              d_inputThree: string;
            },
            questao51: string,
            questao52: string,
          },
          I_Recursos_E_Custos: {
            questao53: {
              a_proximidadeDomicilioFamilia: boolean,
              b_proximidadeDomicilioVisitadores: boolean,
              c_caracteristicasCrianca: boolean,
              d_atribuicaoPorVaga: boolean,
              e_sorteio: boolean,
              f_outroDistribuicao: boolean,
              g_outroDistribuicaoText: string,
            },
            questao54: string,
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
        }
      })

    })

  },[])

};