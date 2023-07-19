import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {setDoc, doc} from 'firebase/firestore'



const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setuser] = useState({})

    async function signUp(email, password){
        createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', email), {
            savedShows: []
        })
    }

    /*
    async function signUp(email, password) {
        try {
            // Create the user
            await createUserWithEmailAndPassword(auth, email, password);
    
            // Save data to Firestore
            await setDoc(doc(db, 'users', email), {
                savedShows: []
            });
    
            // Optionally, you can return the user object or any other value here if needed.
            // For example, you can return the user object:
            // const user = auth.currentUser;
            // return user;
        } catch (error) {
            // Handle any errors that might occur during user creation or Firestore update
            console.error("Error signing up:", error);
            throw error; // You can choose to rethrow the error or handle it as per your requirement.
        }
    }
    */
    

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setuser(currentUser);
        });
        return () =>{
            unsubscribe();
        };
    });

  return <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>{children}</AuthContext.Provider>;
}

export function UserAuth() {
  return useContext(AuthContext);
}