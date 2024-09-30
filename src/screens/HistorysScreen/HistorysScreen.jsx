import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Pdf from 'react-native-pdf';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {deleteItem} from '../../redux/historySlice';

const HistorysScreen = () => {
  const history = useSelector(state => state.history.items);
  const [forceUpdate, setForceUpdate] = useState(false);
  const animation = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        animation.value,
        {
          duration: 1000,
        },
        () => {
          animation.value = 0;
        },
      ),
    };
  });

  const dispath = useDispatch();

  const onClickDeleteBtn = id => {
    dispath(deleteItem(id));
    animation.value = 1;
    console.log('Delete thanh cong');
  };

  const navigation = useNavigation();

  const toggleHistoryItemBtn = item => {
    navigation.navigate('PDFView', {
      item: item,
      numberPage: item.numberPage,
      scale: item.scaleNumber,
    });
  };

  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [history]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar} />
      <Text style={styles.titleText}>History</Text>
      <Text style={styles.descriptionText}>List of read PDF files</Text>
      {history.length !== 0 ? (
        <FlatList
          style={{marginTop: 20, paddingBottom: 300}}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={history}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.historyItem}
              key={item.id}
              onPress={() => toggleHistoryItemBtn(item)}
              activeOpacity={0.9}>
              <View style={styles.leftView}>
                <Image source={images.pdfRedIcon} style={styles.pdfImage} />
                <View style={styles.textView}>
                  <Text style={styles.titleTextItem}>
                    {'Read File: ' + item.name}
                  </Text>
                  <Text style={styles.desText}>{'Time: ' + item.dateRead}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => onClickDeleteBtn(item.id)}
                activeOpacity={0.9}>
                <Image source={images.deleteIcon} style={styles.deleteImage} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <></>
      )}
      <Animated.View style={[animationStyle, styles.notification]}>
        <View style={styles.notificationView} />
        <Text style={styles.notificationText}>Delete Success!</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HistorysScreen;
