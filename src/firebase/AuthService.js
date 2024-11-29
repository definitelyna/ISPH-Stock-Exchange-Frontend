import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Sign up
export const signUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Log in
export const logIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//Sign in with google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.log(err);
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      console.log("user: ", user);
      return user;
    }
  } catch (err) {
    console.log("Error during redirect: ", err.message);
    throw err;
  }
};

// Log out
export const logOut = async () => {
  return await signOut(auth);
};
