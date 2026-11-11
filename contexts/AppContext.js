import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL_API = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region';
const CHAVE_FAVORITOS = '@paises:favoritos';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [paises, setPaises] = useState([]);
  const [status, setStatus] = useState('carregando'); // carregando, ok ou erro
  const [favoritos, setFavoritos] = useState([]);

  const buscarPaises = useCallback(async () => {
    setStatus('carregando');
    try {
      const resp = await fetch(URL_API);
      if (!resp.ok) {
        throw new Error('HTTP ' + resp.status);
      }
      const json = await resp.json();
      const lista = json
        .map((p) => ({
          nome: p.name.common,
          bandeira: p.flags.png,
          capital: p.capital?.[0] ?? 'Sem capital',
          populacao: p.population,
          regiao: p.region,
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
      setPaises(lista);
      setStatus('ok');
    } catch (e) {
      setStatus('erro');
    }
  }, []);

  useEffect(() => {
    buscarPaises();
    // lê os favoritos salvos no aparelho
    AsyncStorage.getItem(CHAVE_FAVORITOS)
      .then((valor) => {
        if (valor) {
          setFavoritos(JSON.parse(valor));
        }
      })
      .catch(() => {});
  }, [buscarPaises]);

  function alternarFavorito(nome) {
    const novos = favoritos.includes(nome)
      ? favoritos.filter((n) => n !== nome)
      : [...favoritos, nome];
    setFavoritos(novos);
    // salva no aparelho
    AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novos)).catch(() => {});
  }

  return (
    <AppContext.Provider
      value={{ paises, status, buscarPaises, favoritos, alternarFavorito }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}