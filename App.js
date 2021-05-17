/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  LogBox,
  ActivityIndicator,
  Alert
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Header1 from './components/header';
import Header2 from './components/header2';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios'
import firebase from './firebase';
import Report from './Summary/Report';

LogBox.ignoreLogs(['Setting a timer', 'Possible Unhandled']);

export default class App extends React.Component {
  state = {
    photo : null,
    photo1 : null,
    photo2 : null,
    photo3 : null,
    predicted:null,
    threshold:null,
    weight:null,
    loading:false,
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
    //Images not choosed
    if(this.state.photo === null && this.state.photo1 === null && this.state.photo2 === null && this.state.photo3 === null){
      Alert.alert("Please choose picture", "กรุณาเลือกรูปภาพอย่างน้อย 1 รูป", [{ text:'OK', onPress:() => {
        console.log('OK pressed');
      }}])
    }else{
      //At least one image is choosed.
      this.setState({ loading:true });
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
            this.setState({loading:false});
            console.log(console.error);
            throw error;
          }
        }
      }
      //upload all photos_url to backend
      try {
        let api = 'https://venomoussnake-303614.et.r.appspot.com/upload';
        let response = await axios.post(api, analyzeImageUrls);
        this.setState({ predicted:response.data.predicted });
        this.setState({ threshold:response.data.threshold });
        this.setState({ weight:response.data.weight });
      } catch (error) {
        this.setState({loading:false});
        console.log(error);
        throw error;
      }
      this.setState({loading:false});
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

  handleCanclePhoto = () => {
    this.setState({ photo:null });
  }

  handleCanclePhoto1 = () => {
    this.setState({ photo1:null });
  }

  handleCanclePhoto2 = () => {
    this.setState({ photo2:null });
  }

  handleCanclePhoto3 = () => {
    this.setState({ photo3:null });
  }

  render(){
    const {photo,photo1,photo2,photo3} = this.state;
    return(
      <>
      {( (this.state.predicted === null || this.state.threshold === null || this.state.weight === null) && !this.state.loading) &&
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

                  {photo === null ?
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
                    </View> :
                    <View style={styles.cancleButton}>
                      <Button 
                        title = "Cancle"
                        color="#FF3333"
                        onPress = {this.handleCanclePhoto}
                      />
                    </View>
                  }

                  <View><Header2/></View>

                  <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
                    {photo1 && (<Image source= {{uri: photo1.uri}} style= {styles.imageStyle} />)}
                  </View>
                  <Text style={styles.highlight1}>Head</Text>
                  {photo1 === null ?
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
                    </View> :
                    <View style={styles.cancleButton}>
                      <Button 
                        title = "Cancle"
                        color="#FF3333"
                        onPress = {this.handleCanclePhoto1}
                      />
                    </View>
                  }
                  <View><Header2/></View>
                  <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
                    {photo2 && (<Image source= {{uri: photo2.uri}} style= {styles.imageStyle} />)}
                  </View>
                  <Text style={styles.highlight1}>Mid</Text>
                  {photo2 === null ?
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
                    </View> :
                    <View style={styles.cancleButton}>
                      <Button 
                        title = "Cancle"
                        color="#FF3333"
                        onPress = {this.handleCanclePhoto2}
                      />
                    </View>
                  }
                  <View><Header2/></View>
                  <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
                    {photo3 && (<Image source= {{uri: photo3.uri}} style= {styles.imageStyle} />)}
                  </View>
                  <Text style={styles.highlight1}>Tail</Text>
                  {photo3 === null ?
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
                    </View> :
                    <View style={styles.cancleButton}>
                      <Button 
                        title = "Cancle"
                        color="#FF3333"
                        onPress = {this.handleCanclePhoto3}
                      />
                    </View>
                  }
              
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
      {/* loading */}
      {this.state.loading &&
        <>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:24}}>กำลังประมวลผล กรุณารอสักครู่ ...</Text>
          </View>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </>
      }
      {/* report result */}
      {this.state.predicted !== null && this.state.threshold !== null && this.state.weight !== null && 
        <Report 
          predicted={this.state.predicted}
          threshold={this.state.threshold}
          weight={this.state.weight} 
          userImage={this.state.imageUrl} 
          back={this.handleBackClicked}
        />
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
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancleButton:{
    marginLeft:40,
    marginRight:40
  }
});
