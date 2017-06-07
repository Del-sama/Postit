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
            message: `A verification email has been sent to ${user.email}`
          });
        }).catch((error) => {
          response.send({
            message: `An error occured. ${error.message}`
          })
        });

          // user = {
          //   uid: user.uid,
          //   displayName: user.displayName,
          //   email: user.email,
          //   photoURL: user.photoURL,
          //   emailVerified: user.emailVerified,
          //   admin: false
          // }

          // response.status(201).send({
          //     user,
          //     message: 'Sucessfully signed up'
          //   });

      }).catch((error) => {
        const errorMessage = error.message;
        response.status(400).send(`Error signing up ${errorMessage}`);
    });
  }

}

module.exports = UsersController;