import React, { createContext, useState, useEffect, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
} from 'firebase/auth';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@my/config';
import { AuthContextType } from './types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const createUser = async (user: User) => {
    // Check if user exists in Firestore

    const userDocRef = doc(firestore, 'users', user?.uid ?? '');
    const userDoc = await getDoc(userDocRef);

    // const userDoc = await firestore()
    //   .collection('users')
    //   .doc(user?.uid)
    //   .get();

    const userExists = userDoc.exists();
    if (!userExists) {
      console.log('create user');
      await setDoc(userDocRef, {
        displayName: user?.displayName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        photoUrl: user?.photoURL,
        details: {}, // Add any additional fields if needed
      });
    }
  };

  const sendVerificationCode = async () => {
    try {
      const appVerifier = new RecaptchaVerifier(
        // @ts-ignore
        'recaptcha-container',
        {},
        auth
      );
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      console.log('Verification code sent to:', phoneNumber);
    } catch (error) {
      throw error;
      console.error('Error sending verification code:', error);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const userCredential = await signInWithCredential(auth, credential);
      setUser(userCredential.user);
      setIsSignedIn(true);
    } catch (error) {
      console.error('Error confirming verification code:', error);
      throw error;
    }
  };

  // Somewhere in your code
  const googleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

      setIsSignedIn(true);
      setUser(user);
      createUser(user);
      console.log({ user });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setIsSignedIn(false);
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setIsSignedIn(true);
          setUser(firebaseUser);
        } else {
          setIsSignedIn(false);
          setUser(null);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        phoneNumber,
        setPhoneNumber,
        verificationId,
        setVerificationId,
        verificationCode,
        setVerificationCode,
        sendVerificationCode,
        confirmCode,
        signOut,
        googleSignIn,
        isSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
