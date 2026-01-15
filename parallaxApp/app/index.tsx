import { Stack } from 'expo-router';
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 600;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Page = () => {
	const scrollRef = useAnimatedRef<ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
		};
	});

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-IMG_HEIGHT, 0, IMG_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	return (
		<View style={styles.container}>
			{/* expo router Stack.Screen to make header transparent */}
			<Stack.Screen
				options={{
					headerTransparent: true,
					headerLeft: () => <Text>Back</Text>,
					headerBackground: () => (
						<Animated.View style={[styles.header, headerAnimatedStyle]} />
					),
				}}
			/>
			<AnimatedScrollView ref={scrollRef} scrollEventThrottle={16}>
				<Animated.Image
					source={{
						uri: 'https://images.unsplash.com/photo-1701958213924-f7e9ed8d114b?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
					}}
					style={[styles.image, imageAnimatedStyle]}
					resizeMode="cover"
				/>
				<View style={styles.content}>
					<Text style={styles.title}>🌄 Mountain Paradise</Text>

					<Text style={styles.subtitle}>A Journey Through Nature</Text>

					<Text style={styles.paragraph}>
						Experience the breathtaking beauty of mountain landscapes, where
						peaks touch the sky and valleys cradle pristine lakes. The crisp
						mountain air and stunning vistas create an unforgettable adventure.
					</Text>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🏔️ Majestic Peaks</Text>
						<Text style={styles.paragraph}>
							Towering mountains stand as silent sentinels, their snow-capped
							summits gleaming in the sunlight. Each peak tells a story of
							geological forces that shaped our planet over millions of years.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🌲 Alpine Forests</Text>
						<Text style={styles.paragraph}>
							Dense forests of pine and fir trees blanket the mountainsides,
							providing habitat for countless species of wildlife. The scent of
							pine needles and the sound of rustling leaves create a peaceful
							atmosphere.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>💧 Crystal Waters</Text>
						<Text style={styles.paragraph}>
							Mountain streams cascade down rocky slopes, feeding pristine lakes
							that mirror the sky. These waters are so clear you can see every
							pebble on the bottom, creating mesmerizing reflections.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🌅 Golden Sunsets</Text>
						<Text style={styles.paragraph}>
							As the sun sets behind the peaks, the sky erupts in brilliant hues
							of orange, pink, and purple. The mountains cast long shadows
							across the valleys, creating a magical twilight atmosphere.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>⭐ Starry Nights</Text>
						<Text style={styles.paragraph}>
							Far from city lights, the night sky reveals its full glory.
							Thousands of stars twinkle above, with the Milky Way stretching
							across the heavens like a cosmic river.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🦅 Wildlife Encounters</Text>
						<Text style={styles.paragraph}>
							Eagles soar on thermal currents, deer graze in meadows, and
							marmots whistle from rocky outcrops. Each season brings new
							wildlife activity and opportunities for observation.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🥾 Hiking Trails</Text>
						<Text style={styles.paragraph}>
							Winding trails lead through diverse terrain, from gentle meadow
							walks to challenging summit climbs. Each path offers unique
							perspectives and rewards for those willing to explore.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>❄️ Winter Wonderland</Text>
						<Text style={styles.paragraph}>
							When winter arrives, the mountains transform into a pristine
							wonderland. Fresh snow blankets everything in white, and icicles
							hang like nature's chandeliers from rocky overhangs.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🌸 Spring Awakening</Text>
						<Text style={styles.paragraph}>
							Spring brings an explosion of wildflowers across alpine meadows.
							Melting snow feeds rushing streams, and wildlife emerges from
							winter hibernation to welcome the warmer days.
						</Text>
					</View>
				</View>
			</AnimatedScrollView>
		</View>
	);
};
export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	image: {
		width,
		height: IMG_HEIGHT,
	},
	header: {
		backgroundColor: 'red',
		height: 100,
	},
	content: {
		backgroundColor: '#fff',
		padding: 20,
		paddingBottom: 60,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 10,
		color: '#2c3e50',
	},
	subtitle: {
		fontSize: 18,
		textAlign: 'center',
		color: '#7f8c8d',
		marginBottom: 20,
		fontStyle: 'italic',
	},
	paragraph: {
		fontSize: 16,
		lineHeight: 24,
		color: '#34495e',
		textAlign: 'justify',
	},
	section: {
		marginTop: 30,
		paddingTop: 20,
		borderTopWidth: 1,
		borderTopColor: '#ecf0f1',
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: '600',
		marginBottom: 12,
		color: '#2c3e50',
	},
});
