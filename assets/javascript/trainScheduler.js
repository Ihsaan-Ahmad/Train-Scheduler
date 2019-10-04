var config = {
  apiKey: "AIzaSyDj8NT1udplkHNBZRZVNOLFxzPnHr9VZP0",
  authDomain: "train-scheduler-e13bf.firebaseapp.com",
  databaseURL: "https://train-scheduler-e13bf.firebaseio.com",
  projectId: "train-scheduler-e13bf",
  storageBucket: "train-scheduler-e13bf.appspot.com",
  messagingSenderId: "516547437802",
  appId: "1:516547437802:web:c3474bc3d8b73c73faa393"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#newTrainBtn").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#trainNameInput")
    .val()
    .trim();
  var destination = $("#destInput")
    .val()
    .trim();
  var firstTrain = $("#firstTrainInput")
    .val()
    .trim();
  var frequency = $("#freqInput")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  $("#trainNameInput").val("");
  $("#destInput").val("");
  $("#firstTrainInput").val("");
  $("#freqInput").val("");

  return false;
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment()
    .add(tMinutesTillTrain, "minutes")
    .format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $("#trainTable > tbody").append(
    "<tr><td>" +
      trainName +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      nextTrain +
      "</td><td>" +
      tMinutesTillTrain +
      "</td></tr>"
  );
});
