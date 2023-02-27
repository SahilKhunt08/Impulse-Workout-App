import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// Initialize Firebase
initializeApp({
  apiKey: "AIzaSyB5SWr-2KOZT855ie79W4tw2ps_bdak9sw",
  authDomain: "impulse-workout-app.firebaseapp.com",
  projectId: "impulse-workout-app",
  storageBucket: "impulse-workout-app.appspot.com",
  messagingSenderId: "134273052545",
  appId: "1:134273052545:web:a6c2b681a304f3a5058280",
  measurementId: "G-74PDHEYD5V"
});

WebBrowser.maybeCompleteAuthSession();

export default function Profile() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '134273052545-b8680ejdr3rshlfll9k9s4s0q8o6nq68.apps.googleusercontent.com',
    },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}