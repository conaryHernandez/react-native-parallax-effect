import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#2c3e50',
				tabBarInactiveTintColor: '#95a5a6',
			}}
		>
			<Tabs.Screen
				name="_layout"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Parallax',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="image" size={size} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="carousel"
				options={{
					title: 'Carousel',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="images" size={size} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="parallax-carousel"
				options={{
					title: 'Mix',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="albums" size={size} color={color} />
					),
					headerShown: false,
				}}
			/>
		</Tabs>
	);
};

export default Layout;
