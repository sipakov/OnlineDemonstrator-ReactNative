import * as React from 'react';
import { View, Text, StyleSheet, Share, FlatList, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import I18n from '../localization/I18n';
import Icon from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns'
import { en, ru } from 'date-fns/locale'

const window = Dimensions.get("window");

const Item = ({ item, goToPoster, currentCulture }) => {
  const dateToString = format(new Date(item.createdDateTime), 'PP', { locale: currentCulture === 'ru' ? ru : en });
  return (
    <TouchableOpacity onPress={() => goToPoster(item.deviceId, item.createdDate, item.demonstrationId)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title.substring(0, 35) + (item.title.length > 35 ? '...' : '')}</Text>
        <Text style={styles.messagePreview}>{item.message}</Text>
        <View style={styles.createdDateContainer}>
          <Text style={styles.createdDate}>{dateToString}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const onShare = async (demonstrationTitle) => {
  try {
    const result = await Share.share({
      message:
      demonstrationTitle,
      url: 'https://apps.apple.com/ru/app/online-demonstrator/id1511424258'
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
console.log(11);
      } else {
        console.log(22);
      }
    } else if (result.action === Share.dismissedAction) {
      console.log(33);
    }
  } catch (error) {
    alert(error.message);
  }
};

const PosterList = ({ posters, goToPoster, currentCulture, demonstrationId, isExpired, demonstrationTitle, navigation }) => {
  const renderItem = ({ item }) => (
    <Item item={item} goToPoster={goToPoster} currentCulture={currentCulture} />
  );

  const getHeader = () => {
    return (
      <View style={styles.listHeader}>
         <TouchableOpacity onPress={() => {onShare(demonstrationTitle)}}>
          <View style={styles.shareButton}>
            <Text style={styles.titleList}>{I18n.t('shareDemonstration') + ' '}</Text>
            <Icon name="share-social-outline" cache='force-cache' style={styles.titleList}></Icon>         
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePosterScreen', { demonstrationId, isExpired })}>
          <View style={styles.addButton}>
            <Text style={styles.titleList}>{I18n.t('addPoster') + '  '}</Text>
            <Icon name="add-outline" cache='force-cache' style={styles.titleList}></Icon>
          </View>
        </TouchableOpacity>
      </View>
    )
  };

  return (   
      <FlatList
        ListHeaderComponent={getHeader}
        data={posters}
        renderItem={renderItem}
        keyExtractor={item => item.deviceId.toString()}
      />   
  )
}

export default PosterList

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 16,
    width: window.width-20
  },
  title: {
    fontSize: 18,
    color: '#ed413d'
  },
  messagePreview: {
    fontSize: 14,
    marginTop: 10
  },
  createdDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  createdDate: {
    fontSize: 14,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listHeader: {
    backgroundColor: '#f2f2f2',
    width: window.width-20,
    marginLeft: 20,
    marginBottom:20,
    marginTop:20,
    //padding: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  titleList: {
    color: '#007AFF',
    fontSize: 18
  },
  addButton:
  { 
    flexDirection: 'row', 
    justifyContent: "flex-end" 
  },
  shareButton:
  { 
    flexDirection: 'row', 
    justifyContent: "flex-start" 
  }
});