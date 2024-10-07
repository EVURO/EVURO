import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icons } from '../../../../components/index';
import { useListMapStyle } from './styles';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';

const ListMap = ({ setActiveTab, activeTab }) => {
  const styles = useListMapStyle({ activeTab });

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => setActiveTab('list')}
        style={styles.listContainer}
      >
        <Icons family="FontAwesome6" name="list" size={metrics.width(30)} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab('map')}
        style={styles.mapContainer}
      >
        <Icons
          family="FontAwesome6"
          name="map-location-dot"
          size={metrics.width(25)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ListMap;
