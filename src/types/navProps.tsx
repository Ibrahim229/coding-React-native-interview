import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type MoviesStackParamList = {
    Movies: undefined; // No parameters for the Movies screen
    MovieDetails: { movie: { id: number; title: string; overview: string; poster_path: string } };
};

// Navigation and Route types
export type MovieDetailsNavigationProp = StackNavigationProp<MoviesStackParamList, "MovieDetails">;
export type MovieDetailsRouteProp = RouteProp<MoviesStackParamList, "MovieDetails">;

