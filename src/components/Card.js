import React from 'react';
import {Card,Text} from 'react-native-elements';
import {View,Dimensions} from 'react-native';

const CardInfo=(props)=>{
    const width=Dimensions.get('window').width;
    return(
        <View>
          <Card
            containerStyle={{
            // borderColor:'#000000',
            margin:0,
            marginHorizontal:5,
            width:width-10,
            marginBottom:5,
            }}>
                <Text h4
                // h4Style={{color:'#2980b9'}}
                // h4Style={{color:'#283048'}}
                h4Style={{color:'#00498d'}}
                >
                {props.title} - {props.status}
                </Text>
            </Card>
        </View>
    )
}

export default CardInfo;