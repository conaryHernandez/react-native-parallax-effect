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
		uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
		title: 'Mountain Peak',
	},
	{
		uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
		title: 'Forest Trail',
	},
	{
		uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
		title: 'Nature Path',
	},
	{
		uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
		title: 'Misty Valley',
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

const CarouselPage = () => {
	const scrollRef = useAnimatedRef<ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const scrollX = useSharedValue(0);

	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollX.value = event.contentOffset.x;
		},
	});

	return (
		<View style={styles.container}>
			<View style={styles.carouselContainer}>
				<Text style={styles.headerTitle}>Swipe to explore</Text>
				<Animated.ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					snapToInterval={ITEM_WIDTH + SPACING}
					decelerationRate="fast"
					contentContainerStyle={styles.carouselContent}
					onScroll={onScroll}
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
			</View>

			<AnimatedScrollView ref={scrollRef} scrollEventThrottle={16}>
				<View style={styles.content}>
					<Text style={styles.title}>🎠 Image Carousel</Text>

					<Text style={styles.subtitle}>
						Swipe Through Beautiful Landscapes
					</Text>

					<Text style={styles.paragraph}>
						Explore stunning landscapes with smooth swipe gestures. Each image
						scales and fades as you scroll through the carousel, creating an
						immersive viewing experience.
					</Text>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🌄 Dynamic Scaling</Text>
						<Text style={styles.paragraph}>
							Watch as images smoothly scale up when centered and scale down as
							they move to the sides. This creates a natural focus on the
							current image while maintaining awareness of adjacent items.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>✨ Smooth Transitions</Text>
						<Text style={styles.paragraph}>
							The carousel uses React Native Reanimated for butter-smooth 60fps
							animations. Every swipe gesture feels natural and responsive,
							providing an excellent user experience.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>📱 Native Feel</Text>
						<Text style={styles.paragraph}>
							Snap-to-interval scrolling ensures each image aligns perfectly in
							view. The deceleration rate is tuned for a native-feeling swipe
							that's neither too fast nor too slow.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🎨 Visual Feedback</Text>
						<Text style={styles.paragraph}>
							Opacity changes provide additional visual feedback as you scroll.
							Side images fade slightly, drawing your attention to the centered
							content while maintaining context of the overall collection.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🔄 Gesture Based</Text>
						<Text style={styles.paragraph}>
							Simple horizontal swipe gestures let you navigate through the
							collection naturally. No buttons or complex controls needed - just
							swipe left or right to explore.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🚀 Performance</Text>
						<Text style={styles.paragraph}>
							Built with performance in mind, the carousel handles multiple
							images efficiently. Reanimated runs animations on the UI thread,
							ensuring smooth performance even with complex transformations.
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>🎯 Customizable</Text>
						<Text style={styles.paragraph}>
							The carousel is highly customizable - adjust spacing, item width,
							animation curves, and more. Adapt it to match your app's design
							language and user experience goals.
						</Text>
					</View>

					<View style={styles.finalSection}>
						<Text style={styles.finalText}>
							Try swiping through the carousel above to see the smooth
							animations in action! 👆
						</Text>
					</View>
				</View>
			</AnimatedScrollView>
		</View>
	);
};

export default CarouselPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	carouselContainer: {
		paddingTop: 60,
		paddingBottom: 20,
		backgroundColor: '#f8f9fa',
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
