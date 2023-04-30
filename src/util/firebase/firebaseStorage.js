import { getStorage, getDownloadURL, ref } from "firebase/storage";
import app from "./firebaseApp";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  storageBucket: 'gs://maru-project-489f6.appspot.com'
};


export const getStorageFile = async (fileName) => {
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app());
  const fileRef = ref(storage, `gs://maru-project-489f6.appspot.com/rego/${fileName}.json`);

// Get the download URL
  try {
    // Download JSON file as a string
    const response = await getDownloadURL(fileRef);
    console.info(response);
    const jsonString = await fetch(response, { mode: 'cors' }).then((response) => response.text());

    // Parse the JSON string to an object
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    // Handle errors
    console.error(error);
  }
}