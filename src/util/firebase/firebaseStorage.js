import axios from 'axios';
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import app from "./firebaseApp";

export const getStorageFile = async (fileName) => {
  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app());
  const fileRef = ref(storage, `gs://maru-project-489f6.appspot.com/lego/${fileName}.json`);

// Get the download URL
  try {
    // Download JSON file as a string
    const response = await getDownloadURL(fileRef);
    console.info(response);
    const result = await axios.get(response);
    const jsonString = result?.data;

    // Parse the JSON string to an object
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    // Handle errors
    console.error(error);
  }
}