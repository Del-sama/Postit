import * as firebase from "firebase";

class messageController {
  static createMessage(request, response){
    const user = firebase.auth().currentUser;
    console.log("user=========>", user);
    const message = request.body.message;
    const db = firebase.database();

    const message = db.ref.child('messages').push({
      message: message,
      author: user.displayName,
      date: new Date().toString(),
      profilePicture: user.photURL
    });
    const messageId = mesage.key();
  }
}

module.exports = messageController;