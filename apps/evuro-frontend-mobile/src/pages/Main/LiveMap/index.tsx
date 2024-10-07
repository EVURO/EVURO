import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const LiveLocationTracking = ({ route }) => {
  const location = route?.params?.location;
  // console.log('location===', location);

  const [startLocation, setStartLocation] = useState({
    latitude: 33.567,
    longitude: 73.5,
  });
  const [endLocation, setEndLocation] = useState({
    latitude: 33.567,
    longitude: 73.5,
  });
  const [region, setRegion] = useState({
    latitude: startLocation.latitude,
    longitude: startLocation.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const [isWalking, setIsWalking] = useState(false);
  const [coordinates, setCoordinates] = useState([startLocation]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isWalking) {
      intervalId = setInterval(() => {
        // Simulate walking by updating the map every second
        const newCoordinates = [...coordinates];
        const lastCoordinate = newCoordinates[newCoordinates.length - 1];
        const nextCoordinate = {
          latitude: lastCoordinate.latitude + 0.0001,
          longitude: lastCoordinate.longitude + 0.0001,
        };
        setCount(count + 1);
        newCoordinates.push(nextCoordinate);
        setCoordinates(newCoordinates);
        setRegion({
          latitude: nextCoordinate.latitude,
          longitude: nextCoordinate.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        });

        // Stop walking when reaching the end location
        if (
          Math.abs(nextCoordinate.latitude - endLocation.latitude) < 0.0001 &&
          Math.abs(nextCoordinate.longitude - endLocation.longitude) < 0.0001
        ) {
          setIsWalking(false);
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isWalking, coordinates]);

  const handleStartWalk = () => {
    setIsWalking(true);
  };

  const handleStopWalk = () => {
    setIsWalking(false);
  };

  const handleResetWalk = () => {
    setIsWalking(false);
    setCount(0);
    setCoordinates([startLocation]);
    setRegion({
      latitude: startLocation.latitude,
      longitude: startLocation.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        zoomControlEnabled={true}
        style={{ height: '90%', width: '100%' }}
        region={region}
      >
        <Marker coordinate={startLocation} title="Start Location" />
        <Marker
          coordinate={coordinates[coordinates.length - 1]}
          title="Current Location"
        />
        <Marker coordinate={endLocation} title="End Location" />
        <Polyline
          coordinates={coordinates}
          strokeWidth={2}
          strokeColor="#3498db"
        />
      </MapView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          title={isWalking ? 'Walking...' : 'Start Walk'}
          onPress={handleStartWalk}
          disabled={isWalking}
        />
        <Button
          title="Stop Walk"
          onPress={handleStopWalk}
          disabled={!isWalking}
        />
        <Button title="Reset Walk" onPress={handleResetWalk} />
      </View>
      <Text style={{ fontSize: 20, color: 'black' }}>{count}</Text>
    </View>
  );
};

export default LiveLocationTracking;
