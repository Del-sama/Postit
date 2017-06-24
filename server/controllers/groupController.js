import * as firebase from 'firebase';

/**
 * @class GroupController
 */
class GroupController {

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf GroupController
   */
  static createGroup(request, response) {
    const name = name ? (request.body.name).toLowerCase() : request.body.name;
    const user = firebase.auth().currentUser;

    if (!user) {
      response.status(400).send({
        message: 'You are not currently signed in.'
      });
    }
    if (!name) {
      response.status(400).send({
        message: 'Input field, name mustn\'t be null. '
      });
    } else {
      const database = firebase.database();

      database.ref('groups').push().set({
        members: [user.uid],
        name,
      });
      response.status(201).send({
        message: `Group ${name} successfully created.`
      });
    }
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf GroupController
   */
  static getGroup(request, response) {
    const groupId = request.params.id;
    const database = firebase.database();

    database.ref(`groups/${groupId}`)
      .once('value')
      .then((snapshot) => {
        const name = snapshot.val().name;
        const members = snapshot.val().members;
        response.status(200).send({
          name: `${name}`,
          members
        });
      });
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf GroupController
   */
  static deleteGroup(request, response) {
    const groupId = request.params.id;
    const database = firebase.database();

    database.ref(`groups/${groupId}`).remove();
    response.status(200).send({
      message: `Group ${groupId} has been successfully deleted.`
    });
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf GroupController
   */
  static getAllGroups(request, response) {
    const database = firebase.database();

    database.ref('groups').once('value')
      .then((snapshot) => {
        response.send(snapshot);
      });
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf GroupController
   */
  static updateGroup(request, response) {
    const groupId = request.params.id;
    const newName = request.body.name;
    const database = firebase.database();

    database.ref(`groups/${groupId}`).update({
      name: newName
    });
    response.status(200).send({
      message: 'Group name has been successfully updated.'
    });
  }

  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @memberOf GroupController
   */
  static joinGroup(request, response) {
    const groupId = request.params.id;
    const user = firebase.auth().currentUser;

    if (!user) {
      response.status(400).send({
        message: 'You are not currently signed in.'
      });
    } else {
      const database = firebase.database();
      let name;
      let members;

      database.ref(`groups/${groupId}`)
      .once('value')
      .then((snapshot) => {
        name = snapshot.val().name;
        members = snapshot.val().members;
        return {
          name,
          members
        };
      })
      .then((result) => {
        name = result.name;
        members = result.members;

        members.push((user.uid));
        database.ref(`groups/${groupId}`).update({
          members
        });
        response.status(200).send({
          message: `You've joined the group ${name}.`,
        });
      });
    }
  }
}

export default GroupController;
