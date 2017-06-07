import * as firebase from "firebase";

class UsersController {
  static createUsers(request, response) {
    const userName = (request.body.userName).toLowerCase();
    const email = request.body.email;
    const password = request.body.password;
    const profilePicture = request.body.profilePicture || null

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user)=> {
        user.updateProfile({
          displayName: userName,
          photoURL: profilePicture
        })

        user.sendEmailVerification().then(() => {
          response.status(201).send({
            message: `Successfully signed up. /n A verification email has been sent to ${user.email}`
          });
        }).catch((error) => {
          response.send({
            message: `An error occured. ${error.message}`
          })
        });
      }).catch((error) => {
        const errorMessage = error.message;
        response.status(400).send(`Error signing up ${errorMessage}`);
    });
  }

}

module.exports = UsersController;