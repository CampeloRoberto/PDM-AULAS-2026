import { View, Text } from 'react-native';

type Despesa = {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
};

function DespesaSumario({ despesas, periodo }: { despesas: Despesa[]; periodo: string }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  return (
    <View>
      <Text>{periodo}</Text>
      <Text>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;
