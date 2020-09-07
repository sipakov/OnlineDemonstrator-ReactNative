import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import I18n from '../localization/I18n';
import Icon from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns'
import { en, ru} from 'date-fns/locale'

const Item = ({ item, goToPoster, currentCulture }) => {
  const dateToString = format(new Date(item.createdDate), 'PP', { locale: currentCulture === 'ru' ? ru : en });
  return(
  <TouchableOpacity onPress={() => goToPoster(item.deviceId, item.createdDate)}>
  <View style={styles.item}>
      <Text style={styles.title}>{item.title.substring(0, 35) + (item.title.length > 35 ? '...' : '')}</Text>
      <Text style={styles.messagePreview}>{item.message}</Text>
      <View style={styles.createdDateContainer}>
      <Text style ={styles.createdDate}>{dateToString}</Text>
      </View>
  </View>
  </TouchableOpacity>

)};

const PosterList = ({ posters, goToPoster, currentCulture, demonstrationId, isExpired, navigation }) => {
  const renderItem = ({ item }) => (
    <Item item = {item} goToPoster={goToPoster} currentCulture ={currentCulture}/>
  );

  const getHeader = () => {
    return (  
        <View style={styles.listHeader}>
          <TouchableOpacity onPress={() => navigation.navigate('CreatePosterScreen', {demonstrationId, isExpired})}>
          <View style = {styles.addButton}>
        <Text style={styles.titleList}>{I18n.t('addPoster')+ '  '}</Text>
        <Icon name="add-outline" cache='force-cache'  style={styles.titleList}></Icon>
          </View>
          </TouchableOpacity>
        </View>  
    )
  };

  return (
    <View style = {styles.content}>
      <FlatList
      ListHeaderComponent={getHeader}
        data={posters}
        renderItem={renderItem}
        keyExtractor={item => item.deviceId.toString()}
      />
    </View>

  )
}

export default PosterList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color: '#ed413d'
  },
  messagePreview: {
    fontSize: 14,
    //color: '#888',
    marginTop: 10
  },
  createdDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  createdDate: {
    fontSize: 14,
    //color: '#888'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listHeader:{
    backgroundColor: '#f2f2f2',
    width:400,
    padding: 20,

  },
  titleList: {
    color: '#007AFF',
    fontSize: 18  
}  ,
addButton:
{ flexDirection: 'row', justifyContent: "flex-end"}
});