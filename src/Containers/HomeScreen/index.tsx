import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import { Button, Card, Provider, Portal, Dialog } from 'react-native-paper';
import styles from './style';
const SWLogo = require('../../Midia/star_wars_logo.png');
const StarField = require('../../Midia/star-wars-backgrounds-24.jpg');
import { DotIndicator } from 'react-native-indicators';

export default function HomeScreen(){

    const [page, setPage] = useState(1);
    const [data, setData] = useState();
    const [loadData, setLoadData] = useState(false);
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState();

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    const getData = () => {
        axios.get('https://swapi.dev/api/people/?page='+page)
        .then((res)=>{
            setData(res.data);
        })
        .then(()=>{setLoadData(true);})
    };

    const teste = (item) => {
        console.log(item.name);
    }

    const nextPage = () => {
        if(data.next !== null){
            setLoadData(false);
            setPage(page+1);
        }
    }

    const previousPage = () => {
        if(data.previous !== null){
            setLoadData(false);
            setPage(page-1);
        }
    }    

    useEffect(() => {
            getData();
        },[page])

    return(
        <Provider>
        <View style={styles.container}>
            <ImageBackground source={StarField} style={styles.background}>
                <Image source={SWLogo} style={styles.logo} />
                <Text style={styles.title}>All Characters</Text>
                <Text style={styles.text}>Page {page}</Text>
                <View style={styles.teste}>
                    <Button onPress={()=>{previousPage();}} disabled={!loadData}>
                        <Text style={styles.text}>Previous</Text>
                    </Button>                    
                    <Button onPress={()=>{nextPage();}} disabled={!loadData} >
                        <Text style={styles.text}>Next</Text>
                    </Button>
                </View>


                <ScrollView style={styles.container2}>
                    {!loadData && (
                        <DotIndicator color='white' style={styles.load}/>
                    )}

                    {loadData && data.results.map(item => {
                        return(
                            <Card key={item.url} style={styles.card} onPress={()=>{setCurrent(item);showDialog()}} >
                                <Card.Title title={item.name}/>
                            </Card>
                        )
                    })}

                </ScrollView>

            </ImageBackground>
            { current !== undefined  && (
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>{current.name}</Dialog.Title>
                    <Dialog.Content>
                    <Text>Height: {current.height}cm</Text>
                    <Text>Mass: {current.mass}kg</Text>
                    <Text>Hair: {current.hair_color}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={hideDialog}>Exit</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            )}

        </View>
        </Provider>
    );
}