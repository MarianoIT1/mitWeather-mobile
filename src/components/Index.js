import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-native";
import { setCurrentRendered } from "../redux/actions";


const Index = (props) => {

    const navigate = useNavigate();
    const goToCity = (id) => navigate(`/detail/${id}`)
    const goToCurrent = () => navigate(`/detail/current`)
    const [lastLength, setLastLength] = useState(0)

    

    useEffect(() =>
    {   
        if(props.cities.length + (props.currentLocation ? 1 : 0) > lastLength){
        goToCity(props.id-1);
        }
        setLastLength(props.cities.length)
    }, [props.cities.length])

    useEffect(() => {
        if(props.currentLocation !== null && !props.currentWasRendered){
        props.setCurrentRendered()
        goToCurrent()
        }
    }, [props.currentLocation])

    useEffect(() =>
    { 
        if(typeof props.indexRep == 'number') {
            if(props.indexRep === -1) goToCurrent();
            else goToCity(props.cities[props.indexRep].id)
        }
    }, [props.indexRep])

    return (
        <>
            <Outlet />
        </>
    )
    
}

const mapStateToProps = (state) => {
    return {
        id: state.id,
        cities: state.data,
        currentWasRendered: state.currentWasRendered,
        currentLocation: state.currentLocation,
        indexRep: state.indexRep
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentRendered: () => dispatch(setCurrentRendered())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)