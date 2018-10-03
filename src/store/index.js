import { createStore, applyMiddleware, compose } from 'C:/Users/hemkant.gangurde/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';
import Thunk from 'redux-thunk';
import reducers from '../reducers';

export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(Thunk))
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
