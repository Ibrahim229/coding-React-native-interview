import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovies, Movie } from "../api/moviesApi";

interface MoviesState {
  items: Movie[];
  filteredItems: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  searchQuery: string;
  genre: string;
}



const initialState: MoviesState = {
  items: [],
  filteredItems: [],
  status: "idle",
  searchQuery: "",
  genre: "",
};

export const loadMovies = createAsyncThunk("movies/loadMovies", async (_, thunkAPI) => {
  const items = await fetchMovies();
  return { items };
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
      .addCase(loadMovies.fulfilled, (state, action: PayloadAction<{ items: Movie[]; }>) => {
        state.status = "succeeded";
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
