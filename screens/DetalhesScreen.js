import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, List } from 'react-native-paper';
import { useApp } from '../contexts/AppContext';

export default function DetalhesScreen({ route }) {
  const { pais } = route.params;
  const { favoritos, alternarFavorito } = useApp();
  const favorito = favoritos.includes(pais.nome);

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Card style={estilos.cartao}>
        <Card.Cover source={{ uri: pais.bandeira }} resizeMode="contain" style={estilos.capa} />
        <Card.Title title={pais.nome} titleVariant="headlineSmall" />
        <Card.Content>
          <List.Item
            title="Capital"
            description={pais.capital}
            left={(props) => <List.Icon {...props} icon="city" />}
          />
          <List.Item
            title="População"
            description={`${pais.populacao.toLocaleString('pt-BR')} habitantes`}
            left={(props) => <List.Icon {...props} icon="account-group" />}
          />
          <List.Item
            title="Região"
            description={pais.regiao}
            left={(props) => <List.Icon {...props} icon="earth" />}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode={favorito ? 'outlined' : 'contained'}
            icon={favorito ? 'heart-off' : 'heart'}
            onPress={() => alternarFavorito(pais.nome)}
          >
            {favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  conteudo: {
    padding: 16,
  },
  cartao: {
    backgroundColor: '#ffffff',
  },
  capa: {
    backgroundColor: '#e2e8f0',
  },
});