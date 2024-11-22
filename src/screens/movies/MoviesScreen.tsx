import React from "react";
import {
    View,
    FlatList,
    StyleSheet,
} from "react-native";
import { Movie } from "../../api/moviesApi";
import MovieRow from "../../components/MovieRow";

const MoviesScreen = () => {
    return (

        <View style={styles.container}>
            <FlatList
                data={mockMovies}
                renderItem={({ item, index }) => <MovieRow movie={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
});

export default MoviesScreen;

const mockMovies: Movie[] = [
    {
        id: 1,
        title: "Inception",
        overview: "A skilled thief is given a chance at redemption if he can successfully perform inception: planting an idea into someone's subconscious.",
        poster_path: "/inception-poster.jpg",
        release_date: "2010-07-16",
        genre_ids: [28, 878, 12],
        vote_average: 8.8,
    },
    {
        id: 2,
        title: "The Shawshank Redemption",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        poster_path: "/shawshank-redemption-poster.jpg",
        release_date: "1994-09-22",
        genre_ids: [18, 80],
        vote_average: 9.3,
    },
    {
        id: 3,
        title: "The Dark Knight",
        overview: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on Gotham City.",
        poster_path: "/dark-knight-poster.jpg",
        release_date: "2008-07-18",
        genre_ids: [28, 80, 18],
        vote_average: 9.0,
    },
    {
        id: 4,
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster_path: "/interstellar-poster.jpg",
        release_date: "2014-11-07",
        genre_ids: [12, 18, 878],
        vote_average: 8.6,
    },
    {
        id: 5,
        title: "The Godfather",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster_path: "/godfather-poster.jpg",
        release_date: "1972-03-24",
        genre_ids: [18, 80],
        vote_average: 9.2,
    },
];
