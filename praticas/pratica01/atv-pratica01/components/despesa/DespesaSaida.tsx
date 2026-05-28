import { View } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

type Despesa = {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
};

function DespesaSaida({ despesas, periodo }: { despesas: Despesa[]; periodo: string }) {
  return (
    <View>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista despesas={despesas} />
    </View>
  );
}

export default DespesaSaida;
