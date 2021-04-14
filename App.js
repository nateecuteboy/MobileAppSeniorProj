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
  PermissionsAndroid
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


export default class App extends React.Component {
  state = {
    photo : null,
    photo1 : null,
    photo2 : null,
    photo3 : null
  };
  
  /*handleChoosePhoto = () => {
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


  handleTakePhoto = () => {
    const options = {
      noData: true
    };
    launchCamera(options, response => {
      console.log("response", response);
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

    requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  

  handleChoosePhoto1 = () => {
    const options1 = {
      noData: true
    };
      launchImageLibrary(options1, response1 => {
      console.log("response1", response1);
      if (response1.uri) {
        this.setState({ photo1: response1 });
      }
    });
  };

  handleTakePhoto1 = () => {
    const options1 = {
      noData: true
    };
    launchCamera(options1, response1 => {
      console.log("response1", response1);
      if (response1.uri) {
        this.setState({ photo1: response1 });
      }
    });
  };

  handleChoosePhoto2 = () => {
    const options1 = {
      noData: true
    };
      launchImageLibrary(options1, response2 => {
      console.log("response2", response2);
      if (response2.uri) {
        this.setState({ photo2: response2 });
      }
    });
  };

  handleTakePhoto2 = () => {
    const options2 = {
      noData: true
    };
    launchCamera(options2, response2 => {
      console.log("response2", response2);
      if (response2.uri) {
        this.setState({ photo2: response2 });
      }
    });
  };

  handleChoosePhoto3 = () => {
    const options3 = {
      noData: true
    };
      launchImageLibrary(options3, response3 => {
      console.log("response3", response3);
      if (response3.uri) {
        this.setState({ photo3: response3 });
      }
    });
  };

  handleTakePhoto3 = () => {
    const options3 = {
      noData: true
    };
    launchCamera(options3, response3 => {
      console.log("response3", response3);
      if (response3.uri) {
        this.setState({ photo3: response3 });
      }
    });
  };*/

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


  
        /*<View>
        <Text style={styles.sectionDescription}>If Camera Button is not working please click this.</Text>
        <Button
          title = "Allow Camera Permission"
          onPress = {this.requestCameraPermission}
        />
        </View>*/

  render(){
    const {photo,photo1,photo2,photo3} = this.state;
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
          {photo && (<Image source= {{uri: photo.uri}} style= {{width: 300, height: 300}} />)}
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

        <View><Text>     </Text></View>
        <View><Header2/></View>
        <View><Text>     </Text></View>

        <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
        {photo1 && (<Image source= {{uri: photo1.uri}} style= {{width: 300, height: 300}} />)}
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

        <View><Text>     </Text></View>
        <View><Header2/></View>
        <View><Text>     </Text></View>
        <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
        {photo2 && (<Image source= {{uri: photo2.uri}} style= {{width: 300, height: 300}} />)}
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
        <View><Text>     </Text></View>
        <View><Header2/></View>
        <View><Text>     </Text></View>
        <View style ={{flex: 1, alignItems: 'center', justifyContent : 'center' }}>
        {photo3 && (<Image source= {{uri: photo3.uri}} style= {{width: 300, height: 300}} />)}
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
      <View><Text>     </Text></View>
      <View><Header2/></View>
      <View>
        <Text style={styles.sectionDescription}>Click this Button to Analyze Snake.</Text>
        <View><Text>     </Text></View>
        <Button
          title = "Analyze"
          onPress={() => Alert.alert('Go to Analyze')}
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
