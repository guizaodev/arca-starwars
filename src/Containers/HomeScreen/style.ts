import React from 'react';
import {StyleSheet, StatusBar, Dimensions} from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1, 
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    logo:{
        width: 230,
        height: 100,
        resizeMode: 'contain',
        marginTop: 20
    },
    background:{
        flex: 1,
        resizeMode: 'cover',
        width: width,
        height: height,
        alignItems: 'center',
    },
    title:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: -10
    },
    container2:{
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 1,
        width: '95%',
    },
    card:{
        marginVertical: 10,
        borderRadius: 15,
        width: '95%',
        alignSelf: 'center'
    },
    load:{
        alignSelf: 'center',
        marginTop: '50%'
    },
    text:{
        color: 'white'
    },
    teste:{
        flexDirection: 'row'
    }
});

export default styles;