import { configureStore } from '@reduxjs/toolkit'
import peopleSlice from "./slices/people/peopleSlice";

export const store = configureStore({
    reducer: {
        people: peopleSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch