import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import { Coordinate } from 'ol/coordinate';

import Geocoder, { AddressEvent } from 'ol-geocoder';
import { Coordinates, setLocation } from './redux/features/location';

export function createMap(
    updateCoordinates: (coordinates: Coordinates) => void
) {
    const markers = new SourceVector();
    const geocoder = createGeocoder();

    const map = new Map({
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
            new LayerVector({
                source: markers,
                style: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: IconAnchorUnits.FRACTION,
                        anchorYUnits: IconAnchorUnits.PIXELS,
                        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                    }),
                }),
            }),
        ],
        view: new View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 1,
        }),
        controls: [geocoder],
    });

    function updateMarker(coordinate: Coordinate) {
        markers.clear();
        markers.addFeature(createMarker(coordinate));
        const coordinates: Coordinates = {
            latitude: coordinate[1],
            longitude: coordinate[0],
        };

        updateCoordinates(coordinates);
    }

    map.on('singleclick', ({ coordinate }) => {
        updateMarker(coordinate);
    });

    geocoder.on('addresschosen', (evt: AddressEvent) => {
        const view = map.getView();
        view.setCenter(evt.coordinate);
        view.setZoom(15);

        updateMarker(evt.coordinate);
    });

    return map;
}

function createMarker(coordinate: Coordinate) {
    const feature = new Feature({
        geometry: new Point(coordinate),
        name: 'Somewhere near Nottingham',
    });

    feature.setStyle(
        new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.PIXELS,
                src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            }),
        })
    );
    return feature;
}

function createGeocoder() {
    const geocoder = new Geocoder('nominatim', {
        provider: 'osm',
        lang: 'en-US', //en-US, fr-FR
        placeholder: 'Search for ...',
        targetType: 'text-input',
        limit: 7,
        keepOpen: true,
        preventDefault: true,
        autoComplete: true,
    });

    return geocoder;
}
