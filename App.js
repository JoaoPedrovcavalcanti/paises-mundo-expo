import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CartaoPais from './components/CartaoPais';

const URL_API =
  'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region';

const CONTINENTES = [
  { chave: 'Todos', rotulo: 'Todos' },
  { chave: 'Africa', rotulo: 'África' },
  { chave: 'Americas', rotulo: 'Américas' },
  { chave: 'Asia', rotulo: 'Ásia' },
  { chave: 'Europe', rotulo: 'Europa' },
  { chave: 'Oceania', rotulo: 'Oceania' },
];

export default function App() {
  const [paises, setPaises] = useState([]);
  const [status, setStatus] = useState('carregando'); // carregando | ok | erro
  const [continente, setContinente] = useState('Todos');
  const [texto, setTexto] = useState('');

  async function buscarPaises() {
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
  }

  useEffect(() => {
    buscarPaises();
  }, []);

  const visiveis = useMemo(() => {
    const busca = texto.toLowerCase().trim();
    return paises.filter(
      (p) =>
        (continente === 'Todos' || p.regiao === continente) &&
        p.nome.toLowerCase().includes(busca)
    );
  }, [paises, continente, texto]);

  return (
    <View style={estilos.tela}>
      <StatusBar barStyle="dark-content" />

      <Text style={estilos.titulo}>Países do Mundo</Text>
      <Text style={estilos.subtitulo}>
        {status === 'ok' ? `${visiveis.length} países encontrados` : 'Explore o mundo'}
      </Text>

      <TextInput
        style={estilos.busca}
        placeholder="Buscar país..."
        placeholderTextColor="#94a3b8"
        value={texto}
        onChangeText={setTexto}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={estilos.filtros}
        contentContainerStyle={{ gap: 8 }}
      >
        {CONTINENTES.map((c) => (
          <Pressable
            key={c.chave}
            onPress={() => setContinente(c.chave)}
            style={[estilos.chip, continente === c.chave && estilos.chipAtivo]}
          >
            <Text
              style={[
                estilos.chipTexto,
                continente === c.chave && estilos.chipTextoAtivo,
              ]}
            >
              {c.rotulo}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {status === 'carregando' && (
        <ActivityIndicator size="large" color="#0ea5e9" style={{ marginTop: 40 }} />
      )}

      {status === 'erro' && (
        <View style={estilos.centro}>
          <Text style={estilos.mensagem}>
            Não foi possível carregar os países. Confira sua conexão.
          </Text>
          <Pressable style={estilos.botao} onPress={buscarPaises}>
            <Text style={estilos.botaoTexto}>Tentar novamente</Text>
          </Pressable>
        </View>
      )}

      {status === 'ok' && (
        <FlatList
          data={visiveis}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => <CartaoPais pais={item} />}
          ListEmptyComponent={
            <Text style={estilos.vazio}>Nenhum país encontrado.</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 14,
  },
  busca: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  filtros: {
    flexGrow: 0,
    marginBottom: 14,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  chipAtivo: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  chipTexto: {
    color: '#334155',
    fontWeight: '600',
  },
  chipTextoAtivo: {
    color: '#ffffff',
  },
  centro: {
    alignItems: 'center',
    marginTop: 40,
  },
  mensagem: {
    color: '#334155',
    textAlign: 'center',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#ffffff',
    fontWeight: '700',
  },
  vazio: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 40,
  },
});