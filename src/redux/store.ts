import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './features/location';
import weatherReducer from './features/weather';

const store = configureStore({
    reducer: {
        locations: locationReducer,
        weather: weatherReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
