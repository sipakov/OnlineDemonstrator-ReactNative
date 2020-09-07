import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native'

const window = Dimensions.get("window");

const Poster = ({ poster, navigation }) => {

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
        padding:10,
        height: 520,
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: '#ed413d',
        width: window.width -20
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
