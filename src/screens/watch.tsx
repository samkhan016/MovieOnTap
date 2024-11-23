import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../utils/theme';
import MovieService from '../api/movieService';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {IMAGE_URL_FROM_ENV} from '@env';
import fonts from '../utils/fonts';

export default function Watch(props?: any) {
  const [movies, setMovies] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovies(page);
  }, [page]);

  const getMovies = async (pageNumber: number) => {
    const response = await MovieService.getMovies(pageNumber);
    setMovies((prev: any) => [...prev, ...response.results]);
  };

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() =>
          props?.navigation?.navigate('Details', {movieId: item.id})
        }>
        <ImageBackground
          source={{
            uri: `${IMAGE_URL_FROM_ENV + item.poster_path}`,
          }}
          style={styles.image}>
          <View style={styles.shadowOverlay} />
          <Text style={styles.text}>{item.original_title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}_${index}`}
        data={movies}
        renderItem={renderItem}
        contentContainerStyle={styles.contentCont}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Theme.Cultured},
  contentCont: {
    gap: 10,
    paddingVertical: heightPercentageToDP(2),
    alignItems: 'center',
  },
  item: {
    width: widthPercentageToDP(92),
    height: heightPercentageToDP(21),
    backgroundColor: Theme.White,
    borderRadius: 10,
    overlayColor: Theme.Gunmetal,
    shadowColor: Theme.Gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shadowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.TransparentBlack,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: Theme.White,
    position: 'absolute',
    bottom: heightPercentageToDP(2),
    left: widthPercentageToDP(4),
    width: widthPercentageToDP(80),
  },
});
