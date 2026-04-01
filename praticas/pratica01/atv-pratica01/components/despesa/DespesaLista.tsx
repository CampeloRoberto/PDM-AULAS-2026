import { FlatList } from 'react-native';
import DespesaItem from './DespesaItem';

type Despesa = {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
};

function DespesaLista({ despesas }: { despesas: Despesa[] }) {
  return (
    <FlatList
      data={despesas}
      renderItem={({ item }) => <DespesaItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default DespesaLista;
