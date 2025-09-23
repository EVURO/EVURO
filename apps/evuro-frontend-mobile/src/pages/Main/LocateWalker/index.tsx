import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView

} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors, Svgs } from '@evuro-frontend/assets';
import HeaderMolecule from './molecules';
import { useLocateWalkerStyle } from './style';
import { metrics } from '../../../util/metrics';
import { CustomText, Icons } from '../../../components/index';
import { useAppSelector } from '@evuro-frontend/store';
import SocketServices from '../../../util/Halper/socketService';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';

import { PermissionsAndroid, Platform } from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';



const LocateWalker = ({ route }) => {
  const appId = '157be9e8c72f4492939052f81e0ec6fd';
  const channelName = 'abc12345678910';
  const token = '007eJxSYNjAtUz3V+b02c8+FTJpC18o4NQPadoxsfgW67LNHvYbnzMrMBiamielWqZaJJsbpZmYWBpZGlsamBqlWRimGqQmm6WlnLk4KXVBGyPDiWNzWRgZGBlYGBgZQHwmMMkMJlnAJB9DYlKyoZGxiamZuYWloQELg7GBsQEgAAD//8d+Jsk=';
  const uid = 3030;

  const { loginData } = useAppSelector((state) => state.user);
  // console.log('loginData=====', loginData?.data?.userType);
  const userType = loginData?.data?.userType;
  const ownerData = route?.params?.ownerData;
  const walkerData = route?.params?.walkerData;
  // console.log('ownerData=======', ownerData);

  const flatListRef = useRef(null);
  const styles = useLocateWalkerStyle();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [currentSender, setCurrentSender] = useState(loginData?.data?._id);



  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };



  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(""); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user



  console.log("message", message, remoteUid, isJoined)
  function showMessage(msg: string) {
    setMessage(msg);
  }

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') { await getPermission() };
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          console.log("===connection", _connection, Uid)
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };


  const markers = [
    {
      id: 'user1',
      coordinate: {
        latitude: Number(
          loginData?.data?.latitude ? loginData?.data?.latitude : 33.456
        ),
        longitude: Number(
          loginData?.data?.longitude ? loginData?.data?.longitude : 73.4
        ),
      },
      title: loginData?.data?.name,
      description: 'Location : United state , New Yourk',
    },
    {
      id: 'user2',
      coordinate: {
        latitude: Number(
          walkerData?.latitude
            ? walkerData?.latitude
            : ownerData
              ? ownerData?.latitude
              : 34.567
        ),
        longitude: Number(
          walkerData?.longitude
            ? walkerData?.longitude
            : ownerData
              ? ownerData?.longitude
              : 45.4
        ),
      },
      title: 'Walker Name',
      description: 'Location : United state , New Yourk',
    },
  ];

  useEffect(() => {
    SocketServices.initializeSocket();
  }, []);

  useEffect(() => {
    const handleMessage = (message) => {
      // console.log('message====', message);

      setMessages((prevMessages) => [...prevMessages, message]);
      flatListRef.current?.scrollToEnd({ animated: true });
    };

    SocketServices.on('message', handleMessage);

    return () => {
      SocketServices.removeListener('message');
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newSender =
        currentSender === loginData?.data?._id
          ? walkerData?._id
          : ownerData
            ? ownerData?._id
            : loginData?.data?._id;

      setCurrentSender(newSender);
      setInputText('');
      flatListRef.current.scrollToEnd({ animated: true });

      SocketServices.emit('message', {
        text: inputText,
        senderId: loginData?.data?._id,
        receiverId: ownerData ? ownerData?._id : walkerData?._id,

        // receiverId: walkerData?.dogWalker,
      });
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };


  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      setIsJoined(true)
    } catch (e) {
      console.log(e);
    }
  };


  // console.log('ownerData===', ownerData);

  return (
    <SafeAreaView style={{
      flex: 1,

    }}>
      <Text style={{
        fontSize: 20
      }}>Agora Video Calling Quickstart</Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Text onPress={join} style={{
          paddingHorizontal: 25,
          paddingVertical: 4,
          fontWeight: 'bold',
          color: '#ffffff',
          backgroundColor: '#0055cc',
          margin: 5,
        }}>
          Join
        </Text>
        <Text onPress={leave} style={{
          paddingHorizontal: 25,
          paddingVertical: 4,
          fontWeight: 'bold',
          color: '#ffffff',
          backgroundColor: '#0055cc',
          margin: 5,
        }}>
          Leave
        </Text>
      </View>
      <ScrollView
        style={{

          width: '100%',
          flex: 1,
          backgroundColor: "yellow"
        }}
      >
        {isJoined ? (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{ uid: 0 }} style={{
              width: '90%', height: 200
            }} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{ uid: remoteUid }}
              style={{
                width: '90%', height: 300
              }}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>Waiting for a remote user to join</Text>
        )}
        <Text style={{
          color: 'green'
        }}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
    // <SafeAreaView style={styles.mainContainer}>
    //   <StatusBar backgroundColor="#015A7E94" barStyle="light-content" />
    //   {(userType === 'Dog Parent' && walkerData === undefined) ||
    //     walkerData === null ? (
    //     <View
    //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    //     >
    //       <CustomText
    //         label="Data Not Found"
    //         color={Colors.red}
    //         fontSize={15}
    //         fontFamily={Fonts.Medium}
    //       />
    //     </View>
    //   ) : (
    //     <>
    //       <HeaderMolecule
    //         onVideoCall={() => alert('Comming Soon')}
    //         onAudioCall={() => alert('Comming Soon')}
    //         image={walkerData?.profileImage || ownerData?.profileImage}
    //         title={walkerData?.name || ownerData?.name}
    //       />

    //       {/* Map */}

    //       <View style={showMap && styles.container}>
    //         <TouchableOpacity
    //           onPress={() => {
    //             setShowMap(!showMap);
    //           }}
    //           style={styles.iconContainer}
    //         >
    //           <Icons
    //             family="MaterialCommunityIcons"
    //             name={showMap ? 'map-marker-off' : 'map-marker'}
    //             size={metrics.width(28)}
    //             color="#015A7E94"
    //           />
    //         </TouchableOpacity>

    //         {showMap && (
    //           <MapView
    //             provider={PROVIDER_GOOGLE}
    //             style={styles.map}
    //             initialRegion={{
    //               latitude: Number(
    //                 loginData?.data?.latitude
    //                   ? loginData?.data?.latitude
    //                   : 34.567
    //               ),
    //               longitude: Number(
    //                 loginData?.data?.longitude
    //                   ? loginData?.data?.longitude
    //                   : 45.4
    //               ),
    //               latitudeDelta: 0.1,
    //               longitudeDelta: 0.1,
    //             }}
    //           >
    //             {markers.map((marker) => (
    //               <Marker
    //                 key={marker.id}
    //                 coordinate={marker.coordinate}
    //                 title={`${marker.title}`}
    //                 description={marker.description}
    //               />
    //             ))}
    //             {markers.length === 2 && (
    //               <Polyline
    //                 coordinates={markers.map((marker) => marker.coordinate)}
    //                 strokeColor={Colors.black}
    //                 strokeWidth={2}
    //               />
    //             )}
    //           </MapView>
    //         )}
    //       </View>

    //       {/* Messages */}

    //       <FlatList
    //         ref={flatListRef}
    //         showsVerticalScrollIndicator={false}
    //         ListFooterComponent={() => {
    //           return <View style={{ paddingBottom: '10%' }} />;
    //         }}
    //         data={messages}
    //         keyExtractor={(item, index) => item?._id?.toString()}
    //         renderItem={({ item }) => {
    //           return (
    //             <View
    //               style={[
    //                 styles.msgContainer,
    //                 {
    //                   flexDirection:
    //                     item.senderId === loginData?.data?._id
    //                       ? 'row-reverse'
    //                       : 'row',
    //                   alignSelf:
    //                     item.senderId === loginData?.data?._id
    //                       ? 'flex-end'
    //                       : 'flex-start',
    //                 },
    //               ]}
    //             >
    //               <View
    //                 style={[
    //                   styles.imgContainer,
    //                   {
    //                     marginRight:
    //                       item.senderId === walkerData && metrics.width(10),
    //                     marginLeft:
    //                       item.senderId === loginData?.data?._id &&
    //                       metrics.width(10),
    //                   },
    //                 ]}
    //               >
    //                 {item.senderId === loginData?.data?._id ? (
    //                   <Svgs.personBlue height="100%" width="100%" />
    //                 ) : (
    //                   <Svgs.personGrey height="100%" width="100%" />
    //                 )}
    //               </View>
    //               <View
    //                 style={[
    //                   styles.txtContainer,
    //                   {
    //                     backgroundColor:
    //                       item.senderId === loginData?.data?._id
    //                         ? Colors.alphalightgray2
    //                         : Colors.alphadarkgary,
    //                     borderTopRightRadius:
    //                       item.senderId === walkerData ? 8 : 0,
    //                     borderTopLeftRadius:
    //                       item.senderId === loginData?.data?._id ? 8 : 0,
    //                   },
    //                 ]}
    //               >
    //                 <CustomText
    //                   label={item.message}
    //                   color={Colors.black}
    //                   fontSize={14}
    //                 />
    //               </View>
    //             </View>
    //           );
    //         }}
    //       />

    //       {/* Message Input */}
    //       <View style={styles.sendContainer}>
    //         <View style={styles.innerSendContainer}>
    //           <View style={styles.inputContainer}>
    //             <TextInput
    //               placeholder="Message"
    //               placeholderTextColor={Colors.darkGray}
    //               style={styles.input}
    //               value={inputText}
    //               onChangeText={(text) => setInputText(text)}
    //             />
    //           </View>

    //           <TouchableOpacity
    //             onPress={sendMessage}
    //             activeOpacity={0.6}
    //             style={styles.sendimgContainer}
    //           >
    //             <Svgs.SendIcon
    //               height={metrics.width(30)}
    //               width={metrics.width(30)}
    //             />
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </>
    //   )}
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: { flex: 1, alignItems: 'center' },
  scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
  scrollContainer: { alignItems: 'center' },
  videoView: { width: '90%', height: 200 },
  btnContainer: { flexDirection: 'row', justifyContent: 'center' },
  head: { fontSize: 20 },
  info: { backgroundColor: '#ffffe0', color: '#0000ff' }
});
export default LocateWalker;
