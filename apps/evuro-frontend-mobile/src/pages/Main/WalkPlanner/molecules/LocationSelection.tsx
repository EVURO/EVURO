import { Colors } from '@evuro-frontend/assets';
import React, { useState, useEffect } from 'react';
import GooglePlacesInput from '../../../../components/base/GooglePlacesInput';

interface LocationSelectionProps {
  location: object;
  setLocation?: () => void;
  editable?: boolean;
}

const LocationSelection: React.FC<LocationSelectionProps> = ({
  location,
  setLocation = () => {},
  editable,
}) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (address !== '') {
      setLocation({ ...location, address: address });
    }
  }, [address]);

  const handleLatLng = (details) => {
    if (details && details?.geometry && details?.geometry?.location) {
      const lat = details?.geometry?.location?.lat;
      const lng = details?.geometry?.location?.lng;
      setLocation({ ...location, latitude: lat, longitude: lng });
    } else {
      console.log('Invalid details object or missing location information');
      alert('Location is required');
    }
  };
  return (
    <GooglePlacesInput
      value={address}
      onChange={(address) => {
        setAddress(address);
      }}
      // address={address}
      // setAddress={setAddress}
      onPress={(data, details) => {
        handleLatLng(details);
      }}
      borderColor={Colors.lightGray}
      placeholder="Enter location for pet"
      editable={editable}
    />
  );
};

export default LocationSelection;
