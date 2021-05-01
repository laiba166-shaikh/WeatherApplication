import React, { useState,useEffect} from 'react';
import {View,StyleSheet,TouchableOpacity,ActivityIndicator,AsyncStorage} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Text,Image} from 'react-native-elements';
import CardInfo from '../components/Card';
import {Feather} from '@expo/vector-icons';
import {NavigationEvents} from 'react-navigation';
import axios from 'axios';

const HomeScreen=({navigation})=>{
    var city='';
    var cityName=navigation.getParam('cityName');
    const [weatherInfo,setWeatherInfo]=useState({
        name:'',
        temp:"load",
        desc:"load",
        humidity:"load",
        maxTemp:"load",
        icon:'load'
    })

    const apiReq= async (cityName)=>{
        try{
            const res= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9ae77d0d1009d85ba68d2dbcaee40a67&units=metric`);
            setWeatherInfo({
                name:res.data.name,
                temp:res.data.main.temp,
                desc:res.data.weather[0].description,
                humidity:res.data.main.humidity,
                maxTemp:res.data.main.temp_max,
                icon:res.data.weather[0].icon,
            })
        }catch(e){
            console.log('something went wrong');
        }
    }
    const fetchCity=async ()=>{
        city=await AsyncStorage.getItem('SearchedCity');
        if(!city){
            apiReq('Lahore');
        }else{
            apiReq(city);
        }
    }

    useEffect(()=>{
        fetchCity();       
    },[])
    return(
        <View>
        <NavigationEvents onWillFocus={()=>{
            if(cityName){
            apiReq(cityName);
            }
        }}/>
        <LinearGradient
        // colors={['#232526','#414345']}
        //   colors={['#2980b9','#6dd5fa','#ffffff']}
        colors={['#00264d','#00498d']}
          style={styles.container}>
            <Text h3 style={styles.text}>{weatherInfo.name}</Text>
            <Image 
                source={{uri:`https://openweathermap.org/img/w/${weatherInfo.icon}.png`}}
                style={{ width: 120, height: 120,marginBottom:25}}
                PlaceholderContent={<ActivityIndicator/>}
            />
            <CardInfo
                title="Temprature"
                status={weatherInfo.temp}
            />
            <CardInfo
                title="Description"
                status={weatherInfo.desc}
            />
            <CardInfo
                title="Max Temprature"
                status={weatherInfo.maxTemp}
            />
            <CardInfo
                title="Humidity"
                status={weatherInfo.humidity}
            />
        </LinearGradient>
        </View>
    );
}

HomeScreen.navigationOptions=({navigation})=>{
    return{
        headerRight: ()=>(
        <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                <Feather name="plus" style={styles.headerIcon}/>
        </TouchableOpacity>
        )
    };
}

const styles=StyleSheet.create({
    container:{
        height:'100%',
        margin:0,
        padding:0,
        alignItems:'center'
    },
    text:{
        color:"white",
        marginVertical:20,
    },
    headerIcon:{
        marginRight:10,
        fontSize:26,
    }
});

export default HomeScreen;
//9ae77d0d1009d85ba68d2dbcaee40a67
// Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9ae77d0d1009d85ba68d2dbcaee40a67