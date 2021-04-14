import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default function Header2() {
    return(
        <View style={style.header}></View>
    )

}

const style = StyleSheet.create({
    header : {
        height : 1,
        paddingTop : 2,
        backgroundColor : 'black'
    }
});