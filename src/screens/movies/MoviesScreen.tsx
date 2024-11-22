import React, { useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import Icon
import { useDispatch, useSelector } from "react-redux";
import ActionSheet from "react-native-actionsheet";
import { loadMovies, setSearchQuery, setGenre } from "../../redux/moviesSlice";
import { AppDispatch, RootState } from "../../redux/store";
import MovieRow from "../../components/MovieRow";

const MoviesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, status } = useSelector((state: RootState) => state.movies);

  const actionSheetRef = useRef<ActionSheet>(null);

  const genres = [
    "All Genres",
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Cancel",
  ];
  const genreValues = ["", "28", "35", "18", "27"];

  useEffect(() => {
    dispatch(loadMovies());
  }, [dispatch]);

  const handleFilterPress = () => {
    actionSheetRef.current?.show();
  };

  const handleActionSheetSelect = (index: number) => {
    if (index !== genres.length - 1) {
      dispatch(setGenre(genreValues[index]));
    }
  };



  if (status === "loading") {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          onChangeText={(query) => dispatch(setSearchQuery(query))}
        />
        <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
          <Icon name="filter-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ActionSheet
        ref={actionSheetRef}
        title={"Select Genre"}
        options={genres}
        cancelButtonIndex={genres.length - 1}
        onPress={handleActionSheetSelect}
      />

      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={({ item, index }) => <MovieRow movie={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noResults}>No movies found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  noResults: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#999" },
});

export default MoviesScreen;
