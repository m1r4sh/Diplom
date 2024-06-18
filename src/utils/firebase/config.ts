import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnGn95n37odUPHdP4zDgj1ZTPkZHCJl-w",
  authDomain: "store-fdee6.firebaseapp.com",
  projectId: "store-fdee6",
  storageBucket: "store-fdee6.appspot.com",
  messagingSenderId: "931661886167",
  appId: "1:931661886167:web:1dc1171d0398e55c36f692",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

const adminEmails = ["mlukavyi@gmail.com", "pavluk.mixa@gmail.com"];

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user: any = result.user;

    // Determine if the user is an admin
    const isAdmin = adminEmails.includes(user.email);

    // Save user to Firestore
    const userDoc = doc(db, "users", user.uid);
    await setDoc(
      userDoc,
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
        admin: isAdmin,
      },
      { merge: true }
    );

    // Fetch the user document to ensure it has the correct fields
    const userSnapshot = await getDoc(userDoc);
    const userData = userSnapshot.data();

    return { ...user, ...userData };
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out: ", error);
    throw error;
  }
};

export {
  auth,
  signInWithGoogle,
  logOut,
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
};
