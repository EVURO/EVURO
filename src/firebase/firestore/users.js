import firestore from '@react-native-firebase/firestore';
import Preference from 'react-native-preference';
export const addUserData = async (
  id,
  firsName,
  lastName,
  breed,
  phone,
  email,
  image,
  city,
  province,
) => {
  await firestore().doc(`users/${id}`).set(
    {
      id,
      firsName,
      lastName,
      breed,
      phone,
      email,
      image,
      city,
      province,
    },
    {merge: true},
  );
};
export const getAllUsers = async () => {
  const rawUsers = await firestore().collection('users').get();
  const users = [];
  rawUsers.forEach(rawUser => {
    Preference.get('userID') != rawUser.id && users.push(rawUser.data());
  });
  console.log('Firebase', users);
  return users;
};
export const getSpecificeUser = async userId => {
  try {
    const user = await firestore().collection('users').doc(userId).get();
    console.log(user);
    return user.data();
  } catch (error) {
    console.log('Get User id', error);
    throw error;
  }
};
