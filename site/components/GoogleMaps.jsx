import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import AppData from "../app";

import MapStyle from "../map";

const AnyReactComponent = ({ text }) => {
    return (
        <div className="map-marker">
            <div className="font-weight-bold">DekoraUSA</div>
            <div>12011 SW 129 CT</div>
            <div>Miami, FL 33185</div>
        </div>
    )
};

function createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
        scrollwheel: false,
        styles: MapStyle
    };
}

class GoogleMap extends Component {
    static defaultProps = {
        center: {
            lat: 25.655742,
            lng: -80.403703
        },
        zoom: 14
    };

    render() {
        return (
            <div style={{ height: '500px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: AppData.mapsApiKey }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={25.655742}
                        lng={-80.403703}
                        text="My Marker"
                        style={{display:'block',backgroundColor: 'white',color:'white'}}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMap;