import { FlatList, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { Colors } from '@evuro-frontend/assets';
import { useWalkHistoryStyle } from '../../pages/Main/WalkHistory/style';
import { Fonts } from '../../assets/fonts';

const StatusTab = ({ setActiveTab, activeTab, isWalk, refetchData }) => {
  // console.log('refetchData===', refetchData);

  const styles = useWalkHistoryStyle();

  const array = [
    {
      id: 1,
      title: 'Pending',
    },
    {
      id: 2,
      title: 'In Progress',
    },
    {
      id: 3,
      title: 'Completed',
    },
    ...(isWalk
      ? [
          {
            id: 4,
            title: 'Reject',
          },
        ]
      : []),
  ];

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabInnerContainer}>
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={array}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  refetchData();
                  setActiveTab(index);
                }}
                style={[
                  styles.tabTextContainer,
                  {
                    backgroundColor:
                      index === activeTab ? Colors.darkBlue : Colors.white,
                  },
                ]}
              >
                <CustomText
                  label={item.title}
                  color={index === activeTab ? Colors.white : Colors.darkGray}
                  fontSize={14}
                  fontFamily={
                    index === activeTab ? Fonts.Medium : Fonts.Regular
                  }
                />
              </TouchableOpacity>
            );
          }}
        /> */}
        {array.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setActiveTab(index);
              }}
              style={[
                styles.tabTextContainer,
                {
                  backgroundColor:
                    index === activeTab ? Colors.darkBlue : Colors.white,
                },
              ]}
            >
              <CustomText
                label={item.title}
                color={index === activeTab ? Colors.white : Colors.darkGray}
                fontSize={14}
                fontFamily={index === activeTab ? Fonts.Medium : Fonts.Regular}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StatusTab;
