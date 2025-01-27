import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import featReducer from "./slices/featSlice"
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["auth", "feat"]
}

const rootReducer = combineReducers({
  auth: authReducer,
  feat: featReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
export default store