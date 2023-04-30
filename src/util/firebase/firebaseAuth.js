import { 
  getAuth, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from './firebaseApp';

const actionCodeSettings = () => ({
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${window.location.protocol}//${window.location.host}/maru-project/auth/complete`,
  // This must be true.
  handleCodeInApp: true,
});

export const firebaseLinkEmailSend = async (email) => {
  const auth = getAuth(app());

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings());
    window.localStorage.setItem('emailForSignIn', email);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.warn(errorCode, errorMessage);
  };
}

export const firebaseLinkEmailComplete = async () => {
  const auth = getAuth(app());

  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    console.log('signInWithEmailLink~~~')
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        console.info('login~~~');
      })
      .catch((error) => {
        console.warn(error);
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
}

export const firebaseLoginWithPW = (email, password) => {
  const auth = getAuth(app());

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.info(user, 'success login');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.warn(errorCode, errorMessage);
    });
}

export const getCurrentUser = () => {
  const auth = getAuth(app());
  return auth.currentUser;
}