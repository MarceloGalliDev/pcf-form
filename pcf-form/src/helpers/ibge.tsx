const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1'

export const fetchStates = () => {
  const url = `${BASE_URL}/localidades/estados`
  return fetch(url).then(response => response.json())
}

export const fetchCitiesForState = (state: string) => {
  const url = `${BASE_URL}/localidades/estados/${state}/municipios`
  return fetch(url).then(response => response.json())
}

//https://servicodados.ibge.gov.br/api/v1/localidades/estados

//https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios