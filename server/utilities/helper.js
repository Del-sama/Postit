import * as firebase from "firebase";

const updateUser= (userId, userName, profilePicture) => {
  const database = firebase.database();
    database.ref(`users/${userId}`).set({
      userName: userName,
      profilePicture: profilePicture,
      email: email,
      groups
    })
}

module.exports = updateUser;