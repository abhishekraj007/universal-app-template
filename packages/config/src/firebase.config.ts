import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
};

// // // Initialize Firebase
// export const app =
//   getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// export const auth = getAuth(app);

// firebaseConfig.ts

// const firebaseConfig: FirebaseOptions = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// // // Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const firestore = getFirestore();

// Initialize Firebase
// export const initializeFirebase = () => {
//   if (!getApps().length) {
//     initializeApp(firebaseConfig);
//   }
// };

// export const auth = () => {
//   // initializeFirebase();
//   return getAuth(app);
// };

// export const firestore = () => {
//   // initializeFirebase();
//   return getFirestore();
// };
