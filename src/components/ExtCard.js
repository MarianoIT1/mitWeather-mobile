import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import icons from "../img";

const ExtCard = (props) => {
    let d = props.city.dt_txt.split(/[- :]/);
    let timezone = props.timezone/3600
    let date = new Date(d[0], d[1], d[2], d[3], timezone +d[4], d[5])
    const firstCard = date.getHours() >= 21 ? true : false;

    return (
        <View style={{...styles.container, borderRightColor: firstCard ? "rgba(255, 255, 255, 0.15)" : "transparent"}}>
            <Text style={styles.hour}>
                {`${date.getHours()}:${'00'}`}
            </Text>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={icons[props.city.weather[0].icon]}  />
            </View>
            <Text style={styles.temp}>
                {`${Math.round(props.city.main.temp) - 273}°`}
            </Text>
            <Text numberOfLines={2} ellipsizeMode={'clip'} style={styles.conditions}>
                {props.city.weather[0].description}
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
    },
    hour: {
        color: '#fff'        
    },
    temp: {
        color: '#fff',
        fontSize: 26,
        marginBottom: 4
    },
    conditions: {
        color: '#fff',
        textAlign: "center",
        fontSize: 12,     
    },
    iconContainer: {
        marginVertical: 4
    },
    icon: {
        width: 48,
        height: 48,
    }
})

export default ExtCard