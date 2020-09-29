import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import reducers from './combinatedReducers'
import { createStore, applyMiddleware } from 'redux';

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, reducers)

const initialState = {}
const middleware = [thunk]

let store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
let persistor = persistStore(store)
export { store, persistor }