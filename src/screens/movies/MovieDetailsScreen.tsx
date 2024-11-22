import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { MovieDetailsNavigationProp, MovieDetailsRouteProp } from "../../types/navProps";


interface Props {
    route: MovieDetailsRouteProp;
    navigation: MovieDetailsNavigationProp;
}

const MovieDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const { movie } = route.params;


    useEffect(() => {
        navigation.getParent()?.setOptions({ headerShown: false });
        return () => {
            navigation.getParent()?.setOptions({ headerShown: true });
        };
    }, [navigation]);

    return (
        <View>
            <View style={[styles.posterContainer]}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                    style={styles.poster}
                /></View>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                scrollEventThrottle={16}
            >
                <View >
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.overview}>{movie.overview}</Text>
                </View></ScrollView>
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

