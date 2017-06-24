import * as firebase from 'firebase';
import validateEmail from '../utilities/validateEmail';

/**
 * @class UsersController
 */
class UsersController {

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf UsersController
   */
  static createUsers(request, response) {
    const userName = userName ?
      (request.body.userName).toLowerCase() : request.body.userName;
    const email = request.body.email;
    const password = request.body.password;
    const profilePicture = request.body.profilePicture || null;
    const database = firebase.database();

    if (!validateEmail(email)) {
      response.status(400).send({
        message: 'Please format email and truy again.'
      });
    }
    if (!(email && password && userName)) {
      response.status(400).send({
        message: 'Please enter all required details'
      });
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.updateProfile({
          displayName: userName,
          photoURL: profilePicture
        });

        database.ref(`users/${user.uid}`).set({
          userName,
          email,
          profilePicture,
          groups: ['General']
        });

        user.sendEmailVerification().then(() => {
          response.status(201).send({
            message: `Successfully signed up. /n A verification email has been sent to ${user.email}`
          });
        }).catch((error) => {
          response.send({
            message: `An error occured. ${error.message}`
          });
        });
      }).catch((error) => {
        const errorMessage = error.message;
        response.status(400).send(`Error signing up ${errorMessage}`);
      });
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf UsersController
   */
  static signin(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    if (!(email && password)) {
      response.send({
        message: 'Please sign in with your email and password'
      });
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        user = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL || null,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          admin: false
        };
        response.status(201).send({
          message: 'Signin successful',
          user
        });
      }).catch((error) => {
        const errorMessage = error.message;
        response.send({
          message: `Error signing in. ${errorMessage}`
        });
      });
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf UsersController
   */
  static signout(request, response) {
    firebase.auth().signOut()
      .then(() => {
        response.status(200).send({
          message: 'You successfully signed out'
        });
      }).catch((error) => {
        response.status(400).send({
          message: `Sorry, ${error.message}. Please try to sign out again`
        });
      });
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf UsersController
   */
  static updateProfile(request, response) {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    const database = firebase.database();

    if (user) {
      user.updateProfile({
        displayName: request.body.userName,
        photoURL: request.body.profilePicture
      })
      .then(() => {
        const updatedUser = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL || null,
          displayName: user.displayName
        };
        response.status(200)
         .send({
           message: 'Profile was successfully updated',
           updatedUser
         });

        database.ref(`users/${userId}`).update({
          userName: request.body.userName || user.userName,
          profilePicture: request.body.profilePicture || user.photoURL
        });
      });
    } else {
      response.send({
        message: 'You are not currently signed in'
      });
    }
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf UsersController
   */
  static resetPassword(request, response) {
    const auth = firebase.auth();
    const email = request.body.email;

    auth.sendPasswordResetEmail(email).then(() => {
      response.send({
        message: `A password reset email has been sent to ${email}`
      });
    }, (error) => {
      response.send({
        message: `An error occured ${error.message}`
      });
    });
  }
}

module.exports = UsersController;
