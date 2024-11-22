import React, { useEffect } from "react";
import {Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {MovieDetailsNavigationProp } from "../types/navProps";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";


interface Props {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
  };
  index: number;
}


const MovieRow: React.FC<Props> = ({ movie, index }) => {
  const navigation = useNavigation<MovieDetailsNavigationProp>();
  // animation
  // Shared values for animation
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 500 }),
    transform: [
      {
        translateY: withTiming(translateY.value, { duration: 500 }),
      },
    ],
  }));

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
  }, [opacity, translateY, index]);


  return (
    <Animated.View style={[animatedStyle]}>
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
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.gradient}
        />
        <Text style={styles.title}>{movie.title}</Text>
      </TouchableOpacity></Animated.View>
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
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0,
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
