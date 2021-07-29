import { DateTime } from 'luxon';
import { Coordinate } from 'ol/coordinate';
import React, { useState } from 'react';
import MapContainer from './MapContainer';

import './style.css';
import WeatherContainer from './WeatherContainer';

const App = () => {
    return (
        <div>
            <MapContainer />
            <WeatherContainer />
        </div>
    );
};

export default App;
