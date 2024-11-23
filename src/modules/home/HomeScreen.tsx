import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {HomeScreenViewModel} from './HomeScreenViewModel';
import {
  DotaHero,
  DotaHeroAttribute,
  DotaHeroModel,
} from '../../models/DotaHero';
import {AppColors} from '../../constants/AppColors';

import * as Icons from 'react-native-heroicons/solid';

const {width: screenWidth} = Dimensions.get('window');

type HomeScreenProps = {
  navigation: any;
};

const attributeIconMap = {
  [DotaHeroAttribute.Strength]: require('../../../assets/images/hero_strength.png'),
  [DotaHeroAttribute.Agility]: require('../../../assets/images/hero_agility.png'),
  [DotaHeroAttribute.Intelligence]: require('../../../assets/images/hero_intelligence.png'),
  [DotaHeroAttribute.Universal]: require('../../../assets/images/hero_universal.png'),
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {heroes, loading} = HomeScreenViewModel();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../assets/images/dota2_logo_color.png')}
          style={styles.navbarLogo}
        />
      ),
      headerStyle: {
        backgroundColor: AppColors.primaryBlack,
      },
      headerTintColor: '#FFFFFF',
    });
  }, [navigation]);

  const [selectedAttribute, setSelectedAttribute] =
    useState<DotaHeroAttribute | null>(null);

  const [sortAsc, setSortAsc] = useState<Boolean>(true);

  const [searchText, setSearchText] = useState<string>('');

  const onTapAttribute = (attribute: DotaHeroAttribute) => {
    setSelectedAttribute(prev => (prev === attribute ? null : attribute));
  };

  const filteredHeroes = (): DotaHero[] => {
    let result: DotaHero[] = heroes;

    if (selectedAttribute) {
      result = result.filter(hero => hero.primaryAttr === selectedAttribute);
    }

    if (searchText.trim() !== '') {
      const lowerSearchText = searchText.trim().toLowerCase();
      result = result.filter(hero =>
        (hero.localizedName ?? '').toLowerCase().includes(lowerSearchText),
      );
    }

    result = result.sort((a, b) => {
      const nameA = (a.localizedName ?? '').toLowerCase();
      const nameB = (b.localizedName ?? '').toLowerCase();

      if (sortAsc) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return result;
  };

  var numColumns: number = 2;
  while (screenWidth / (numColumns + 1) > 200) {
    numColumns += 1;
  }

  const tileWidth = screenWidth / numColumns;

  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpg')}
      style={styles.backgroundImage}
      imageStyle={{resizeMode: 'cover'}}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: AppColors.primaryBlack,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.navbar}>
              <TouchableOpacity
                onPress={() => onTapAttribute(DotaHeroAttribute.Strength)}
                style={{marginRight: 16}}>
                <Image
                  source={require('../../../assets/images/hero_strength.png')}
                  style={[
                    styles.filterAttributeIcon,
                    {
                      opacity:
                        selectedAttribute == DotaHeroAttribute.Strength
                          ? 1
                          : 0.25,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onTapAttribute(DotaHeroAttribute.Agility)}
                style={{marginRight: 16}}>
                <Image
                  source={require('../../../assets/images/hero_agility.png')}
                  style={[
                    styles.filterAttributeIcon,
                    {
                      opacity:
                        selectedAttribute == DotaHeroAttribute.Agility
                          ? 1
                          : 0.25,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onTapAttribute(DotaHeroAttribute.Intelligence)}
                style={{marginRight: 16}}>
                <Image
                  source={require('../../../assets/images/hero_intelligence.png')}
                  style={[
                    styles.filterAttributeIcon,
                    {
                      opacity:
                        selectedAttribute == DotaHeroAttribute.Intelligence
                          ? 1
                          : 0.5,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onTapAttribute(DotaHeroAttribute.Universal)}>
                <Image
                  source={require('../../../assets/images/hero_universal.png')}
                  style={[
                    styles.filterAttributeIcon,
                    {
                      opacity:
                        selectedAttribute == DotaHeroAttribute.Universal
                          ? 1
                          : 0.25,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.navbar}>
              <TouchableOpacity
                onPress={() => {
                  setSortAsc(!sortAsc);
                }}
                style={{marginRight: 16}}>
                {sortAsc ? (
                  <Icons.ArrowDownIcon size={24} color={'#FFFFFF'} />
                ) : (
                  <Icons.ArrowUpIcon size={24} color={'#FFFFFF'} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Icons.HeartIcon size={24} color={'#FFFFFF'} />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search heroes..."
            placeholderTextColor="#AAA"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <FlatList
          data={filteredHeroes()}
          numColumns={numColumns > 2 ? numColumns : 2}
          keyExtractor={item => item.id?.toString() ?? '0'}
          style={styles.flatList}
          renderItem={({item}) => (
            <View style={[styles.heroTile, {width: tileWidth}]}>
              <ImageBackground
                source={{uri: DotaHeroModel.imageUrl(item)}}
                style={styles.heroImageBackground}>
                <View style={styles.heroInfo}>
                  {item.primaryAttr && (
                    <Image
                      source={attributeIconMap[item.primaryAttr]}
                      style={styles.attributeIcon}
                    />
                  )}
                  <Text style={styles.heroName}>{item.localizedName}</Text>
                </View>
              </ImageBackground>
            </View>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  navbarLogo: {
    width: 100,
    height: 44,
    resizeMode: 'contain',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  flatList: {
    flex: 1,
    marginRight: 2,
  },
  heroTile: {
    margin: 2,
    aspectRatio: 16 / 9,
  },
  heroImageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroInfo: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 8,
    alignItems: 'center',
  },
  filterAttributeIcon: {
    width: 32,
    height: 32,
  },
  attributeIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  heroName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  navbarTitle: {
    color: AppColors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    color: AppColors.primary,
    fontSize: 16,
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    color: '#FFF',
    backgroundColor: AppColors.tertiary,
  },
});

export default HomeScreen;
