/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header1 from './components/header';

//const App: () => React$Node = () => {
  const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Header1/>
        <ScrollView
          style={styles.scrollView}>          
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Choose Picture</Text>
              <Text style={styles.sectionDescription}>
                Choose Picture that contain with <Text style={styles.highlight}>Each Part of snake </Text>
                and then go to Analyze. 
              </Text>

              <View>
                <Text>     </Text>
              </View>

              <View style={styles.fixToText}>
                <Button
                  title="Take Picture"
                  onPress={() => Alert.alert('Take Picture pressed')}
                />
                <Button
                  title="Choose Photo"
                  onPress={() => Alert.alert('Choose Photo pressed')}
                />
              </View>

            </View>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
    
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
