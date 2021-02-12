/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//import ImagePicker from 'react-native-image-picker';
import Header1 from './components/header';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export default class App extends React.Component {
  state = {
    photo : null
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
      launchImageLibrary(options, response => {
      console.log("response", response);
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  
  render(){
    const {photo} = this.state;
    return(
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
              <View><Text>     </Text></View>
      <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
        {photo && (
          <Image
              source= {{uri: photo.uri}}
              style= {{width: 300, height: 300}}
          />
        )}
        <Text style={styles.highlight1}>Body</Text>
        <Button
          title = "Choose Photo"
          onPress = {this.handleChoosePhoto}
        />
        <View><Text>     </Text></View>
        <Text style={styles.highlight1}>Head</Text>
        <Button
          title = "Choose Photo"
          onPress = {this.handleChoosePhoto}
        />
        <View><Text>     </Text></View>
        <Text style={styles.highlight1}>Mid</Text>
        <Button
          title = "Choose Photo"
          onPress = {this.handleChoosePhoto}
        />
        <View><Text>     </Text></View>
        <Text style={styles.highlight1}>Tail</Text>
        <Button
          title = "Choose Photo"
          onPress = {this.handleChoosePhoto}
        />
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      <View><Text>     </Text></View>
      </View>
      </View>
      </View>
    </ScrollView>
    </SafeAreaView>
    )

  }
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
  highlight1: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center'
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
