import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default function Header() {
    return(
        <View style={style.header}>
            <Text style={style.title}>Venomous Snake Recognition V2</Text>
        </View>
    )

}

const style = StyleSheet.create({
    header : {
        height : 70,
        paddingTop : 25,
        backgroundColor : 'green'
    },
    title : {
        textAlign : 'center',
        color : '#fff',
        fontSize : 18,
        fontWeight : 'bold'
    }
});