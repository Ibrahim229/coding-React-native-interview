import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { MovieDetailsNavigationProp, MovieDetailsRouteProp } from "../../types/navProps";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, useAnimatedScrollHandler, interpolate } from "react-native-reanimated";

interface Props {
    route: MovieDetailsRouteProp;
    navigation: MovieDetailsNavigationProp;
}

const MovieDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const { movie } = route.params;
    // animation
    // scroll animation
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const posterAnimatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(scrollY.value, [0, 200], [1, 0.5], {
            extrapolateRight: "clamp",
        });
        const translateY = interpolate(scrollY.value, [0, 200], [0, -100], {
            extrapolateRight: "clamp",
        });

        return {
            transform: [{ scale }, { translateY }],
        };
    });
    // Text animation
    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(30);

    const textAnimatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(textOpacity.value, { duration: 2000 }),
        transform: [{ translateY: withTiming(textTranslateY.value, { duration: 500 }) }],
    }));


    useEffect(() => {
        textOpacity.value = withTiming(1, { duration: 500 });
        textTranslateY.value = withTiming(0, { duration: 500 })
        navigation.getParent()?.setOptions({ headerShown: false });
        return () => {
            navigation.getParent()?.setOptions({ headerShown: true });
        };
    }, [navigation]);

    return (
        <View>
            <Animated.View style={[styles.posterContainer, posterAnimatedStyle]}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                    style={styles.poster}
                /></Animated.View>
            <Animated.ScrollView
                contentContainerStyle={styles.scrollContent}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Animated.View style={[textAnimatedStyle]}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.overview}>{movie.overview}</Text>
                </Animated.View></Animated.ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    posterContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    scrollContent: {
        marginTop: 300,
        padding: 20,
    },
    poster: { width: "100%", height: 300 },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
    overview: { fontSize: 16, textAlign: "center", marginTop: 10 },
});

export default MovieDetailsScreen;

