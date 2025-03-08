import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="(tabs)/calculator"
        options={{
          drawerLabel: 'Calculator',
          title: 'Calculator',
        }}
      />
    </Drawer>
  );
}
