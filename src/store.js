import  { composeWithDevTools} from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import thunk from "redux-thunk";
import root from "./reducers/root";
import { createStore, applyMiddleware } from "redux";

/**
 *  Used with the PersistGate component to sync the Redux store with localStorage. 
 * 
 * key specifies that everything in the root reducer persists in the persistent state
 * the stateReconciler setting shows two shallow copies merging data
 * 
 * the persistReducer takes the configuration object and root which is then shared with the
 * redux store  
 */

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, root);


export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

export const persistedStore = persistStore(store);

