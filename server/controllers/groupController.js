import * as firebase from "firebase";

class GroupController {
  static createGroup(request, response) {
    const name = name ? (request.body.name).toLowerCase() : request.body.name;
    let user = firebase.auth().currentUser;

    if(!user) {
      response.status(400).send({
        message: 'You are not currently signed in.'
      })
    }
    else if (!name) {
      response.status(400).send({
        message: 'Input field, name mustn\'t be null. '
      })
    }
    else {
      const database = firebase.database();
      database.ref(`groups`).push().set({
        members: [user.uid],
        name: name,
      });
      response.status(200).send({
        message: `Group ${name} successfully created.`
      })
    }
  }

  static deleteGroup(request, response) {
    group_id = request.params.id
    firebase.database().ref()
      .orderByChild("groups")
      .equalTo(id)
      .on("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) { 
          // childSnapshot.remove();
          res.send({message: "Yo!"})
          console.log(childSnapshot);
        });
      });
  }
}

export default GroupController;