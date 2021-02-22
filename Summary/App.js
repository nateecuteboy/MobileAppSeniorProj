import React from 'react'
import { View, Text ,Image, Button} from 'react-native'

export default function App() {
  return (
    <View>
      <Text style={{fontSize: 37,backgroundColor: '#90ee90'}}>Results</Text>

      <View style={{flexDirection: 'row',marginTop: 24}}>
      <Image style = {{width: 100,height: 100,marginLeft: 80}} source={require("./head.jpg")}/>
      <Text style={{fontSize: 22,marginLeft: 24,marginTop: 30}}>หัวงูเห่า : 50%</Text>
      </View>

      <View style={{flexDirection: 'row',marginTop: 24}}>
      <Image style = {{width: 100,height: 100,marginLeft: 80}} source={require("./mid.jpg")}/>
      <Text style={{fontSize: 22,marginLeft: 24,marginTop: 30}}>ลายงูเห่า : 30%</Text>
      </View>

      <View style={{flexDirection: 'row',marginTop: 24}}>
      <Image style = {{width: 100,height: 100,marginLeft: 80}} source={require("./tail.jpg")}/>
      <Text style={{fontSize: 22,marginLeft: 24,marginTop: 30}}>หางงูเห่า : 10%</Text>
      </View>

      <View style={{flexDirection: 'row',marginTop: 24}}>
      <Image style = {{width: 100,height: 100,marginLeft: 80}} source={require("./snake.jpg")}/>
      <Text style={{fontSize: 22,marginLeft: 24,marginTop: 30}}>งูเห่า : 60%</Text>
      </View>

      <View style={{marginTop: 20,alignItems: 'center',backgroundColor: '#90ee90'}}>
      <Text style={{fontSize: 25}}>สรุป : งูเห่า</Text>
      </View>

      <View style={{marginTop: 13,alignItems: 'center'}}>
      <Button title = "กลับไปหน้าแรก"/>
      </View>



    </View>
  )
}
