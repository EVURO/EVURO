import { StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Svgs } from '@evuro-frontend/assets';

const GetMapMarkers = ({ handleSearchData, filteredData }) => {
  const markers = handleSearchData?.data
    ? handleSearchData?.data.map((item, index) => {
        return (
          <Marker
            key={index.toString()}
            coordinate={{
              latitude: Number(item?.latitude),
              longitude: Number(item?.longitude),
            }}
            title={item?.name}
            // description={item.description}
          >
            <Svgs.paw />
          </Marker>
        );
      })
    : filteredData?.map((item, index) => {
        return (
          <Marker
            key={index.toString()}
            coordinate={{
              latitude: Number(item.talent?.latitude),
              longitude: Number(item.talent?.longitude),
            }}
            title={item.talent.name}
            // description={item.description}
          >
            <Svgs.paw />
          </Marker>
        );
      });

  return (
    <MapView
      pitchEnabled={false}
      provider={PROVIDER_GOOGLE}
      style={{ height: '100%', width: '100%' }}
      zoomControlEnabled={true}
      initialRegion={{
        latitude: Number(markers[0]?.props.coordinate.latitude),
        longitude: Number(markers[0]?.props.coordinate.longitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {markers}
      {markers.map((marker, index) => (
        <Circle
          key={index.toString()}
          center={marker.props.coordinate}
          radius={700}
          strokeColor="#e5d309"
          fillColor="rgba(255, 255, 0, 0.3)"
        />
      ))}
    </MapView>
  );
};

export default GetMapMarkers;

const styles = StyleSheet.create({});
