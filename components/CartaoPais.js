import { Image, StyleSheet, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

export default function CartaoPais({ pais, favorito, onPress, onFavoritar }) {
  return (
    <Card style={estilos.cartao} onPress={onPress} mode="elevated">
      <Card.Content style={estilos.linha}>
        <Image source={{ uri: pais.bandeira }} style={estilos.bandeira} />
        <View style={estilos.textos}>
          <Text variant="titleMedium" style={estilos.nome}>
            {pais.nome}
          </Text>
          <Text variant="bodySmall" style={estilos.regiao}>
            {pais.regiao}
          </Text>
        </View>
        <IconButton
          icon={favorito ? 'heart' : 'heart-outline'}
          iconColor={favorito ? '#ef4444' : '#64748b'}
          onPress={onFavoritar}
        />
      </Card.Content>
    </Card>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bandeira: {
    width: 56,
    height: 38,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#e2e8f0',
  },
  textos: {
    flex: 1,
  },
  nome: {
    fontWeight: '700',
    color: '#0f172a',
  },
  regiao: {
    color: '#64748b',
  },
});