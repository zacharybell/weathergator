declare module 'ol-geocoder' {
    import Control from 'ol/control/Control';
    import Style from 'ol/style/Style';
    import { Coordinate } from 'ol/coordinate';

    class Geocoder extends Control {
        constructor(type: string, options: Options);
    }

    export interface Options {
        provider?: string;
        key?: string;
        autoComplete?: boolean;
        autoCompleteMinLength?: number;
        autoCompleteTimeout?: number;
        placeholder?: string;
        targetType?: string;
        featureStyle?: Style;
        lang?: string;
        limit?: number;
        countrycodes?: string;
        keepOpen?: boolean;
        preventDefault?: boolean;
        debug?: boolean;
    }

    export interface AddressEvent {
        coordinate: Coordinate;
    }

    export default Geocoder;
}
