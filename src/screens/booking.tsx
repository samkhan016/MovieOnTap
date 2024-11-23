import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Theme from '../utils/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import fonts from '../utils/fonts';
import {generateDates, generateRandomTime} from '../utils/dateTimeGenerator';

export default function Booking(props: any) {
  const {title, date} = props.route.params;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedHall, setSelectedHall] = useState<any>(null);
  const [disabled, setDisabled] = useState(true);
  const [halls] = useState([
    {
      time: generateRandomTime(),
      hallNo: 1,
      statingPrice: 50,
      bonus: 2500,
    },
    {
      time: generateRandomTime(),
      hallNo: 3,
      statingPrice: 50,
      bonus: 2500,
    },
    {
      time: generateRandomTime(),
      hallNo: 4,
      statingPrice: 50,
      bonus: 2500,
    },
    {
      time: generateRandomTime(),
      hallNo: 2,
      statingPrice: 50,
      bonus: 2500,
    },
    {
      time: generateRandomTime(),
      hallNo: 1,
      statingPrice: 50,
      bonus: 2500,
    },
  ]);

  useEffect(() => {
    if (selectedDate != null && selectedHall != null) setDisabled(false);
  }, [selectedDate, selectedHall]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: heightPercentageToDP(14),
      },
      headerTitle: () => (
        <View style={styles().headerCont}>
          <Text style={styles().title}>{title}</Text>
          <Text style={styles().date}>In Theaters {date}</Text>
        </View>
      ),
    });
  }, []);

  const renderDateItem = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles(selectedDate?.label === item.label).dateButton}
      onPress={() => setSelectedDate(item)}>
      <Text style={styles(selectedDate?.label === item.label).dateText}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderHalls = ({item, index}: any) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles(selectedHall?.index == index).hallCont]}
      onPress={() => setSelectedHall({...item, index})}>
      <Text style={styles().hallTime}>
        {item.time}
        <Text
          style={
            styles().hallNumber
          }>{`    Cinetech + hall ${item.hallNo}`}</Text>
      </Text>
      <View style={styles(selectedHall?.index == index).imageCont}>
        <Image
          source={require('../assets/cinema.png')}
          style={styles().cinemaImg}
        />
      </View>

      <Text style={styles().bottomText}>
        From <Text style={styles().price}>{item.statingPrice}$</Text> or
        <Text style={styles().price}> {item.bonus} bonus</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles().container}>
      <Text style={styles().dateTxt}>Date</Text>
      <View>
        <FlatList
          data={generateDates()}
          renderItem={renderDateItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles().dateList}
        />
        <FlatList
          data={halls}
          renderItem={renderHalls}
          keyExtractor={(item, index) => `${item.time}_${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles().hallList}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        disabled={disabled}
        style={styles(disabled).bookButton}
        onPress={() =>
          props?.navigation.navigate('SeatSelection', {
            date,
            title,
            hall: selectedHall,
            selectedDate: selectedDate,
          })
        }>
        <Text style={styles().bookText}>Select Seat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = (props?: any) =>
  StyleSheet.create({
    headerCont: {
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: Theme.Gunmetal,
      lineHeight: 20,
    },
    date: {
      fontSize: 12,
      fontFamily: fonts.medium,
      color: Theme.MayaBlue,
    },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    dateTxt: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: Theme.Gunmetal,
      width: widthPercentageToDP(90),
      alignSelf: 'center',
      marginBottom: heightPercentageToDP(1.4),
    },
    dateList: {
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    dateButton: {
      width: 67,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: props ? Theme.MayaBlue : Theme.Cultured,
      shadowColor: props ? Theme.MayaBlue : Theme.Cultured,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginRight: 10,
    },
    dateText: {
      fontSize: 12,
      fontFamily: fonts.semibold,
      color: props ? Theme.White : Theme.Gunmetal,
    },
    hallList: {
      marginTop: heightPercentageToDP(3.9),
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    hallCont: {
      marginRight: 10,
    },
    hallTime: {
      fontSize: 12,
      fontFamily: fonts.medium,
      color: Theme.Gunmetal,
      lineHeight: 19,
      marginBottom: 5,
    },
    hallNumber: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: Theme.Gray,
    },
    imageCont: {
      width: widthPercentageToDP(63),
      height: heightPercentageToDP(17),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: props ? Theme.MayaBlue : Theme.Cultured,
      borderRadius: 10,
    },
    cinemaImg: {
      width: 144,
      height: 113,
      resizeMode: 'contain',
    },
    bottomText: {
      fontSize: 12,
      fontFamily: fonts.medium,
      color: Theme.Gray,
      marginTop: heightPercentageToDP(1),
    },
    price: {
      fontSize: 12,
      fontFamily: fonts.medium,
      color: Theme.Gunmetal,
    },
    bookButton: {
      marginTop: heightPercentageToDP(22),
      backgroundColor: props ? Theme.Gray : Theme.MayaBlue,
      width: widthPercentageToDP(90),
      height: heightPercentageToDP(6.5),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    bookText: {
      fontFamily: fonts.semibold,
      color: Theme.White,
      fontSize: 14,
    },
  });
