import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { Card, Row } from "reactstrap";
const {
  StandaloneSearchBox,
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const MapWrapper = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={
        props.markers.length > 0 && {
          lat: props.markers[0].lat,
          lng: props.markers[0].lng,
        }
      }
      defaultOptions={{
        scrollwheel: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
          },
        ],
      }}
    >
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        onPlacesChanged={(e) => {
          props.onPlacesChanged();
        }}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            zIndex: 999,
            position: "relative",
            bottom: 590,
            right: -200,
          }}
        />
      </StandaloneSearchBox>
      {props.markers &&
        props.markers.map((marker, i) => {
          return (
            <Marker
              key={i}
              draggable
              onDragEnd={({ latLng }) => props.onDragEnd(i, latLng)}
              position={{ lat: marker.lat, lng: marker.lng }}
              label={marker.name}
              onClick={() => props.onMarkerClick(i)}
            />
          );
        })}
    </GoogleMap>
  ))
);

export default (props) => {
  const refs = {};

  const onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
  };

  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces();
    props.onPlaceSelected({
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng(),
    });
  };

  const onDragEnd = (i, latLng) => {
    const newCoordinate = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    props.onDragEnd(i, newCoordinate);
  };

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow border-0">
            <MapWrapper
              googleMapURL={`https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&key=${process.env.REACT_APP_GMAPS_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div
                  style={{ height: `600px` }}
                  className="map-canvas"
                  id="map-canvas"
                />
              }
              mapElement={
                <div style={{ height: `100%`, borderRadius: "inherit" }} />
              }
              onPlacesChanged={onPlacesChanged}
              onSearchBoxMounted={onSearchBoxMounted}
              onDragEnd={onDragEnd}
              markers={props.markers}
              onMarkerClick={props.onMarkerClick}
            />
          </Card>
        </div>
      </Row>
    </>
  );
};
