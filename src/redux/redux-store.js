import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { reducer as formReducer } from 'redux-form'




import homepageReduser from './homepage-reduser';
import editpageReduser from './editpage-reduser';

import thunkMiddleware from 'redux-thunk';


let reducers = combineReducers({
    homepage: homepageReduser,
    editPage: editpageReduser,
    form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
    ));
// let store = createStore( reducers, applyMiddleware(thunkMiddleware) );


export default store;