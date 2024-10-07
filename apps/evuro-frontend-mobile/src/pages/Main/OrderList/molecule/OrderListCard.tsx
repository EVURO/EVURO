import { Animated, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../../util/metrics';
import {
  CustomButton,
  CustomImage,
  CustomText,
  Icons,
} from '../../../../components/index';
import { Fonts } from '../../../../assets/fonts';
import { useOrderListCardStyle } from './styles';

const OrderListCard = ({
  TrackNo,
  PaymentStatus,
  Status,
  orderDetails,
  totalPrice,
}) => {
  const order = orderDetails?.find((item) => ({
    orderID: item?._id,
  }));

  console.log('orderDetails===', orderDetails);

  const FlatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showMore, setShowMore] = useState(false);

  const styles = useOrderListCardStyle();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.txtContainer}>
        <CustomText label={TrackNo} fontSize={15} />
        <CustomText
          label={PaymentStatus}
          fontSize={15}
          color={Colors.lightGray}
          fontStyle="italic"
        />
      </View>

      <Animated.View
        style={{
          backgroundColor: Colors.lightGray,
          width: '100%',
          borderRadius: 10,
          height: metrics.height(220),
          alignSelf: 'center',
          margin: metrics.width(10),
          overflow: 'hidden',
        }}
      >
        <Animated.FlatList
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={orderDetails}
          ref={FlatListRef}
          onMomentumScrollEnd={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Number((x / metrics.screenWidth)?.toFixed(0)));
          }}
          initialScrollIndex={0}
          pagingEnabled
          keyExtractor={(post, i) => i.toString()}
          renderItem={({ item, index }) => {
            return (
              <CustomImage
                useModel
                url={item?.product?.productImage}
                style={{
                  width: metrics.screenWidth - metrics.width(80),
                  height: metrics.height(220),
                  borderRadius: 10,
                }}
              />
            );
          }}
        />
      </Animated.View>
      {orderDetails?.length > 1 && (
        <View
          style={{
            alignSelf: 'flex-end',
            zIndex: 22,
            backgroundColor: ' rgba(0, 0, 0, 0.5)',
            borderRadius: 30,
            paddingHorizontal: metrics.width(15),
            paddingVertical: metrics.width(3),
          }}
        >
          <CustomText
            label={`${currentIndex + 1}/${orderDetails?.length}`}
            color={Colors.white}
            fontFamily={Fonts.Medium}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: orderDetails.length > 1 && metrics.height(-30),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          {orderDetails.length > 1 ? (
            Array(orderDetails.length)
              .fill('')
              .map((it, index) => {
                return (
                  <View key={index}>
                    {currentIndex === index ? (
                      <Icons
                        family={'Entypo'}
                        name="dot-single"
                        color={Colors.black}
                        size={24}
                      />
                    ) : (
                      <Icons
                        family={'Entypo'}
                        name="dot-single"
                        color={Colors.lightGray}
                        size={24}
                      />
                    )}
                  </View>
                );
              })
          ) : (
            <View />
          )}
        </View>
      </View>

      {orderDetails.map((order, index) => {
        return (
          currentIndex == index && (
            <CustomText
              label={order?.product?.productName}
              fontSize={16}
              fontFamily={Fonts.Medium}
            />
          )
        );
      })}

      {orderDetails.map(
        (order, index) =>
          currentIndex === index && (
            <View
              key={index}
              style={{
                // marginHorizontal: metrics.width(10),
                marginVertical: metrics.height(15),
              }}
            >
              {order?.product?.productDescription?.length > 50 ? (
                <CustomText
                  fontSize={12}
                  fontFamily={Fonts.Regular}
                  color={Colors.black}
                  label={
                    !showMore
                      ? `${order?.product?.productDescription?.substring(
                          0,
                          50
                        )}..... `
                      : order?.product?.productDescription
                  }
                />
              ) : (
                <CustomText label={order?.product?.productDescription} />
              )}
              {order?.product?.productDescription?.length > 50 &&
                (!showMore ? (
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      // marginTop: metrics.height(-18),
                    }}
                  >
                    <CustomText
                      label="show more"
                      fontFamily={Fonts.Medium}
                      onPress={() => {
                        setShowMore(true);
                      }}
                    />
                  </View>
                ) : (
                  <View style={{ alignSelf: 'flex-end' }}>
                    <CustomText
                      label="show less"
                      fontFamily={Fonts.Medium}
                      onPress={() => {
                        setShowMore(false);
                      }}
                    />
                  </View>
                ))}
            </View>
          )
      )}

      {orderDetails.map(
        (order, index) =>
          currentIndex == index && (
            <View key={index}>
              <CustomText
                label={`Price: $${order?.price}`}
                fontSize={14}
                fontFamily={Fonts.Medium}
              />
              <CustomText
                label={`Quantity: ${order?.quantity}`}
                fontSize={14}
                fontFamily={Fonts.Medium}
              />
            </View>
          )
      )}

      <CustomText
        label={Status}
        fontSize={14}
        color={Colors.lightGray}
        fontStyle="italic"
        alignSelf="flex-end"
      />
      <CustomText
        label={`${
          orderDetails.length > 1
            ? `${orderDetails.length} Items`
            : `${orderDetails.length} Item`
        } , total : $ ${totalPrice}`}
        fontSize={14}
        alignSelf="flex-end"
        marginTop={metrics.height(5)}
        fontFamily={Fonts.Medium}
        marginBottom={metrics.height(20)}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CustomText
          onPress={() => alert('Comming Soon...')}
          label="Add Review"
          fontSize={15}
          color={Colors.darkBlue}
          fontFamily={Fonts.Medium}
        />
        <CustomButton
          onPress={() => alert('Commong Soon...')}
          title="Buy Again"
          width="50%"
          borderRadius={15}
          height={40}
        />
      </View>
    </View>
  );
};

export default OrderListCard;
