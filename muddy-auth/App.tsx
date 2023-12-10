/**
 * Example for a Azure B2C application using a B2CClient helper class
 */

import React from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import type { MSALResult, MSALWebviewParams } from 'react-native-msal';
import { jwtDecode } from "jwt-decode";

import { B2CClient } from './b2cClient';
import { b2cConfig, b2cUser, b2cScopes as scopes } from './msalConfig';

const b2cClient = new B2CClient(b2cConfig);

export default function App() {
  const [authResult, setAuthResult] = React.useState<MSALResult | null>(null);
  const [user, setUser] = React.useState<b2cUser | null>(null);
  const [iosEphemeralSession, setIosEphemeralSession] = React.useState(false);
  const webviewParameters: MSALWebviewParams = {
    ios_prefersEphemeralWebBrowserSession: iosEphemeralSession,
  };

  React.useEffect(() => {
    async function init() {
      try {
        await b2cClient.init();
        const isSignedIn = await b2cClient.isSignedIn();
        if (isSignedIn) {
          setAuthResult(await b2cClient.acquireTokenSilent({ scopes }));
        }
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);

  const handleSignInPress = async () => {
    try {
      const res = await b2cClient.signIn({ scopes, webviewParameters });
      setAuthResult(res);
      const decoded = jwtDecode(res.idToken as string) as any;
      console.log(decoded)
      setUser({name: decoded.name, family_name: decoded.family_name, given_name: decoded.given_name, emails: decoded.emails});
    } catch (error) {
      console.warn(error);
    }
  };

  const handleAcquireTokenPress = async () => {
    try {
      const res = await b2cClient.acquireTokenSilent({ scopes, forceRefresh: true });
      setAuthResult(res);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSignoutPress = async () => {
    try {
      await b2cClient.signOut();
      setAuthResult(null);
      setUser(null);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        {authResult ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleSignoutPress}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
            <Text>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.scrollView}>
        {authResult ? (
            <>
              <Text>Welcome</Text>
              <Text>{user?.family_name}, {user?.given_name} ( {user?.name} )</Text>
            </>
          ) : (<Text></Text>)}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '1%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '1%',
    margin: '-0.5%',
  },
  button: {
    backgroundColor: 'aliceblue',
    borderWidth: 1,
    margin: '0.5%',
    padding: 8,
    width: '49%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  switchButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 4,
    margin: '0.5%',
    width: '99%',
  },
  scrollView: {
    borderWidth: 1,
    padding: 1,
  },
});