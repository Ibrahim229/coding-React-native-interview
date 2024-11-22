import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MovieDetailsNavigationProp } from "../types/navProps";


interface Props {
    movie: {
        id: number;
        title: string;
        overview: string;
        poster_path: string;
    };
}


const MovieRow = ({ movie }: Props) => {
    const navigation = useNavigation<MovieDetailsNavigationProp>();


    return (
        <View>
            <TouchableOpacity
                style={styles.movieCard}
                onPress={() => navigation.navigate("MovieDetails", { movie })}
            >
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    }}
                    style={styles.poster}
                />
                <Text style={styles.title}>{movie.title}</Text>
            </TouchableOpacity></View>
    );
};

const styles = StyleSheet.create({
    movieCard: {
        position: "relative",
        marginBottom: 20,
        borderRadius: 15,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    poster: {
        width: "100%",
        height: 250,
        borderRadius: 15,
    },
    title: {
        position: "absolute",
        bottom: 10,
        left: 10,
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default MovieRow;
