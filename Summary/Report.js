import React, { useRef } from 'react'
import { View, 
  Text ,
  Image, 
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';

export default function Report(props){
 
  const viewShotRef = useRef();
  const data = props.predicted;
  const threshold = props.threshold;
  const weights = props.weight;
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
      rank1.push({part:parts[data.part], snake:parseInt(topThree[0].snake), score:topThree[0].score});
      rank2.push({part:parts[data.part], snake:parseInt(topThree[1].snake), score:topThree[1].score});
    }
  })
  //rank1 จะบวกตาม weight ของ f1-score
  rank1.forEach((data) => {
    if(data.snake in score && data.score > threshold[data.snake][data.part + 1]){ // + 1 เพราะ index 0 เป็นของ body
      score[data.snake] += weights[data.snake][data.part];
    }else if(data.score > threshold[data.snake][data.part + 1]){
      score[data.snake] = weights[data.snake][data.part];
    }
  })
  //rank2 จะบวก 1 ทุกกรณี เนื่องจากเป็น rank รอง
  rank2.forEach((data) => {
    if(data.snake in score && data.score > threshold[data.snake][data.part + 1]){
      score[data.snake]++;
    }
  })
  //หา class ที่มี score มากสุด
  let max = -1;
  let conclusionClass = '';
  for(let key in score){
    if(score[key] > max){
      max = score[key];
      conclusionClass = snakeClass[key];
    }else if(score[key] === max){
      conclusionClass = conclusionClass + ', ' + snakeClass[key];
    }
  }
  //ถ้าผู้ใช้ไม่ทำการส่งส่วน head, mid, tail มาเลย ส่งมาแต่ส่วน body อย่างเดียว ก็จะใช้ส่วน body แทน 
  if(Object.keys(conclusionClass).length === 0){
    let bodyClass = images.find(item => item.part === 'body');
    if(bodyClass['topThree'][0]['score'] > threshold[bodyClass['topThree'][0]['snake']][0]){
      conclusionClass = snakeClass[bodyClass['topThree'][0]['snake']];
    }
  }
  //ถ้า conclusion class มีมากกว่า 1 class แต่มีค่า score ที่ต่ำ (max = 1) จะทำการ reject เพราะแสดงว่าไม่มีลักษณะเด่นออกมาเลย
  if(Object.keys(conclusionClass).length > 1 && max === 1){
    conclusionClass = '';
  }
  
  function back(){
    props.back();
  }

  async function shareImage(){
    const imageURI = await viewShotRef.current.capture();
    Share.open({title:'resultImage', url:imageURI});
  }

  async function downloadImage(){
    const imageRef = await captureRef(viewShotRef);
    const image = CameraRoll.save(imageRef, 'photo');
    //save images success or fail
    const title = image ? 'Save image success!' : 'Save image fail!';
    const message = image ? 'บันทึกรูปภาพแล้ว' : 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง';   
    Alert.alert(title, message,
      [
        {
          text:"OK",
          onPress:() => { console.log('OK pressed'); }
        }
      ]
    )
   
  }
  
  return (
    <>
    {/* prediction result */}
      <ScrollView>
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
          <View style={{backgroundColor: '#0000'}}>
            <Text style={{fontSize: 32,color : '#fff',fontWeight : 'bold',backgroundColor: 'green'}}>Results</Text>
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
          {/* conclusion */}
          <View style={{marginTop: 20,alignItems: 'center',backgroundColor: '#3cb371'}}>
            <Text style={{fontSize: 25}}>สรุป : {conclusionClass === '' ? 'ไม่สามารถสรุปได้' : conclusionClass}</Text>
          </View>
        </ViewShot>
      </ScrollView>
      {/* Save & Share */}
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button 
            title="save"
            color="#FF3333"
            onPress={downloadImage}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title="share" 
            color="#3cb371"
            onPress={shareImage}
          />
        </View>
      </SafeAreaView>
      {/* back to home */}
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
    marginTop:20,
    marginBottom:20,
    marginLeft:10,
    marginRight:10
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginLeft:10,
    marginRight:10,
    marginTop:10
  }
});
