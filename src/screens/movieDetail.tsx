import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Theme from '../utils/theme';
import {IMAGE_URL_FROM_ENV} from '@env';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import fonts from '../utils/fonts';
import MovieService from '../api/movieService';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function MovieDetail(props?: any) {
  const {movieId} = props.route.params;
  const [movieDetail, setMovieDetail] = useState<any>({});
  const [playing, setPlaying] = useState(false);
  const [videoDetail, setVideoDetail] = useState<any>({});
  const date = new Date(movieDetail?.release_date);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-US', options);

  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = async () => {
    const response = await MovieService.getMovieDetails(movieId);
    setMovieDetail(response);
    console.log(movieDetail);
  };

  const playTrailer = async () => {
    const response = await MovieService.getMovieTrailer(movieId);
    setVideoDetail(response.results[response.results.length - 1]);
    setPlaying(true);
  };

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const getRandomColor = () => {
    const excludedColors = [
      Theme.White,
      Theme.Gray,
      Theme.BrightGray,
      Theme.Cultured,
      Theme.Gainsboro,
      Theme.TransparentBlack,
      Theme.AntiFlashWhite,
    ];

    const themeColors = Object.values(Theme).filter(
      color => !excludedColors.includes(color),
    );

    return themeColors[Math.floor(Math.random() * themeColors.length)];
  };

  return (
    <View style={styles().container}>
      <StatusBar backgroundColor={Theme.White} />
      {!playing ? (
        <ScrollView bounces={false}>
          <ImageBackground
            source={{
              uri: `${IMAGE_URL_FROM_ENV + movieDetail?.poster_path}`,
            }}
            style={styles().coverImage}>
            <View style={styles().shadowOverlay} />
            <Text style={styles().inTheaters}>In Theaters {formattedDate}</Text>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles().ticketBtn}
              onPress={() =>
                props?.navigation.navigate('Booking', {
                  title: movieDetail?.title,
                  date: formattedDate,
                })
              }>
              <Text style={styles().btnTxt}>Get Tickets</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles().watchBtn}
              onPress={playTrailer}>
              <Image
                source={require('../assets/play.png')}
                style={styles().playImg}
              />
              <Text style={styles().btnTxt}>Watch Trailer</Text>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles().bottomView}>
            <Text style={styles().genreTxt}>Genres</Text>
            <View style={styles().mapCont}>
              {movieDetail?.genres?.map((genre: any) => {
                const randomColor = getRandomColor();
                return (
                  <Text key={genre.id} style={styles(randomColor).mapGenreTxt}>
                    {genre.name}
                  </Text>
                );
              })}
            </View>
            <View style={styles().border} />

            <Text style={styles().genreTxt}>Overview</Text>
            <Text style={styles().overViewTxt}>{movieDetail?.overview}</Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles().youtubeCont}>
          <YoutubePlayer
            height={heightPercentageToDP(78)}
            play={playing}
            videoId={videoDetail?.key}
            onChangeState={onStateChange}
            allowWebViewZoom={true}
            webViewProps={{
              injectedJavaScript: `
                var element = document.getElementsByClassName('container')[0];
                element.style.position = 'unset';
                element.style.paddingBottom = 'unset';
                true;
              `,
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = (props?: any) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: Theme.Cultured},
    coverImage: {
      height: heightPercentageToDP(60),
      width: widthPercentageToDP(100),
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    shadowOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Theme.TransparentBlack,
      borderRadius: 10,
    },
    inTheaters: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: Theme.White,
      marginBottom: heightPercentageToDP(1.5),
    },
    ticketBtn: {
      backgroundColor: Theme.MayaBlue,
      width: widthPercentageToDP(50),
      height: heightPercentageToDP(6.5),
      alignItems: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      marginBottom: heightPercentageToDP(1),
    },
    btnTxt: {
      fontSize: 16,
      fontFamily: fonts.semibold,
      color: Theme.White,
    },
    watchBtn: {
      borderColor: Theme.MayaBlue,
      borderWidth: 1,
      marginBottom: heightPercentageToDP(3.4),
      width: widthPercentageToDP(50),
      height: heightPercentageToDP(6.5),
      alignItems: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    playImg: {width: 8, height: 12},
    bottomView: {
      width: widthPercentageToDP(90),
      alignSelf: 'center',
      marginVertical: heightPercentageToDP(3),
      gap: 10,
    },
    genreTxt: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: Theme.Gunmetal,
    },
    mapCont: {flexDirection: 'row', gap: 10, alignSelf: 'center'},
    mapGenreTxt: {
      color: Theme.White,
      fontSize: 12,
      fontFamily: fonts.semibold,
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 16,
      backgroundColor: props,
    },
    border: {
      borderWidth: 1,
      alignSelf: 'center',
      borderColor: Theme.Gainsboro,
      marginTop: heightPercentageToDP(1),
      width: widthPercentageToDP(90),
    },
    overViewTxt: {
      fontSize: 12,
      fontFamily: fonts.medium,
      color: Theme.Gray,
      lineHeight: 19,
    },
    youtubeCont: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: Theme.Black,
    },
  });
