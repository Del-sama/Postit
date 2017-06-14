import * as firebase from "firebase";

class GroupController {
  static createGroup(request, response) {
    const name = name ? (request.body.name).toLowerCase() : request.body.name;
    let user = firebase.auth().currentUser;

    if(!user) {
      response.status(400).send({
        message: 'You are not currently signed in.'
      });
    }
    else if (!name) {
      response.status(400).send({
        message: 'Input field, name mustn\'t be null. '
      });
    }
    else {
      const database = firebase.database();
      database.ref(`groups`).push().set({
        members: [user.uid],
        name: name,
      });
      response.status(201).send({
        message: `Group ${name} successfully created.`
      });
    }
  }

  static getGroup(request, response) {
    let group_id = request.params.id

    const database = firebase.database();
    database.ref(`groups/${group_id}`)
      .once('value')
      .then((snapshot) => {
        let name = snapshot.val().name;
        let members = snapshot.val().members;
        response.status(200).send({
          name: `${name}`,
          members: members
        });
      });
  }

  static deleteGroup(request, response) {
    let group_id = request.params.id;

    const database = firebase.database();
    database.ref(`groups/${group_id}`).remove();
    response.status(200).send({
      message: `Group ${group_id} has been successfully deleted.`
    });
  }

  static getAllGroups(request, response) {
    const database = firebase.database();
    database.ref(`groups`).once('value')
      .then((snapshot) => {
        response.send(snapshot);
      });
  }

  static updateGroup(request, response) {
    let group_id = request.params.id;
    let newName = request.body.name;
    
    const database = firebase.database();    
    database.ref(`groups/${group_id}`).update({
      name: newName
    });
    response.status(200).send({
      message: "Group name has been successfully updated."
    });
  }

  static joinGroup(request, response) {
    let group_id = request.params.id;
    let user = firebase.auth().currentUser;

    if(!user) {
      response.status(400).send({
        message: 'You are not currently signed in.'
      });
    }
    else {
      const database = firebase.database();
      let name;
      let members;

      database.ref(`groups/${group_id}`)
      .once('value')
      .then((snapshot) => {
        name = snapshot.val().name;
        members = snapshot.val().members;
        return {
          name,
          members
        }
      })
      .then((result) => {
        name = result.name;
        members = result.members;

        members.push((user.uid));
        database.ref(`groups/${group_id}`).update({
          members: members
        });
        response.status(200).send({
          message: `You've joined the group ${name}.`,
        });
      });
    }
  }
}

export default GroupController;