
import CartWishlist from './controllers/CartWishlist'
import { configureStore } from '@reduxjs/toolkit'
import UserAccount from './controllers/UserAccount'
// ...

export const store = configureStore({
  reducer: {
    cartWishlist:CartWishlist,
    userState:UserAccount,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch