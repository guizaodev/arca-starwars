import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, ImageBackground, Platform, StatusBar} from 'react-native';
import { Button, Card } from 'react-native-paper';
import styles from './style';
const SWLogo = require('../../Midia/star_wars_logo.png');
const StarField = require('../../Midia/star-wars-backgrounds-24.jpg');

export default function HomeScreen(){

    const [page, setPage] = useState(0);
    const [data, setData] = useState();
    const [loadData, setLoadData] = useState(false);

    const getData = () => {
        axios.get('https://swapi.dev/api/people/?page=1')
        .then((res)=>{
            setData(res.data);
        })
        .then(()=>{setLoadData(true);})
    };

    useEffect(() => {
            console.log('oi');
            getData();
        },[])

    return(
        <View style={styles.container}>
            <ImageBackground source={StarField} style={styles.background}>
                <Image source={SWLogo} style={styles.logo} />
                <Text style={styles.text}>Todos os Personagens</Text>
                <Button onPress={()=>{setPage(page+1); console.log('Height on: ', Platform.OS, StatusBar.currentHeight);}}>
                    Console: {page}
                </Button>
                <Button onPress={()=>{setPage(0);}}>
                    Reset
                </Button>

                <ScrollView style={styles.container2}>

                    {loadData && data.results.map(item => {
                        return(
                            <Card key={item.url} style={styles.card} >
                                <Card.Title title={item.name}/>
                            </Card>
                        )
                    })}

                </ScrollView>

            </ImageBackground>
        </View>
    );
}