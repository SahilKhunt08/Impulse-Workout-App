import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import 'react-native-gesture-handler';
import {WEB_CLIENT_ID } from 'react-native-dotenv';

import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// Initialize Firebase
initializeApp({
  /* Config */
});

WebBrowser.maybeCompleteAuthSession();

export default function Profile() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: 'Your-Web-Client-ID.apps.googleusercontent.com',
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

// import './pages/profile.css'
// import "./pages/allPages.css"

// export const Profile = () => {