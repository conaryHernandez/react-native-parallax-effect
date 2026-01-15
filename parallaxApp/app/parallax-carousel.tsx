import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useScrollViewOffset,
	useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 300;
const SPACING = 10;
const ITEM_WIDTH = width - 40;

const images = [
	{
		uri: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800',
		title: 'Sunset Beach',
	},
	{
		uri: 'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=800',
		title: 'Ocean Waves',
	},
	{
		uri: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800',
		title: 'Coastal View',
	},
	{
		uri: 'https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=800',
		title: 'Horizon Line',
	},
];

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const CarouselItem = ({
	item,
	index,
	scrollX,
}: {
	item: { uri: string; title: string };
	index: number;
	scrollX: Animated.SharedValue<number>;
}) => {
	const animatedStyle = useAnimatedStyle(() => {
		const inputRange = [
			(index - 1) * (ITEM_WIDTH + SPACING),
			index * (ITEM_WIDTH + SPACING),
			(index + 1) * (ITEM_WIDTH + SPACING),
		];

		const scale = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8]);
		const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5]);

		return {
			transform: [{ scale }],
			opacity,
		};
	});

	return (
		<Animated.View style={[styles.carouselItem, animatedStyle]}>
			<Animated.Image
				source={{ uri: item.uri }}
				style={styles.carouselImage}
				resizeMode="cover"
			/>
			<View style={styles.carouselTextContainer}>
				<Text style={styles.carouselTitle}>{item.title}</Text>
			</View>
		</Animated.View>
	);
};

const ParallaxCarouselPage = () => {
	const scrollRef = useAnimatedRef<ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const scrollX = useSharedValue(0);

	const onScrollHorizontal = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollX.value = event.contentOffset.x;
		},
	});

	// Parallax animation for the carousel container
	const carouselAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-CAROUSEL_HEIGHT, 0, CAROUSEL_HEIGHT],
						[-CAROUSEL_HEIGHT / 2, 0, CAROUSEL_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-CAROUSEL_HEIGHT, 0, CAROUSEL_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	return (
		<View style={styles.container}>
			<AnimatedScrollView ref={scrollRef} scrollEventThrottle={16}>
				<Animated.View
					style={[styles.carouselContainer, carouselAnimatedStyle]}
				>
					<Text style={styles.headerTitle}>Swipe to explore</Text>
					<Animated.ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						snapToInterval={ITEM_WIDTH + SPACING}
						decelerationRate="fast"
						contentContainerStyle={styles.carouselContent}
						onScroll={onScrollHorizontal}
						scrollEventThrottle={16}
					>
						{images.map((item, index) => (
							<CarouselItem
								key={index}
								item={item}
								index={index}
								scrollX={scrollX}
							/>
						))}
					</Animated.ScrollView>
				</Animated.View>

				<View style={styles.content}>
					<Text style={styles.title}>🎪 Parallax Carousel</Text>

					<Text style={styles.subtitle}>Scroll Down to Hide the Carousel</Text>

					<Text style={styles.paragraph}>
						This screen combines both effects: a horizontal swipe carousel with
						parallax scrolling. As you scroll down, the entire carousel moves
						and scales with a parallax effect, just like the image in the first
						screen.
					</Text>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🎢 Dual Animation</Text>
						<Text style={styles.paragraph}>
							Experience two types of animations working together. The carousel
							items scale and fade as you swipe horizontally, while the entire
							carousel section transforms with parallax as you scroll
							vertically.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>📱 Smooth Performance</Text>
						<Text style={styles.paragraph}>
							Despite having multiple complex animations running simultaneously,
							the performance remains butter-smooth thanks to React Native
							Reanimated running everything on the UI thread.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🌊 Ocean Views</Text>
						<Text style={styles.paragraph}>
							These carousel images showcase beautiful ocean and coastal scenes.
							The serene blues and dynamic waves create a calming atmosphere as
							you explore the collection.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>✨ Dynamic Depth</Text>
						<Text style={styles.paragraph}>
							The parallax effect creates a sense of depth and layering. As you
							scroll, the carousel appears to move at a different speed than the
							content, creating a 3D-like experience on a 2D screen.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🎯 Gesture Handling</Text>
						<Text style={styles.paragraph}>
							The app intelligently handles both horizontal swipes on the
							carousel and vertical scrolls on the page. Each gesture is
							recognized independently, preventing conflicts and ensuring smooth
							interactions.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🔄 Scale Transform</Text>
						<Text style={styles.paragraph}>
							Notice how the carousel slightly scales as you scroll. When you
							pull down (overscroll), it zooms in. When you scroll up normally,
							it maintains its scale. This adds extra dynamism to the effect.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🎨 Visual Hierarchy</Text>
						<Text style={styles.paragraph}>
							The parallax motion helps establish visual hierarchy. The carousel
							at the top feels like a hero section that gives way to the
							detailed content below as you progress through the page.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>💫 Interpolation Magic</Text>
						<Text style={styles.paragraph}>
							All these effects are powered by interpolation functions that map
							scroll positions to animation values. This creates smooth
							transitions without any jarring movements.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🚀 Best of Both</Text>
						<Text style={styles.paragraph}>
							This screen demonstrates how you can combine different animation
							techniques in a single view. It's the best of both worlds -
							interactive carousel navigation with immersive parallax scrolling.
						</Text>
					</View>

					<View style={styles.finalSection}>
						<Text style={styles.finalText}>
							Try scrolling back up to see the carousel reappear with the
							parallax effect! ⬆️ Then swipe through the images. 👆
						</Text>
					</View>
				</View>
			</AnimatedScrollView>
		</View>
	);
};

export default ParallaxCarouselPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	carouselContainer: {
		paddingTop: 60,
		paddingBottom: 20,
		backgroundColor: '#f8f9fa',
		height: CAROUSEL_HEIGHT + 120,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
		color: '#2c3e50',
	},
	carouselContent: {
		paddingHorizontal: 20,
	},
	carouselItem: {
		width: ITEM_WIDTH,
		height: CAROUSEL_HEIGHT,
		marginRight: SPACING,
		borderRadius: 16,
		overflow: 'hidden',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	carouselImage: {
		width: '100%',
		height: '100%',
	},
	carouselTextContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		padding: 16,
	},
	carouselTitle: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
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
	finalSection: {
		marginTop: 50,
		padding: 20,
		backgroundColor: '#ecf0f1',
		borderRadius: 12,
		alignItems: 'center',
	},
	finalText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#7f8c8d',
		fontStyle: 'italic',
		lineHeight: 24,
	},
});
