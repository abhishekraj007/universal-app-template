import { createContext, useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useToastController } from '@my/ui';
import { AuthContextType, User } from './types/auth';

/**
 * Use: to generate sh1 keys for the app
 * eas credentials
 */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const toast = useToastController();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '',
    });
  }, []);

  const sendVerificationCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId ?? '');
    } catch (error) {
      throw error;
    }
  };

  const confirmCode = async () => {
    console.log(verificationCode);

    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const { user } = await auth().signInWithCredential(credential);
      setUser(user);
    } catch (error) {
      toast.show('Invalid verification code', {
        myPreset: 'error',
      });
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const { user } = await auth().signInWithCredential(googleCredential);

      setIsSignedIn(true);
      setUser(user);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  // Google sign out
  const signOut = async () => {
    try {
      setIsSignedIn(false);
      setUser(null);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
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

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut,
        phoneNumber,
        setPhoneNumber,
        verificationCode,
        setVerificationCode,
        verificationId,
        setVerificationId,
        sendVerificationCode,
        googleSignIn,
        confirmCode,
        isSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
