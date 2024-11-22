import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovies, Movie } from "../api/moviesApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MoviesState {
  items: Movie[];
  filteredItems: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  searchQuery: string;
  genre: string;
  lastFetched: number | null;
}

const CACHE_KEY = "moviesCache";
const CACHE_EXPIRATION = 1000 * 60 * 5; // 5 minutes

const initialState: MoviesState = {
  items: [],
  filteredItems: [],
  status: "idle",
  searchQuery: "",
  genre: "",
  lastFetched: null,
};

export const loadMovies = createAsyncThunk("movies/loadMovies", async (_, thunkAPI) => {

  const cachedData = await AsyncStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { items, lastFetched } = JSON.parse(cachedData);
    const now = Date.now();
    console.log(lastFetched)

    if (lastFetched && now - lastFetched < CACHE_EXPIRATION) {
      return { items, cached: true };
    }
  }
  const items = await fetchMovies();
  await AsyncStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ items, lastFetched: Date.now() })
  ); // Cache the fetched data
  return { items, cached: false };
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      filterMovies(state); 
    },
    setGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
      filterMovies(state); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadMovies.fulfilled, (state, action: PayloadAction<{ items: Movie[]; cached: boolean }>) => {
        state.status = "succeeded";
        console.log(action.payload.cached)
        if (!action.payload.cached) {
          state.lastFetched = Date.now(); 
        }

        state.items = action.payload.items;
        filterMovies(state); 
      })
      .addCase(loadMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const filterMovies = (state: MoviesState) => {
  let filtered = state.items;

  if (state.searchQuery.trim()) {
    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  if (state.genre) {
    filtered = filtered.filter((movie) => movie.genre_ids.includes(Number(state.genre)));
  }

  state.filteredItems = filtered;
};

export const { setSearchQuery, setGenre } = moviesSlice.actions;

export default moviesSlice.reducer;
