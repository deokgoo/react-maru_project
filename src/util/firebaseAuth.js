import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfrNQE1oGBJj0aTayZ_7gPR6RWEKiiwsw",
  authDomain: "maru-project-489f6.firebaseapp.com",
  databaseURL: "https://maru-project-489f6-default-rtdb.firebaseio.com",
  projectId: "maru-project-489f6",
  storageBucket: "maru-project-489f6.appspot.com",
  messagingSenderId: "237350461577",
  appId: "1:237350461577:web:eb081ff8b597f63ab9a658",
  measurementId: "G-RPD6WGJ6XR"
};

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://deokgoo.github.io/maru-project/auth/complete',
  // This must be true.
  handleCodeInApp: true,
};

export const firebaseLinkEmailSend = async (email) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.warn(errorCode, errorMessage);
  };
}
