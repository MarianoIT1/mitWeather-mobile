import React, {useEffect, useRef} from "react";
import { RefreshControl, StyleSheet, View, Text, ScrollView, Dimensions, Animated } from "react-native";
import { connect } from "react-redux";
import icons from "../img";
import { useParams } from "react-router-native";
import { refreshCities } from "../redux/actions";
import ExtCard from "./ExtCard";
import Icon from "react-native-vector-icons/Octicons"

const CityDetail = (props) => {

    let { id } = useParams(), city;  
    if (id === 'current') city = props.currentLocation;
    else city = props.cities.find(city => city.id == id)

    const toDownAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(toDownAnim, {
                    toValue: 40,
                    duration: 3500,
                    useNativeDriver: true
                  }),
                  Animated.timing(toDownAnim, {
                    toValue: 0,
                    duration: 3500,
                    useNativeDriver: true
                })])
            ).start()
    }, [])
        
    
    return (
        city &&
        <ScrollView 
                contentContainerStyle={{flex: 1}}
                style={{flex: 1}}
                refreshControl={
                <RefreshControl
                refreshing={props.isRefreshing}
                onRefresh={() => props.refreshCities(props.cities)}
                colors={["#936bd1", "#f5ce42"]}
                progressBackgroundColor={'white'}
                progressViewOffset={20}
                />}  
            >
            <View style={styles.container}>
                <View style={styles.tempAndIcon}>
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}></View>
                        <Text style={styles.cityName}>{city.name}  {id === 'current' && <Icon style={styles.currIcon} name={"location"} color={"#FFF"} size={24}/>}</Text>
                            
                            
                        
                        <Text style={styles.cityTemp}>{city.temp}°</Text>
                        <Text style={styles.cityConditions}>{city.weather}</Text>
                    </View>
                    <View>
                        <Animated.Image style={{...styles.icon, transform:[{translateY: toDownAnim}]}} source={icons[city.img]}/>
                    </View>
                </View>
                <View style={styles.extContainer}>
                    <ScrollView style={styles.scroll} horizontal fadingEdgeLength={60}>
                        {
                            city.ext.map(e => <ExtCard key={city.dt} timezone={city.timezone} city={e} />)
                        }
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

const gradient = {
    "01d": ['#2165a8', '#6896c5'],
    "01n": ['#070e21', '#2e3844'],
    "02d": ['#187eb2', '#65a3c5'],
    "02n": ['#070e21', '#2e3844'],
    "03d": ['#597388', '#80a9be'],
    "03n": ['#070e21', '#2e3844'],
    "04d": ['#3f5161', '#597585'],
    "04n": ['#070e21', '#2e3844'],
    "09d": ['#3f5161', '#597585'],
    "09n": ['#070e21', '#2e3844'],
    "10d": ['#3f5161', '#597585'],
    "10n": ['#070e21', '#2e3844'],
    "11d": ['#3f5161', '#597585'],
    "11n": ['#070e21', '#2e3844'],
    "13d": ['#3f5161', '#597585'],
    "13n": ['#070e21', '#2e3844'],
    "50d": ['#3f5161', '#597585'],
    "50n": ['#070e21', '#2e3844'],
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-around'
    },
    tempAndIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cityName: {
        paddingLeft: 6,
        fontSize: 28,
        color: "#FFF",
        width: windowWidth / 2
    },
    cityTemp: {
        fontSize: 100,
        color: "#FFF"
    },
    cityConditions: {
        paddingLeft: 8,
        fontSize: 20,
        color: "#FFF"
    },
    icon: {
        width: 140,
        height: 140
    },
    currIcon: {
        marginLeft: 6
    },
    extContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderRadius: 16,
        overflow: "hidden"
    },
    scroll: {
        paddingVertical: 18
    }
})

const mapStateToProps = (state) => {
    return {
        cities: state.data,
        currentLocation: state.currentLocation,
        isFetching: state.isFetching,
        isRefreshing: state.isRefreshing,
        id: state.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshCities: (cities) => dispatch(refreshCities(cities))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CityDetail)


