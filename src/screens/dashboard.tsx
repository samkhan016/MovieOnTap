import {
  FlatList,
  ImageBackground,
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
import MovieService from '../api/movieService';
import {IMAGE_URL_FROM_ENV} from '@env';
import fonts from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../components/customHeader';
import CustomSearch from '../components/customSearch';

export default function Dashboard(props?: any) {
  const [categories, setCategories] = useState<any>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const genreResponse = await MovieService.getCategories();

    const genreImages = await Promise.all(
      genreResponse.genres.map(async (genre: any) => {
        const movieResponse = await MovieService.getCategoryImages(genre.id, 1);
        const posterPath = movieResponse.results[0]?.poster_path || null;
        return {
          id: genre.id,
          name: genre.name,
          image: posterPath,
        };
      }),
    );
    setCategories(genreImages);
  };

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
      headerRight: () =>
        !isSearch && <CustomSearch setIsSearch={setIsSearch} />,
    });

    if (isSearch == false) setSearchQuery('');
  }, [isSearch, searchQuery]);

  const filteredCategories = categories.filter((item: any) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.item}
        onPress={() =>
          props?.navigation?.navigate('CategoryMovies', {category: item})
        }>
        <ImageBackground
          source={{uri: `${IMAGE_URL_FROM_ENV + item.image}`}}
          style={styles.image}>
          <View style={styles.shadowOverlay} />
          <Text style={styles.text}>{item.name}</Text>
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
        numColumns={2}
        contentContainerStyle={styles.contentCont}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Theme.Cultured},
  contentCont: {
    gap: 10,
    paddingVertical: heightPercentageToDP(2),
  },
  columnWrapper: {
    width: widthPercentageToDP(92),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  item: {
    width: widthPercentageToDP(44.5),
    height: heightPercentageToDP(11.5),
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
  loader: {
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: Theme.White,
    position: 'absolute',
    bottom: heightPercentageToDP(2),
    left: widthPercentageToDP(4),
  },
  searchIcon: {width: 45, height: 45},
});
