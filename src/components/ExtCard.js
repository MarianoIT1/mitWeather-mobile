import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import icons from "../img";
import Icon from "react-native-vector-icons/Fontisto"
import { useSelector } from "react-redux";
import { tempConvert } from "../constants/tempConverter";

const ExtCard = (props) => {
    let d = props.city.dt_txt.split(/[- :]/);
    let timezone = props.timezone/3600
    let date = new Date(d[0], d[1], d[2], d[3], timezone +d[4], d[5])
    const firstCard = date.getHours() >= 21 ? true : false;
    const unit = useSelector(state => state.unit)

    return (
        <View style={{...styles.container, borderRightColor: firstCard ? "rgba(255, 255, 255, 0.15)" : "transparent"}}>
            <Text style={styles.hour}>
                {`${date.getHours()}:${'00'}`}
            </Text>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={icons[props.city.weather[0].icon]}  />
            </View>
            <Text style={styles.temp}>
                {`${tempConvert(props.city.main.temp, unit)}°`}
            </Text>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={{...styles.conditions, flexGrow: 2}}>
                {props.city.weather[0].description}
            </Text>
            <Text style={{...styles.conditions, marginTop: 4}}>
                <Icon name="blood-drop" size={10} style={{color: 'rgba(255,255,255,0.5)'}}/>  {Math.floor(props.city.pop*100)}%
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        alignItems: "center",
        padding: 8,
        borderRightWidth: 1,
        justifyContent: 'space-between'
    },
    hour: {
        color: '#fff',
        marginBottom: 4        
    },
    temp: {
        color: '#fff',
        fontSize: 26,
        marginBottom: 2
    },
    conditions: {
        color: '#fff',
        textAlign: "center",
        fontSize: 12, 
        textAlignVertical: "bottom"    
    },
    iconContainer: {
        marginVertical: 8
    },
    icon: {
        width: 48,
        height: 48,
    }
})

export default ExtCard