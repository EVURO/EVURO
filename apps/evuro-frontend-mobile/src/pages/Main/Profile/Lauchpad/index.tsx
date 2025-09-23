import { ScrollView, View, Alert } from 'react-native';
import React, { useState } from 'react';
import {
  CustomHeader,
  CustomText,
  Icons,
  MainWrapper,
} from '../../../../components/index';
import { Fonts } from '../../../../assets/fonts';
import { metrics } from '../../../../util/metrics';
import { LaunchpadStyle } from './style';
import {
  useAppSelector,
  useGetLaunchPadByUnAuthUserQuery,
  useGetLaunchPadQuery,
  useLikeLaunchpadMutation,
} from '@evuro-frontend/store';
import CustomImage from '../../../../components/base/CustomImage';
import { Colors } from '@evuro-frontend/assets';
import CustomCommentModal from '../../../../components/modal/CustomCommentModal';
import { useNavigation } from '@react-navigation/native';

const Launchpad = () => {
  const styles = LaunchpadStyle();
  const { loginData } = useAppSelector((state) => state.user);
  const { isVisitor } = useAppSelector((state) => state.user);
  const { data: launchPad, error, refetch } = useGetLaunchPadQuery(null);
  const [like] = useLikeLaunchpadMutation();
  const { data: launchPadByAuth } = useGetLaunchPadByUnAuthUserQuery(null);

  const ProductName = launchPadByAuth?.data?.title;
  const ProductComments = launchPadByAuth?.data?.comments?.length || 0;
  const Productlikes = launchPadByAuth?.data?.likes?.length || 0;
  const ProductImages = launchPadByAuth?.data?.images;
  const ProductDescription = launchPadByAuth?.data?.description;
  const LikesProduct = launchPadByAuth?.data?.likes;

  const navigation = useNavigation();

  const [isCommentModalVisbile, setCommentModalVisible] = useState(false);

  const handleLoginAlert = () => {
    return Alert.alert('Login', 'Please login to access other features.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Login',
        onPress: () => {
          navigation.navigate('LoginModal');
        },
      },
    ]);
  };

  const handleLike = async () => {
    if (isVisitor) {
      handleLoginAlert();
    } else {
      try {
        // dispatch(
        //   LaunchPadApi.util.updateQueryData('getLaunchPad', undefined, (data) => {
        //     data = {};
        //     console.log('-----data', data);
        //     return data;
        //   })
        // );

        const res = await like(null);
        if (res) {
          console.log('liked api called---', res);
        }
      } catch (error) {
        console.log('error=====', error);
      }
    }
  };

  return (
    <MainWrapper>
      <ScrollView>
        <CustomHeader onBackHeader={true} headerTitle="Launchpad" Spacer />
        <View style={styles.productContainer}>
          <CustomText
            label={ProductName ? ProductName : 'Product Name'}
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
          <View style={styles.iconsContainer}>
            <Icons
              onPress={() => {
                if (isVisitor) {
                  handleLoginAlert();
                } else {
                  setCommentModalVisible(true);
                }
              }}
              size={metrics.width(30)}
              style={styles.commentIcon}
              family={'Ionicons'}
              name={'chatbubble-outline'}
              color={Colors.lightGray}
            />
            <CustomText
              marginLeft={metrics.width(20)}
              marginRight={metrics.width(35)}
              label={
                launchPad?.data?.launchPad?.totalComments || ProductComments
              }
              fontSize={22}
              color={Colors.lightGray}
            />
            <Icons
              onPress={handleLike}
              size={metrics.width(30)}
              family={'Ionicons'}
              name={
                launchPad?.data?.launchPad?.liked || LikesProduct
                  ? 'heart'
                  : 'heart-outline'
              }
              color={
                launchPad?.data?.launchPad?.liked || LikesProduct
                  ? Colors.red
                  : Colors.lightGray
              }
            />
            <CustomText
              marginLeft={metrics.width(20)}
              label={launchPad?.data.launchPad?.totalLikes || Productlikes}
              fontSize={22}
              color={
                launchPad?.data?.launchPad?.liked
                  ? Colors.black
                  : Colors.lightGray
              }
            />
          </View>
          <CustomCommentModal
            visible={isCommentModalVisbile}
            commentLikeOptions={false}
            onClose={() => setCommentModalVisible(false)}
            userData={loginData}
            comments={launchPad?.data?.launchPad?.comments}
            id={launchPad?.data?.launchPad?._id}
          />
          <View style={styles.imagesSection}>
            {ProductImages
              ? ProductImages.map((image, index) => (
                  <View
                    key={index}
                    style={{
                      ...styles.imageBox,
                      backgroundColor:
                        index === 0
                          ? Colors.cherishedOne
                          : index === 1
                          ? Colors.mildMenthol
                          : index === 2
                          ? Colors.glitchyShaderBlue
                          : Colors.lavenderFragrance,
                      borderTopRightRadius:
                        index === 0
                          ? 25
                          : index === 1
                          ? 35
                          : index === 2
                          ? 50
                          : 0,
                      borderTopLeftRadius:
                        index === 0 ? 0 : index === 1 ? 35 : 0,
                      borderBottomLeftRadius: index === 2 ? 50 : 0,
                    }}
                  >
                    <View style={styles.imageContainer}>
                      <CustomImage style={styles.image} url={image} />
                    </View>
                  </View>
                ))
              : Array.from({ length: 4 }).map((_, index) => {
                  const image = launchPad?.data?.launchPad?.images?.[index];
                  return (
                    <View
                      key={index}
                      style={{
                        ...styles.imageBox,
                        backgroundColor:
                          index === 0
                            ? Colors.cherishedOne
                            : index === 1
                            ? Colors.mildMenthol
                            : index === 2
                            ? Colors.glitchyShaderBlue
                            : Colors.lavenderFragrance,
                        borderTopRightRadius:
                          index === 0
                            ? 25
                            : index === 1
                            ? 35
                            : index === 2
                            ? 50
                            : 0,
                        borderTopLeftRadius:
                          index === 0 ? 0 : index === 1 ? 35 : 0,
                        borderBottomLeftRadius: index === 2 ? 50 : 0,
                      }}
                    >
                      <View style={styles.imageContainer}>
                        <CustomImage style={styles.image} url={image} />
                      </View>
                    </View>
                  );
                })}
          </View>
        </View>

        <View style={styles.descriptionHeader}>
          <CustomText
            label="Description"
            fontFamily={Fonts.Medium}
            fontSize={20}
          />
          <CustomText
            fontSize={14}
            label={
              launchPad?.data?.launchPad?.description || ProductDescription
            }
          />
        </View>
      </ScrollView>
    </MainWrapper>
  );
};

export default Launchpad;
