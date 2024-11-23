import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import fonts from '../utils/fonts';
import Theme from '../utils/theme';
import {formatDate} from '../utils/dateTimeGenerator';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';

export default function SeatSelection(props?: any) {
  const {title, selectedDate, hall} = props.route.params;
  const zoomableViewRef = createRef<ReactNativeZoomableView>();
  const navigation = useNavigation();
  const [selectedSeats, setSelectedSeats] = useState<any>([]);

  const [seatData, setSeatData] = useState([
    [
      null,
      null,
      null,
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      null,
      null,
      null,
    ],
    [
      null,
      'reserved',
      'available',
      'reserved',
      'available',
      null,
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      null,
      'available',
      'reserved',
      'available',
      'reserved',
      null,
    ],
    [
      null,
      'available',
      'reserved',
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      'reserved',
      'available',
      null,
    ],
    [
      null,
      'available',
      'available',
      'reserved',
      'available',
      null,
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      null,
      'available',
      'reserved',
      'available',
      'available',
      null,
    ],
    [
      'reserved',
      'reserved',
      'available',
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      'available',
      'reserved',
      'reserved',
    ],
    [
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      null,
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      null,
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
    ],
    [
      'reserved',
      'reserved',
      'available',
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      'available',
      'reserved',
      'reserved',
    ],
    [
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      null,
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      null,
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
    ],
    [
      'reserved',
      'reserved',
      'available',
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      'available',
      'reserved',
      'reserved',
    ],
    [
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      null,
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'available',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      null,
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
    ],
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: heightPercentageToDP(14),
      },
      headerTitle: () => (
        <View style={styles().headerCont}>
          <Text style={styles().title}>{title}</Text>
          <Text style={styles().date}>
            {`${formatDate(selectedDate?.fullDate)} I ${hall.time} Hall ${
              hall?.hallNo
            }`}
          </Text>
        </View>
      ),
    });
  }, []);

  const handleSeatPress = (rowIndex: number, seatIndex: number) => {
    setSeatData(prevData =>
      prevData.map((row, i) =>
        row.map((seat, j) => {
          if (i === rowIndex && j === seatIndex) {
            return seat === 'available'
              ? 'selected'
              : seat === 'selected'
              ? 'available'
              : seat;
          }
          return seat;
        }),
      ),
    );
    const data = {
      rowIndex,
      seatIndex,
    };
    setSelectedSeats((prev: any) => [...prev, data]);
  };

  const handleRemoveSelectedSeat = (rowIndex: number, seatIndex: number) => {
    setSeatData(prevData =>
      prevData.map((row, i) =>
        row.map((seat, j) => {
          if (i === rowIndex && j === seatIndex) {
            return 'available';
          }
          return seat;
        }),
      ),
    );
  };

  const renderSeat = (seat: any, rowIndex: number, seatIndex: number) => {
    if (seat === null)
      return <View key={`${rowIndex}-${seatIndex}`} style={styles().gap} />;

    const seatStyle =
      seat === 'reserved'
        ? styles().reservedSeat
        : seat === 'selected'
        ? styles().selectedSeat
        : seat === 'VIP'
        ? styles().vipSeat
        : styles().availableSeat;

    return (
      <TouchableOpacity
        key={`${rowIndex}-${seatIndex}`}
        disabled={seat === 'reserved'}
        onPress={() => handleSeatPress(rowIndex, seatIndex)}>
        <Image
          source={require('../assets/seat.png')}
          style={[styles().seat, seatStyle]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles().mainCont}>
      <View style={styles().viewCont}>
        <ReactNativeZoomableView
          ref={zoomableViewRef}
          maxZoom={30}
          contentWidth={heightPercentageToDP(100)}
          contentHeight={heightPercentageToDP(100)}>
          <Image
            style={styles().screen}
            source={require('../assets/screen.png')}
          />
          <Text style={styles().screenTxt}>SCREEN</Text>

          <FlatList
            scrollEnabled={false}
            data={seatData}
            renderItem={({item, index: rowIndex}) => (
              <View style={styles().row}>
                <Text style={styles().rowNumber}>{rowIndex + 1}</Text>
                {item.map((seat, seatIndex) =>
                  renderSeat(seat, rowIndex, seatIndex),
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles().seatContainer}
          />
        </ReactNativeZoomableView>

        <View style={styles().zoomBtnsCont}>
          <TouchableOpacity
            style={styles().zoomBtn}
            onPress={() => zoomableViewRef.current!.zoomBy(0.5)}>
            <Image
              source={require('../assets/plus.png')}
              style={styles().zoomImg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles().zoomBtn}
            onPress={() => zoomableViewRef.current!.zoomBy(-0.5)}>
            <Image
              source={require('../assets/minus.png')}
              style={styles().zoomImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles().bottomView}>
        <View style={styles().seatRow}>
          <View style={styles().seatColumn}>
            <View style={styles().seatCont}>
              <Image
                source={require('../assets/seat.png')}
                style={styles(Theme.LemonCurry).seatImg}
              />
              <Text style={styles().seatTxt}>Selected</Text>
            </View>
            <View style={styles().seatCont}>
              <Image
                source={require('../assets/seat.png')}
                style={styles(Theme.Liberty).seatImg}
              />
              <Text style={styles().seatTxt}>VIP (150 $)</Text>
            </View>
          </View>

          <View style={styles().seatColumn}>
            <View style={styles().seatCont}>
              <Image
                source={require('../assets/seat.png')}
                style={styles(Theme.Gray).seatImg}
              />
              <Text style={styles().seatTxt}>Not available</Text>
            </View>

            <View style={styles().seatCont}>
              <Image
                source={require('../assets/seat.png')}
                style={styles(Theme.MayaBlue).seatImg}
              />
              <Text style={styles().seatTxt}>Regular (50 $)</Text>
            </View>
          </View>
        </View>

        <ScrollView horizontal>
          {selectedSeats.map((item: any, index: number) => {
            return (
              <View style={styles().selectedSeatCont}>
                <Text style={styles().selectedSeatTxt}>
                  {item.seatIndex} /
                  <Text style={styles().selectedSeatTxt2}>
                    {item.rowIndex + 1} row
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSeats((prevSelectedSeats: any) =>
                      prevSelectedSeats.filter((_, i) => i !== index),
                    );
                    handleRemoveSelectedSeat(item.rowIndex, item.seatIndex);
                  }}>
                  <Image
                    source={require('../assets/close.png')}
                    style={styles().crossImg}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles().priceBtnCont}>
          <View style={styles().totalCont}>
            <Text style={styles().totalTxt}>TotalPrice</Text>
            <Text style={styles().amount}>$ {selectedSeats.length * 50}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} style={styles().payBtn}>
            <Text style={styles().payBtnTxt}>Proceed to Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    mainCont: {
      flex: 1,
    },
    viewCont: {
      flexShrink: 1,
      height: heightPercentageToDP(53),
      width: widthPercentageToDP(100),
      backgroundColor: Theme.Cultured,
    },
    screen: {width: '90%', height: '10%', resizeMode: 'contain'},
    screenTxt: {
      top: heightPercentageToDP(-3),
      fontFamily: fonts.medium,
      color: Theme.Gray,
      fontSize: 8,
    },
    seatContainer: {
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 5,
    },
    rowNumber: {
      fontSize: 5,
      color: Theme.Gunmetal,
      fontFamily: fonts.semibold,
      alignSelf: 'center',
      marginRight: 10,
    },
    seat: {
      width: 7,
      height: 7,
      margin: 2,
    },
    availableSeat: {
      tintColor: Theme.Gray,
    },
    selectedSeat: {
      tintColor: Theme.LemonCurry,
    },
    reservedSeat: {
      tintColor: Theme.MayaBlue,
    },
    vipSeat: {
      tintColor: Theme.Liberty,
    },
    gap: {
      width: 7,
      height: 7,
      margin: 2,
    },
    zoomBtnsCont: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
      alignSelf: 'flex-end',
      bottom: heightPercentageToDP(2),
      right: widthPercentageToDP(3), //
    },
    zoomBtn: {
      backgroundColor: Theme.White,
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: Theme.Black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    zoomImg: {width: 10, height: 10},
    bottomView: {
      width: widthPercentageToDP(90),
      alignSelf: 'center',
      marginTop: heightPercentageToDP(3.1),
    },
    seatRow: {
      flexDirection: 'row',
      gap: 40,
      marginBottom: heightPercentageToDP(1.5),
    },
    seatColumn: {
      gap: 20,
    },
    seatCont: {flexDirection: 'row', gap: 10},
    seatImg: {width: 17, height: 16, tintColor: props},
    seatTxt: {
      fontSize: 12,
      fontFamily: fonts.medium,
      color: Theme.Gray,
    },
    selectedSeatCont: {
      marginTop: heightPercentageToDP(2),
      backgroundColor: Theme.Cultured,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: widthPercentageToDP(30),
      height: heightPercentageToDP(5),
      borderRadius: 10,
      marginRight: 10,
    },
    selectedSeatTxt: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: Theme.Gunmetal,
    },
    selectedSeatTxt2: {
      fontSize: 10,
      fontFamily: fonts.regular,
      color: Theme.Gunmetal,
    },
    crossImg: {width: 20, height: 20},
    priceBtnCont: {
      marginTop: heightPercentageToDP(3),
      flexDirection: 'row',
      gap: 10,
    },
    totalCont: {
      backgroundColor: Theme.Cultured,
      borderRadius: 10,
      width: widthPercentageToDP(25),
      height: heightPercentageToDP(6.5),
      paddingLeft: widthPercentageToDP(5),
      justifyContent: 'center',
    },
    totalTxt: {
      fontSize: 10,
      fontFamily: fonts.regular,
      color: Theme.Gunmetal,
    },
    amount: {
      fontSize: 16,
      color: Theme.Gunmetal,
      fontFamily: fonts.semibold,
    },
    payBtn: {
      flex: 1,
      height: heightPercentageToDP(6.5),
      backgroundColor: Theme.MayaBlue,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    payBtnTxt: {
      fontSize: 16,
      color: Theme.White,
      fontFamily: fonts.semibold,
    },
  });
