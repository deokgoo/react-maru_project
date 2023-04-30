import { initializeApp } from "firebase/app";

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

const app = () => {
  try {
    const app = initializeApp(firebaseConfig);
    return app;
  } catch {
    console.warn('firebase initialize fail');
  }
}

export default app;
