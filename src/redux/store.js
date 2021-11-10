import { createStore, compose } from 'redux';
import rootReducer from './index';

const store = compose(
    window.devToolsExtension && window.devToolsExtension(),
  )(createStore)(rootReducer);

export default store;