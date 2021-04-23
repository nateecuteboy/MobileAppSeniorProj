import React, { Component } from 'react'
import { View, Text ,Image, Button,StyleSheet,StackNavigator, NavigationContainer,createStackNavigator} from 'react-native'


export default function App(){
  let Headimage = {uri:'https://pixnio.com/free-images/2018/11/19/2018-11-19-17-49-18.jpg'};
  let Midimage = {uri:'https://downloadwap.com/thumbs2/wallpapers/p2/2019/abstract/15/9e2a5b7813184813.jpg'};
  let Tail = {uri:'https://st3.depositphotos.com/13193658/33368/i/600/depositphotos_333683654-stock-photo-selective-focus-python-tail-isolated.jpg'};
  let Body = {uri:'https://lh3.googleusercontent.com/proxy/58gfjX7Zd4gbPniwR4v2BTPTxco5FxCtvk9VJSTBlmkVdozu82g50itPRXBkx57naJvSOovAL_WSODpxD6lliXsMHXSa2vsbVfSuybuELMGRCLBZfG_850PJkOP45QkXdEB9Vzj591ccw-0Wdw'};
  
  return (
    <View style={{backgroundColor: '#0000'}}>
      <Text style={{fontSize: 37,backgroundColor: '#3cb371'}}>Results</Text>

      <View style={styles.padding}>
      <Text style={styles.textHeader}>Head</Text>
      <Image style = {{width: 98,height: 110,marginLeft: 20}} source={Headimage}/>
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.textHighlight}>งูสามเหลี่ยมหัวแดงหางแดง:50%</Text>
      <Text style={styles.text}>หัวงู 2 : 20%</Text>
      <Text style={styles.text}>หัวงู 3 : 5%</Text>
      </View>
      </View>

      <View style={styles.padding}>
      <Text style={styles.textHeader}>Patten</Text>
      <Image style = {{width: 98,height: 110,marginLeft: 10}} source={Midimage}/>
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.textHighlight}>ลายงู 1 : 50%</Text>
      <Text style={styles.text}>ลายงู 2: 30%</Text>
      <Text style={styles.text}>ลายงู 3 : 10%</Text>
      </View>
      </View>

      <View style={styles.padding}>
      <Text style={styles.textHeader}>Tail</Text>
      <Image style = {{width: 98,height: 110,marginLeft: 35}} source={Tail}/>
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.textHighlight}>หางงู 1 : 60%</Text>
      <Text style={styles.text}>หางงู 2 : 10%</Text>
      <Text style={styles.text}>หางงู 3 : 1%</Text>
      </View>
      </View>

      <View style={styles.padding}>
      <Text style={styles.textHeader}>Body</Text>
      <Image style = {{width: 98,height: 110,marginLeft: 25}} source={Body}/>
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.textHighlight}>งู 1 : 40%</Text>
      <Text style={styles.text}>งู 2 : 30%</Text>
      <Text style={styles.text}>งู 3 : 10%</Text>
      </View>
      </View>

      <View style={{marginTop: 20,alignItems: 'center',backgroundColor: '#3cb371'}}>
      <Text style={{fontSize: 25}}>สรุป : งูเห่า</Text>
      </View>

      <View style={{marginTop: 10,alignItems: 'center'}}>
      <Button title = "กลับไปหน้าแรก"/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 7,
  },
  textHighlight: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 15,
    backgroundColor: '#fdd741',
  },
  padding: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#9ff8b1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 12,
    marginTop: 40,
  },
});
