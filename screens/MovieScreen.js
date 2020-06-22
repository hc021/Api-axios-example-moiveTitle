import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, Button } from 'react-native';
import Colors from '../constants/Colors';
import { search } from '../services/movies'
import { warmUpAsync } from 'expo-web-browser';

export default function MovieScreen({ route }) {
    const [movies, setMovies] = useState([]);
    const [result, setResult] = useState('');
    const [count, setCount] = useState(1);

    useEffect(() => {
        search(route.params.searchTerm, count).then(response => {
            console.log(response);
            setMovies(response.data.Search);
            setResult(response.data.totalResults);
            console.log(response.data.totalResults);
        });
    }, [count]);

    let handleNext = () => {
        setCount(preCount => preCount + 1);
    }
    return (
        <View style={styles.container}>
            <Text style={{fontStyle:'italic', fontSize:18}}>Totle Results: {result}</Text>
            <FlatList
                data={movies}
                //keyExtractor={item=>item.imdbID}
                renderItem={
                    ({ item }) => {
                        return (
                            <View style={styles.imgContainer}>
                                <View style={styles.imgBox}>
                                    <Text style={{fontWeight:'bold'}}>Title: {item.Title}</Text>
                                    <Text>ID: {item.imdbID}</Text>
                                    <Image
                                        style={styles.img}
                                        source={{ uri: item.Poster }}
                                    />
                                </View>
                            </View>
                        );
                    }
                } />
            <Button title="Next" onPress={handleNext} style={styles.nextBtn} />
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        height:'100vh',
        backgroundColor: Colors.mainLight,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    imgContainer: {
        flex:1,
        height:'100vh',
        width: '90vw',  
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 300,
        height: 300,
        marginBottom: 10,
    },
    nextBtn: {
        width: 20,
        height: 10,
    },
    imgBox:{
        width:'90vw',
        alignItems: 'center',
        justifyContent: 'center',
    }
}