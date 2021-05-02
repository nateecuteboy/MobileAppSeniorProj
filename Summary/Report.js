import React, { Component } from 'react'
import { View, 
  Text ,
  Image, 
  Button,
  StyleSheet,
  ScrollView,
  StackNavigator,
  NavigationContainer,
  createStackNavigator
} from 'react-native'


export default function Report(props){
 
  const data = props.data;
  const userImage = props.userImage;

  const snakeClass = {
    '0':'งูเห่า',
    '1':'งูจงอาง',
    '2':'งูสามเหลี่ยม',
    '3':'งูทับสมิงคลา',
    '4':'งูแมวเซา',
    '5':'งูกัปปะ',
    '6':'งูเขียวหางไหม้ท้องเหลือง',
    '7':'งูเขียวหางไหม้ตาโต',
    '8':'งูเขียวหางไหม้ภูเก็ต',
    '9':'งูเขียวหางไหม้ลายเสือ',
    '10':'งูต้องไฟ',
    '11':'งูปล้องทอง',
    '12':'งูปล้องหวายหัวดำ',
    '13':'งูสามเหลี่ยมหัวแดงหางแดง',
  }

  const weights =  [[2, 1, 1],
                    [2, 1, 1],
                    [1, 2, 1],
                    [1, 1, 2],
                    [1, 2, 1],
                    [2, 2, 1],
                    [2, 1, 1],
                    [2, 1, 1],
                    [1, 2, 1],
                    [2, 1, 2],
                    [2, 2, 1],
                    [1, 1, 2],
                    [1, 2, 1],
                    [1, 2, 1]]

  function getTopThreeScore(data){
    let result = [];
    //push object data in result
    for(let key in data){
      result.push({
        snake:key,
        score:parseFloat(data[key])
      })
    }
    //sort result
    for(let i = 0; i < result.length - 1; i++){
      for(let j = i+1; j < result.length; j++){
        if(result[i].score < result[j].score){
          let temp = result[i];
          result[i] = result[j];
          result[j] = temp;
        }
      }
    }
    result = result.slice(0, 3);
    return result;
  }
  let images = [];
  for(let part in data){
    if(userImage[part] !== null){
      images.push({
        part:part,
        uri:{uri:userImage[part]},
        topThree:getTopThreeScore(data[part])
      })
    }
  }

  let score = {};
  let rank1 = [];
  let rank2 = [];
  let parts = {'head':0, 'mid':1, 'tail':2};
  images.forEach((data) => {
    let topThree = data.topThree;
    if(data.part !== 'body'){
      rank1.push({part:parts[data.part], snake:parseInt(topThree[0].snake)});
      rank2.push({part:parts[data.part], snake:parseInt(topThree[1].snake)});
    }
  })
  //rank1 จะบวกตาม weight ของ f1-score
  rank1.forEach((data) => {
    if(data.snake in score){
      score[data.snake] += weights[data.snake][data.part];
    }else{
      score[data.snake] = weights[data.snake][data.part];
    }
  })
  //rank2 จะบวก 1 ทุกกรณี เนื่องจากเป็น rank รอง
  rank2.forEach((data) => {
    if(data.snake in score){
      score[data.snake]++;
    }
  })
  //หา class ที่มี score มากสุด
  let max = -1;
  let conclusionClass = {};
  for(let key in score){
    if(score[key] > max){
      max = score[key];
      conclusionClass = key;
    }
  }
  //head, mid, tail are empty
  if(Object.keys(conclusionClass).length === 0){
    let bodyClass = images.find(item => item.part === 'body');
    conclusionClass = bodyClass['topThree'][0]['snake'];
  }
  
  function back(){
    props.back();
  }
  
  return (
    <>
      <ScrollView>
        <View style={{backgroundColor: '#0000'}}>
          <Text style={{fontSize: 37,backgroundColor: '#3cb371'}}>Results</Text>
          {images.map((item, index) => (
            <View key={index} style={styles.padding}>
              <Image style = {{width: 98,marginLeft: 20}} source={item.uri}/>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.text}>{item.part}</Text>
                {item.topThree.map((value, index) => 
                  <Text key={index} style={index === 0 ? styles.textHighlight : styles.text}>{snakeClass[value.snake]} : {value.score}</Text>
                )}
              </View>
            </View>
          ))}

        </View>
      </ScrollView>

      <View style={{marginTop: 20,alignItems: 'center',backgroundColor: '#3cb371'}}>
        <Text style={{fontSize: 25}}>สรุป : {snakeClass[conclusionClass]}</Text>
      </View>
      <View style={styles.backButton}>
        <Button title = "กลับไปหน้าแรก" onPress={back}/>
      </View>
    </>
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
    borderRadius: 20
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 12,
    marginTop: 40,
  },
  backButton:{
    alignItems: 'center',
    marginTop:20,
    marginBottom:20
  }
});
