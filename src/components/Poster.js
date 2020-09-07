import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native'

const Poster = ({ poster, navigation }) => {

    console.log(poster)
    return (  
            <View style={styles.container}>
                <ScrollView>
                <Text style={styles.title}>{poster?.title}</Text>
                <Text style={styles.message}>{poster?.message}</Text>
                <Text style={styles.name}>{poster?.name}</Text>
                </ScrollView>
            </View>
    );
}
export default Poster

const styles = StyleSheet.create({
    container: {
        width: 380,
        height: 600,
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: '#ed413d'
    },
    title: {
        color: '#ed413d',
        alignSelf: 'center',
        fontSize: 20,
        padding: 20
    },
    message: {
        padding: 10,
        fontSize: 16
    },
    name: {
        padding: 10,
        marginTop: 20,
        alignSelf: 'flex-end',
    }
})
