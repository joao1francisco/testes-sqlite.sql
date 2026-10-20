
import { useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

export default function App() {
  const [verReceitaVisivel, setVerReceitaVisivel] = useState(false);
  const [cadastroVisivel, setCadastroVisivel] = useState(false);

  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: 'Bolo de Chocolate',
      ingredientes:
        '2 xícaras de farinha de trigo\n1 xícara de açúcar\n1 xícara de chocolate em pó\n2 ovos\n1 xícara de leite\n1 colher de sopa de fermento',
      preparo:
        '1. Misture os ovos, o açúcar e o leite.\n\n2. Adicione a farinha e o chocolate em pó.\n\n3. Acrescente o fermento e misture delicadamente.\n\n4. Coloque a massa em uma forma untada.\n\n5. Asse em forno preaquecido a 180°C por cerca de 35 minutos.'
    },
    {
      id: '2',
      nome: 'Pudim de Leite Condensado',
      ingredientes:
        '1 lata de leite condensado\n2 medidas da lata de leite\n3 ovos\n1 xícara de açúcar para a calda',
      preparo:
        '1. Derreta o açúcar em uma panela até formar uma calda dourada.\n\n2. Despeje a calda em uma forma de pudim.\n\n3. Bata o leite condensado, o leite e os ovos no liquidificador.\n\n4. Despeje a mistura na forma caramelizada.\n\n5. Cubra com papel-alumínio e asse em banho-maria a 180°C por cerca de 1 hora e 30 minutos.\n\n6. Espere esfriar, leve à geladeira por algumas horas e desenforme.'
    }
  ]);

  function limparCampos() {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
  }

  function salvarReceita() {
    if (
      !nomeReceita.trim() ||
      !ingredientes.trim() ||
      !modoPreparo.trim()
    ) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    const novaReceita = {
      id: Date.now().toString(),
      nome: nomeReceita.trim(),
      ingredientes: ingredientes.trim(),
      preparo: modoPreparo.trim()
    };

    setReceitas(listaAtual => [...listaAtual, novaReceita]);

    limparCampos();
    setCadastroVisivel(false);

    Alert.alert('Sucesso', 'Receita cadastrada!');
  }

  function cancelarCadastro() {
    limparCampos();
    setCadastroVisivel(false);
  }

  function abrirReceita(receita) {
    setReceitaSelecionada(receita);
    setVerReceitaVisivel(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍰 App de Receitas</Text>

      <Text style={styles.subtitle}>
        Colecione suas receitas preferidas
      </Text>

      <ScrollView
        style={styles.lista}
        contentContainerStyle={styles.listaConteudo}
      >
        {receitas.map((receita) => (
          <View key={receita.id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {receita.nome}
            </Text>

            <Button
              title="Ver Receita"
              color="#8B4513"
              onPress={() => abrirReceita(receita)}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setCadastroVisivel(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={verReceitaVisivel}
        animationType="slide"
        onRequestClose={() => setVerReceitaVisivel(false)}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          {receitaSelecionada && (
            <>
              <Text style={styles.title}>
                {receitaSelecionada.nome}
              </Text>

              <Text style={styles.heading}>Ingredientes</Text>
              <Text style={styles.text}>
                {receitaSelecionada.ingredientes}
              </Text>

              <Text style={styles.heading}>Modo de Preparo</Text>
              <Text style={styles.text}>
                {receitaSelecionada.preparo}
              </Text>
            </>
          )}

          <View style={styles.button}>
            <Button
              title="Fechar Receita"
              color="#8B4513"
              onPress={() => setVerReceitaVisivel(false)}
            />
          </View>
        </ScrollView>
      </Modal>

      <Modal
        visible={cadastroVisivel}
        animationType="slide"
        onRequestClose={cancelarCadastro}
      >
        <ScrollView
          contentContainerStyle={styles.modalContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Cadastrar Receita</Text>

          <Text style={styles.label}>Nome da Receita</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Pudim de Leite Condensado"
            value={nomeReceita}
            onChangeText={setNomeReceita}
          />

          <Text style={styles.label}>Ingredientes</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Digite os ingredientes"
            value={ingredientes}
            onChangeText={setIngredientes}
            multiline={true}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Modo de Preparo</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Explique como preparar"
            value={modoPreparo}
            onChangeText={setModoPreparo}
            multiline={true}
            textAlignVertical="top"
          />

          <View style={styles.button}>
            <Button
              title="Salvar"
              color="#548235"
              onPress={salvarReceita}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="Cancelar"
              color="#8B4513"
              onPress={cancelarCadastro}
            />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0D9',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    color: '#654321',
    marginBottom: 20,
    textAlign: 'center'
  },
  lista: {
    flex: 1,
    width: '100%'
  },
  listaConteudo: {
    paddingBottom: 100
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 12
  },
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF0D9',
    padding: 25,
    paddingTop: 50
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
    marginTop: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 17,
    color: '#654321',
    lineHeight: 27
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#654321',
    marginTop: 15,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D2B48C',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333'
  },
  multiline: {
    height: 120
  },
  button: {
    marginTop: 20
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36
  }
});
