import {createStore, combineReducers, applyMiddleware} from 'redux'
import { reducer as formReducer } from 'redux-form'



import homepageReduser from './homepage-reduser';
import editpageReduser from './editpage-reduser';

import thunkMiddleware from 'redux-thunk';


let reducers = combineReducers({
    homepage: homepageReduser,
    editPage: editpageReduser,
    form: formReducer
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));


export default store;