import React, { useEffect, useRef } from 'react';

import { createMap } from './maps';

import { useAppDispatch } from './redux/hooks';
import { Coordinates, setLocation } from './redux/features/location';

export default function MapContainer() {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const updateCoordinates = (coordinates: Coordinates) => {
        dispatch(setLocation(coordinates));
    };

    useEffect(() => {
        const map = createMap(updateCoordinates);
        map.setTarget(ref.current!);
    }, []);

    return <div className="map-container" ref={ref}></div>;
}
