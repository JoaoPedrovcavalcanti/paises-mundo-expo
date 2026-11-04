import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CartaoPais({ pais }) {
  const [aberto, setAberto] = useState(false);

  return (
    <Pressable style={estilos.cartao} onPress={() => setAberto(!aberto)}>
      <View style={estilos.topo}>
        <Image source={{ uri: pais.bandeira }} style={estilos.bandeira} />
        <View style={{ flex: 1 }}>
          <Text style={estilos.nome}>{pais.nome}</Text>
          <Text style={estilos.regiao}>{pais.regiao}</Text>
        </View>
        <Text style={estilos.seta}>{aberto ? '▲' : '▼'}</Text>
      </View>

      {aberto && (
        <View style={estilos.detalhes}>
          <Text style={estilos.linha}>Capital: {pais.capital}</Text>
          <Text style={estilos.linha}>
            População: {pais.populacao.toLocaleString('pt-BR')} habitantes
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  topo: {
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
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  regiao: {
    fontSize: 13,
    color: '#64748b',
  },
  seta: {
    color: '#0ea5e9',
    fontSize: 14,
    marginLeft: 8,
  },
  detalhes: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  linha: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
  },
});