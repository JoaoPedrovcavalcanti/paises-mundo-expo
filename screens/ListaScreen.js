import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Chip, Searchbar, Text } from 'react-native-paper';
import CartaoPais from '../components/CartaoPais';
import { useApp } from '../contexts/AppContext';

const CONTINENTES = [
  { chave: 'Todos', rotulo: 'Todos' },
  { chave: 'Africa', rotulo: 'África' },
  { chave: 'Americas', rotulo: 'Américas' },
  { chave: 'Asia', rotulo: 'Ásia' },
  { chave: 'Europe', rotulo: 'Europa' },
  { chave: 'Oceania', rotulo: 'Oceania' },
];

export default function ListaScreen({ navigation }) {
  const { paises, status, buscarPaises, favoritos, alternarFavorito } = useApp();
  const [continente, setContinente] = useState('Todos');
  const [texto, setTexto] = useState('');

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
      <Text variant="bodyMedium" style={estilos.subtitulo}>
        {status === 'ok' ? `${visiveis.length} países encontrados` : 'Explore o mundo'}
      </Text>

      <Searchbar
        placeholder="Buscar país..."
        value={texto}
        onChangeText={setTexto}
        style={estilos.busca}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={estilos.filtros}
        contentContainerStyle={{ gap: 8 }}
      >
        {CONTINENTES.map((c) => (
          <Chip
            key={c.chave}
            selected={continente === c.chave}
            onPress={() => setContinente(c.chave)}
          >
            {c.rotulo}
          </Chip>
        ))}
      </ScrollView>

      {status === 'carregando' && (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      )}

      {status === 'erro' && (
        <View style={estilos.centro}>
          <Text style={estilos.mensagem}>
            Não foi possível carregar os países. Confira sua conexão.
          </Text>
          <Button mode="contained" onPress={buscarPaises}>
            Tentar novamente
          </Button>
        </View>
      )}

      {status === 'ok' && (
        <FlatList
          data={visiveis}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <CartaoPais
              pais={item}
              favorito={favoritos.includes(item.nome)}
              onPress={() => navigation.navigate('Detalhes', { pais: item })}
              onFavoritar={() => alternarFavorito(item.nome)}
            />
          )}
          ListEmptyComponent={<Text style={estilos.vazio}>Nenhum país encontrado.</Text>}
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
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  subtitulo: {
    color: '#64748b',
    marginBottom: 10,
  },
  busca: {
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },
  filtros: {
    flexGrow: 0,
    marginBottom: 14,
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
  vazio: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 40,
  },
});