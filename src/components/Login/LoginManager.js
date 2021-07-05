import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};
export const handleGoogleSignIn = () => {
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(GoogleProvider)
    .then((results) => {
      const { email, photoURL, displayName } = results.user;
      const signedInUser = {
        signInUser: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      setUserToken();
      return signedInUser;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
 
const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    // Send token to your backend via HTTPS
     sessionStorage.setItem('token', idToken)   

  }).catch(function(error) {
    // Handle error
  });
} 

export const handleFbSignin = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
 return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      const user = result.user;
        user.success = true
        console.log('fb login success', user)
       return user
      
    })
    .catch((error) => {
   
      var errorMessage = error.message;
      var email = error.email;

      console.log(errorMessage, email);
    });
};

export const handlegoogleSignOut = () => {
return  firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        signInUser: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      };
     return signedOutUser;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
    
 return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
        return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    
    });
};

export const signInWithEmailAndPassword = (email, password) => {
    console.log(email, password)
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
        return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("user profle update successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
