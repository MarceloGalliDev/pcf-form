import { Category } from '../types/Category'

export const categories: Category = {
  transporte: { title: 'Transporte', color: 'blue', expense: true },
  alimentacao: { title: 'Alimentação', color: 'brown', expense: true },
  comunicacao: { title: 'Comunicação', color: 'green', expense: false },
  equipamentos: { title: 'Equipamentos', color: 'green', expense: false },
  moveiseutensilios: { title: 'Móveis e utensílios', color: 'green', expense: false },
  materiais: { title: 'Materiais de consumo', color: 'green', expense: false },
  livrosebrinquedos: { title: 'Livros e brinquedos', color: 'green', expense: false },
  outros: { title: 'Outros', color: 'green', expense: false },
}