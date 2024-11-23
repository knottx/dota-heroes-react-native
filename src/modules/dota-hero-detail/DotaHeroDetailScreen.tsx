import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  DotaHero,
  DotaHeroAttackType,
  DotaHeroAttribute,
  DotaHeroAttributeUtils,
  DotaHeroModel,
} from '../../models/DotaHero';
import {AppColors} from '../../constants/AppColors';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'DotaHeroDetailScreen'>;

const DotaHeroDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {hero} = route.params;

  const attributeIconMap = {
    [DotaHeroAttribute.Strength]: require('../../../assets/images/hero_strength.png'),
    [DotaHeroAttribute.Agility]: require('../../../assets/images/hero_agility.png'),
    [DotaHeroAttribute.Intelligence]: require('../../../assets/images/hero_intelligence.png'),
    [DotaHeroAttribute.Universal]: require('../../../assets/images/hero_universal.png'),
  };

  const attackTypeIconMap = {
    [DotaHeroAttackType.Melee]: require('../../../assets/images/melee.svg'),
    [DotaHeroAttackType.Ranged]: require('../../../assets/images/ranged.svg'),
  };

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
      headerBackTitle: '',
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../../assets/images/background.jpg')}
      style={{flex: 1}}
      imageStyle={{resizeMode: 'cover'}}>
      <SafeAreaView>
        <View style={{margin: 16}}>
          <View style={{flexDirection: 'row', marginBottom: 16}}>
            {hero.primaryAttr && (
              <Image
                source={attributeIconMap[hero.primaryAttr]}
                style={{width: 24, height: 24, marginRight: 8}}
              />
            )}
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {DotaHeroAttributeUtils.getTitle(hero.primaryAttr!)}
            </Text>
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 32,
              fontWeight: 'bold',
              marginBottom: 16,
            }}>
            {hero.localizedName}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={{
                  color: AppColors.secondary,
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}>
                {'ATTACK TYPE'}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={attackTypeIconMap[hero.attackType!]}
                  style={{width: 24, height: 24, marginRight: 8}}
                />
                <Text
                  style={{
                    color: AppColors.primary,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {hero.attackType?.toUpperCase()}
                </Text>
              </View>
            </View>
            <Image
              source={{uri: DotaHeroModel.potraitImageUrl(hero)}}
              style={{aspectRatio: 1, width: '75%'}}></Image>
          </View>
        </View>
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
});

export default DotaHeroDetailScreen;
