import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import IconButton from '@/components/IconButton';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        headerRight: () => (
          <IconButton
            icon="add"
            size={24}
            color={Colors[colorScheme ?? 'light'].tint}
            onPress={() => router.push('/gerenciar-despesa' as any)}
          />
        ),
      }}>
      <Tabs.Screen
        name="despesas-recentes"
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="todas-despesas"
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
