// function showPicture(){
//   // use jQuery ($ is shorthand) to find the div on the page and then change the html
//   // 'rounded-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
//   $("#image").append('<img class="rounded-circle" src="images/high-five.gif"/>');
//   $("p").html("High five! You're building your first web app!");

//   // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more

// }

// $(document).ready(function () {
//   getWeather();
// });

function getWeather(searchQuery) {
  var url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    searchQuery +
    '&units=metric&APPID=27cfc38eba673c3fdab98bc296680292';

  $('.city').text('');
  $('.temp').text('');
  $('.error-message').text('');

  $.ajax(url, {
    success: function (data) {
      $('.city').text(data.name);
      $('.temp').text(data.main.temp + '°');
    },
    error: function (error) {
      $('.error-message').text('No temperature for that place! Sorry :(');
    },
  });
}

function searchWeather() {
  var searchQuery = $('.search').val();
  getWeather(searchQuery);
}

function handleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log(user.email);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

function addMessage(postTitle, postBody) {
  var postData = {
    title: postTitle,
    body: postBody,
  };

  var database = firebase.database().ref('posts');

  var newPostRef = database.push();
  newPostRef.set(postData, (error) => {
    if (error) {
      // The write failed...
      alert('Something went wrong!');
    } else if (postData.title === '' || postData.body === '') {
      // Data saved successfully!
      alert('Title and/or Post cannot be empty!');
    } else {
      // Data saved successfully!
      alert('Post saved to DB!');
      setTimeout(function () {
        //your code to be executed after 1 second
        window.location.reload();
      }, 1000);
    }
  });
}

function handleMessageFormSubmit() {
  var postTitle = $('#post-title').val();
  var postBody = $('#post-body').val();
  addMessage(postTitle, postBody);
}
