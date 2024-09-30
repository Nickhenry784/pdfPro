/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {BackBtn} from '../../components';
import i18next, {
  languageIcons,
  languageResources,
} from '../../services/i18next';
import languagesList from '../../services/languagesList.json';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../redux/settingSlice';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {images} from '../../assets';

const LanguageScreen = () => {
  const dispatch = useDispatch();
  const [language, changeLanguage] = useState();
  const [languageLast, changeLanguageLast] = useState();
  const setting = useSelector(state => state.setting);
  const navigation = useNavigation();

  useEffect(() => {
    changeLanguageLast(setting.language);
    changeLanguage(setting.language);
  }, []);

  const onChangeLanguages = lng => {
    changeLanguageLast(language);
    changeLanguage(lng);
  };

  const onClickConfigBtn = () => {
    dispatch(setLanguage(language));
    i18next.changeLanguage(language);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <BackBtn />
      </View>
      <View style={styles.contentView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Language</Text>
          <TouchableOpacity
            disabled={languageLast !== language ? false : true}
            onPress={onClickConfigBtn}
            style={[
              styles.btnConfig,
              languageLast !== language
                ? {backgroundColor: COLORS.primary}
                : {backgroundColor: COLORS.gray},
            ]}>
            <Image source={images.checkmarkIcon} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={Object.keys(languageResources)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.itemView,
                language === item
                  ? {borderColor: COLORS.primary, borderWidth: 1}
                  : {borderBottomWidth: 1, borderBottomColor: COLORS.gray},
              ]}
              onPress={() => onChangeLanguages(item)}>
              <Image source={languageIcons[item]} style={{marginRight: 16}} />
              <Text style={styles.languageText}>
                {languagesList[item].nativeName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default LanguageScreen;
