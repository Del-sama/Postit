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

  static signin(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {

        user = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL || null,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          admin: false
        }

        response.status(201).send({
          message: 'Signin successful',
          user
        })
      }).catch((error) => {

        const errorMessage = error.message;
        response.send({message: `Error signing in. ${errorMessage}`})
    });

  }
}

module.exports = UsersController;