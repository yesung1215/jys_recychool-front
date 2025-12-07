import { createStore } from 'redux';
import rootReducer from './modules';

// Redux DevTools 지원 (개발 환경에서만)
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

