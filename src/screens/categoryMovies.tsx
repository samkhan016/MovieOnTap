import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import MovieService from '../api/movieService';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import fonts from '../utils/fonts';
import Theme from '../utils/theme';
import {IMAGE_URL_FROM_ENV} from '@env';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../components/customHeader';
import CustomSearch from '../components/customSearch';
import BackHeader from '../components/backHeader';

export default function CategoryMovies(props?: any) {
  const {category} = props.route.params;
  const [movies, setMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: isSearch
          ? heightPercentageToDP(15)
          : heightPercentageToDP(11.5),
      },
      headerTitle: isSearch
        ? () => (
            <CustomHeader
              isVisible={setIsSearch}
              OnTextChange={setSearchQuery}
              value={searchQuery}
            />
          )
        : 'Watch',
      headerTitleAlign: isSearch ? 'center' : 'left',
      headerLeft: !isSearch
        ? () => <BackHeader onPress={() => props.navigation.goBack()} />
        : null,
      headerRight: () =>
        !isSearch && <CustomSearch setIsSearch={setIsSearch} />,
    });
    if (isSearch == false) setSearchQuery('');
  }, [isSearch, searchQuery]);

  useEffect(() => {
    getMovies();
  }, [page]);

  const getMovies = async () => {
    const movieResponse = await MovieService.getCategoryImages(
      category?.id,
      page,
    );
    setMovies((prev: any) => [...prev, ...movieResponse.results]);
  };

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };

  const filteredCategories = movies.filter((item: any) =>
    item?.original_title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        data={filteredCategories}
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
