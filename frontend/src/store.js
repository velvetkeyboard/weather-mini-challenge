import { createStore } from 'redux';
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'weatherApp',
  storage
}

const persistRootReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistRootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     );

const persistor = persistStore(store);
export { store, persistor };
// export default store;