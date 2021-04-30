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
  Button,
  PermissionsAndroid,
  LogBox
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
import Header2 from './components/header2';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from 'react-native';
import axios from 'axios'
import firebase from './firebase';
import Report from './Summary/Report';

LogBox.ignoreLogs(['Setting a timer']);

export default class App extends React.Component {
  state = {
    photo : null,
    photo1 : null,
    photo2 : null,
    photo3 : null,
    predicted:null,
    imageUrl:{
      'head':null,
      'mid':null,
      'tail':null,
      'body':null,
    }
  };
  
  handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(photo => {
      console.log(photo);
      console.log("body image")
      console.log("photo  height",photo.height);
      console.log("photo  width",photo.width);
      this.setState({
        photo: {
          uri: photo.path,
        },
      });
    })
    .catch((e) =>  console.log("no photo body choose"));    
  };

  handleChoosePhoto1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(photo1 => {
      console.log(photo1);
      console.log("head image")
      console.log("photo 1 height",photo1.height);
      console.log("photo 1 width",photo1.width);
      this.setState({
        photo1: {
          uri: photo1.path,
        },
      });
    })
    .catch((e) =>  console.log("no photo head choose"));    
  };

  handleChoosePhoto2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(photo2 => {
      console.log(photo2);
      console.log("mid image")
      console.log("photo 2 height",photo2.height);
      console.log("photo 2 width",photo2.width);
      this.setState({
        photo2: {
          uri: photo2.path,
        },
      });
    })
    .catch((e) =>  console.log("no photo mid choose"));    
  };

  handleChoosePhoto3 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(photo3 => {
      console.log(photo3);
      console.log("tail image")
      console.log("photo 3 height",photo3.height);
      console.log("photo 3 width",photo3.width);
      this.setState({
        photo3: {
          uri: photo3.path
        },
      });
    })
    .catch((e) =>  console.log("no photo tail choose"));  
  };

  handleTakePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(photo => {
      console.log(photo);
      console.log("body image")
      console.log("photo  height",photo.height);
      console.log("photo  width",photo.width);
      this.setState({
        photo: {
          uri: photo.path
        },
      });
    })
    .catch((e) =>  console.log("no photo body choose"));  
  };

  handleTakePhoto1 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(photo1 => {
      console.log(photo1);
      console.log("head image")
      console.log("photo 1 height",photo1.height);
      console.log("photo 1 width",photo1.width);
      this.setState({
        photo1: {
          uri: photo1.path
        },
      });
    })
    .catch((e) =>  console.log("no photo head choose"));  
  };

  handleTakePhoto2 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(photo2 => {
      console.log(photo2);
      console.log("mid image")
      console.log("photo 2 height",photo2.height);
      console.log("photo 2 width",photo2.width);
      this.setState({
        photo2: {
          uri: photo2.path
        },
      });
    })
    .catch((e) =>  console.log("no photo mid choose"));  
  };

  handleTakePhoto3 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(photo3 => {
      console.log(photo3);
      console.log("tail image")
      console.log("photo 3 height",photo3.height);
      console.log("photo 3 width",photo3.width);
      this.setState({
        photo3: {
          uri: photo3.path
        },
      });
    })
    .catch((e) =>  console.log("no photo tail choose"));  
  };

  handleAnalyzeClicked = async () =>{
    let photos = {
      body:this.state.photo,
      head: this.state.photo1,
      mid: this.state.photo2,
      tail: this.state.photo3
    };
    let timeStamp = Date.now();
    let analyzeImageUrls = {}
    // save all photos to storage
    for(let key in photos){
      if(photos[key] !== null){
        try {
          let image = await fetch(photos[key].uri);
          let blob = await image.blob();
          const storageRef = firebase.storage().ref('userImage/' + key + '/' + timeStamp + '.jpg');
          await storageRef.put(blob);
          let url = await storageRef.getDownloadURL();
          analyzeImageUrls[key] = url;
          this.state.imageUrl[key] = url;
        } catch (error) {
          console.log(console.error);
          throw error;
        }
      }
    }
    console.log(analyzeImageUrls);
    //upload all photos_url to backend
    try {
      let api = 'https://venomoussnake-303614.et.r.appspot.com/upload';
      let predicted = await axios.post(api, analyzeImageUrls);
      predicted = predicted.data;
      this.setState({...this.state, predicted});    
    } catch (error) {
      console.log(error);
      throw error;
    }
    
  }

  handleBackClicked = () =>{
    this.setState({
      photo : null,
      photo1 : null,
      photo2 : null,
      photo3 : null,
      predicted:null,
      imageUrl:{
        'head':null,
        'mid':null,
        'tail':null,
        'body':null,
      }
    })
  }

  render(){
    const {photo,photo1,photo2,photo3,predicted} = this.state;
    return(
      <>
      {this.state.predicted === null &&
        <>
          <Header1/>
            <ScrollView style={styles.scrollView}>
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Choose Picture</Text>
                  <Text style={styles.sectionDescription}>
                    Choose Picture that contain with <Text style={styles.highlight}>Each Part of snake </Text>
                    and then go to Analyze. 
                  </Text>
                  <View><Text>     </Text></View>
                  <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
                    {photo && (<Image source= {{uri: photo.uri}} style= {styles.imageStyle} />)}
                  </View>
            
                  <Text style={styles.highlight1}>Body</Text>

                  <View style={styles.fixToText}>
                    <Button 
                      title = "Choose Photo"
                      onPress = {this.handleChoosePhoto}
                    />
                    <Button 
                      title = "Take Photo"
                      color="#f194ff"
                      onPress = {this.handleTakePhoto}
                    />
                  </View>

                  <View><Header2/></View>

                  <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
                    {photo1 && (<Image source= {{uri: photo1.uri}} style= {styles.imageStyle} />)}
                  </View>
                  <Text style={styles.highlight1}>Head</Text>
                  <View style={styles.fixToText}>
                    <Button
                      title = "Choose Photo"
                      onPress = {this.handleChoosePhoto1}
                    />
                    <Button 
                      title = "Take Photo"
                      color="#f194ff"
                      onPress = {this.handleTakePhoto1}
                    />
                  </View>
                  <View><Header2/></View>
                  <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
                    {photo2 && (<Image source= {{uri: photo2.uri}} style= {styles.imageStyle} />)}
                  </View>
                  <Text style={styles.highlight1}>Mid</Text>
                  <View style={styles.fixToText}>
                    <Button
                      title = "Choose Photo"
                      onPress = {this.handleChoosePhoto2}
                    />
                    <Button 
                      title = "Take Photo"
                      color="#f194ff"
                      onPress = {this.handleTakePhoto2}
                    />
                  </View>
                  <View><Header2/></View>
                  <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
                    {photo3 && (<Image source= {{uri: photo3.uri}} style= {styles.imageStyle} />)}
                  </View>
                  <Text style={styles.highlight1}>Tail</Text>
                  <View style={styles.fixToText}>
                    <Button
                      title = "Choose Photo"
                      onPress = {this.handleChoosePhoto3}
                    />
                    <Button 
                      title = "Take Photo"
                      color="#f194ff"
                      onPress = {this.handleTakePhoto3}
                    />
                  </View>
              
                  <View><Header2/></View>
                  <View
                    style={{
                      marginTop:40
                    }}
                  >
                    <Text style={styles.sectionDescription}>Click this Button to Analyze Snake.</Text>
                  </View>
                  <View
                    style={{
                      marginTop:20,
                      marginBottom:20
                    }}
                  >
                    <Button
                      title = "Analyze"
                      onPress={this.handleAnalyzeClicked}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
        </>
      }
      {this.state.predicted !== null && 
      <Report data={this.state.predicted} userImage={this.state.imageUrl} back={this.handleBackClicked}/>
      }
      
      </>
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
    textAlign: 'center',
    marginTop:20
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
  imageStyle : {
    height:300,
    width:300,
    marginTop:20
  }
});
