import React from "react";
import {
    View,
    FlatList,
    StyleSheet,
} from "react-native";

const MoviesScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={[]}
                renderItem={({ item, index }) => <></>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
});

export default MoviesScreen;
