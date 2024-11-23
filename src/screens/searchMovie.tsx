import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomHeader from '../components/customHeader';
import MovieService from '../api/movieService';
import Theme from '../utils/theme';
import fonts from '../utils/fonts';
import {IMAGE_URL_FROM_ENV} from '@env';

export default function SearchMovie({navigation}: any) {
  const [isSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<any>([]);
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: heightPercentageToDP(15),
      },
      headerLeft: null,
      headerTitle: () => (
        <CustomHeader
          isVisible={() => navigation.goBack()}
          OnTextChange={setSearchQuery}
          value={searchQuery}
        />
      ),
    });
    if (isSearch == false) setSearchQuery('');
  }, [isSearch, searchQuery]);

  useEffect(() => {
    getCategries();
  }, []);

  const getCategries = async () => {
    const genreResponse = await MovieService.getCategories();
    setCategories(genreResponse.genres);
  };

  useEffect(() => {
    getMovies();
  }, [searchQuery]);

  const getMovies = async () => {
    const response = await MovieService.searchMovies(searchQuery);
    const moviesWithGenres = response.results.map((movie: any) => {
      const firstGenreId = movie.genre_ids[0];

      const firstGenreName =
        categories.find((genre: any) => genre.id === firstGenreId)?.name ||
        'Unknown Genre';

      return {...movie, genreName: firstGenreName};
    });

    setMovies(moviesWithGenres);
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() => navigation?.navigate('Details', {movieId: item.id})}>
        <Image
          source={{
            uri: `${IMAGE_URL_FROM_ENV + item.poster_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.titleCont}>
          <Text style={styles.title}>{item.original_title}</Text>
          <Text style={styles.genre}>{item.genreName}</Text>
        </View>
        <Image source={require('../assets/dots.png')} style={styles.dots} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <Text style={styles.result}>
              {searchQuery == ''
                ? 'Enter movie name'
                : movies.length > 0
                ? 'Top Results'
                : 'No Results Found'}
            </Text>
            <View style={styles.borderLine} />
          </>
        )}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        data={movies}
        renderItem={renderItem}
        contentContainerStyle={styles.contentCont}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Theme.Cultured},
  result: {
    width: widthPercentageToDP(90),
    alignSelf: 'center',
    fontSize: 12,
    color: Theme.Gunmetal,
    marginTop: heightPercentageToDP(1),
  },
  borderLine: {
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: Theme.Gainsboro,
    marginVertical: heightPercentageToDP(1),
    width: widthPercentageToDP(90),
  },
  contentCont: {
    gap: 15,
    paddingVertical: heightPercentageToDP(2),
    alignItems: 'center',
    paddingBottom: heightPercentageToDP(10),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: widthPercentageToDP(90),
  },
  image: {
    width: 130,
    height: 100,
    borderRadius: 10,
  },
  titleCont: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: Theme.Gunmetal,
  },
  genre: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: Theme.Gainsboro,
  },
  dots: {
    width: 20,
    height: 4,
  },
});
