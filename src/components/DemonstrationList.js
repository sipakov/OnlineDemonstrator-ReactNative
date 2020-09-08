import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import I18n from '../localization/I18n';
import Icon from 'react-native-vector-icons/Ionicons';
import * as RNLocalize from "react-native-localize";
import { format } from 'date-fns'
import { en, ru } from 'date-fns/locale'

const window = Dimensions.get("window");

const Item = ({ item, goToDemo, currentCulture }) => {
  const dateToString = format(new Date(item.demonstrationDate), 'PP', { locale: currentCulture === 'ru' ? ru : en });
//item.demonstrationTitle ='За свободные выборы и справедливые цены на бензин'
  return (
    <TouchableOpacity onPress={() => goToDemo(item.id, currentCulture, item.isExpired)}>
      <View style={item.isExpired ? styles.itemExpired : styles.item}>
      <View style={styles.horizontal}>
          <Text style={item.isExpired ? styles.expiredDemoTitle : styles.demoTitle}>{item.demonstrationTitle !== null ? item.demonstrationTitle?.substring(0, 35) + (item.demonstrationTitle?.length > 35 ? '...' : '') : ''}</Text>
        </View>
        <View style={styles.horizontal}>
          <Text style={item.isExpired ? styles.expiredDemoTitle : styles.title}>{item.detailName}</Text>
          <Icon name={item.isExpired ? "repeat-outline" : "paper-plane-outline"} size={20} cache='force-cache' style={item.isExpired ? styles.expiredItemElement : styles.itemElement} color={item.isExpired ? "#8a9094" : null}></Icon>
        </View>
        
        <View style={styles.horizontal}>
          <View style={styles.horizontalStart}>
            <Text style={item.isExpired ? styles.expiredItemElement : styles.itemElement}>{dateToString}</Text>
          </View>
          <View style={styles.horizontalEnd}>
            <Text style={item.isExpired ? styles.expiredItemElement : styles.itemElement}>{item.isExpired ? I18n.t('expiredDemonstration') + '   ' : null}</Text>
            <Text style={item.isExpired ? styles.expiredItemElement : styles.itemElement}>{item.postersCount + ' '}</Text>
            <Icon name="people-outline" size={16} cache='force-cache' style={item.isExpired ? styles.expiredItemElement : styles.itemElement}></Icon>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  )
};

const getHeader = () => {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.titleList}>{I18n.t('titleList')}</Text>
    </View>
  )
};

const DemonstrationList = ({ demos, goToDemo }) => {

  const currentCulture = RNLocalize.getLocales()[0].languageCode;
  const renderItem = ({ item }) => (
    <Item item={item} goToDemo={goToDemo} currentCulture={currentCulture} />
  );
  if (demos === 'undefined') {
    return (Alert.alert(
      I18n.t('notification'),
      I18n.t('commonErrorMessage'),
      [
        { text: I18n.t('OK') }
      ],
      { cancelable: false }
    ))
  }

  return (
    <View style={styles.content}>
      <FlatList
        ListHeaderComponent={getHeader}
        showsHorizontalScrollIndicator={false}
        data={demos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}
export default DemonstrationList

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 1,
    borderLeftWidth: 10,
    borderLeftColor: '#222f64',
    paddingBottom: 10,
    width: window.width-20
  },
  itemExpired: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 1,
    borderLeftWidth: 10,
    borderLeftColor: '#8a9094',
    width: window.width-20
  },
  title: {
    fontSize: 16,
    color: '#222f64',
    fontWeight: '400'
  },
  expiredTitle: {
    fontSize: 16,
    color: '#8a9094',
    fontWeight: '400'
  },
  demoTitle: {
    marginBottom:10,
    fontSize: 16,
    color: '#ed413d',
    fontWeight: '500'
  },
  expiredDemoTitle: {
    marginBottom:10,
    fontSize: 16,
    color: '#8a9094',
    fontWeight: '500'
  },
  goToPosters: {
    fontSize: 12,
    color: '#272c30'
  },
  expiredGoToPosters: {
    fontSize: 12,
    color: '#8a9094'
  },
  content: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  horizontalEnd: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginTop: 10
  },
  horizontalStart: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginTop: 10,
    marginStart: 20
  },
  expiredItemElement: {
    color: '#8a9094',
    fontWeight: '300'
  },
  itemElement: {
    fontWeight: '300',
    color:'#222f64'
  },
  listHeader: {
    backgroundColor: '#f2f2f2',
    width: window.width-20
  },
  titleList: {
    color: '#656565',
    padding: 20,
    fontSize: 15
  }
});