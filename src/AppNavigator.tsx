import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/home/HomeScreen";
import MoviesScreen from "./screens/movies/MoviesScreen";
import MovieDetailsScreen from "./screens/movies/MovieDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MoviesStackParamList } from "./types/navProps";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<MoviesStackParamList>();

// Nested Stack Navigator for Movies
const MoviesStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Movies" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Movies" component={MoviesScreen} />
            <Stack.Screen
                name="MovieDetails"
                component={MovieDetailsScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

// Main Drawer Navigator
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="MoviesDrawer" component={MoviesStackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
