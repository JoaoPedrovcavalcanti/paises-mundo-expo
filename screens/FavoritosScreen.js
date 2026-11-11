import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import CartaoPais from '../components/CartaoPais';
import { useApp } from '../contexts/AppContext';

export default function FavoritosScreen({ navigation }) {
  const { paises, favoritos, alternarFavorito } = useApp();
  const lista = paises.filter((p) => favoritos.includes(p.nome));

  return (
    <View style={estilos.tela}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <CartaoPais
            pais={item}
            favorito
            onPress={() => navigation.navigate('Detalhes', { pais: item })}
            onFavoritar={() => alternarFavorito(item.nome)}
          />
        )}
        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Você ainda não favoritou nenhum país. Toque no coração na lista.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
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
  vazio: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 40,
  },
});