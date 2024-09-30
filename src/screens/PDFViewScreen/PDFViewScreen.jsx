import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Pdf from 'react-native-pdf';
import {styles} from './styles';
import {BottomBar} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addItem, updateItem} from '../../redux/historySlice';

const PDFViewScreen = ({route}) => {
  const {item, numberPage, scale} = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [scaleNumber, setScaleNumber] = useState(1);

  const pdfRef = useRef(null);

  const navigation = useNavigation();

  const dispath = useDispatch();

  const source = {
    uri: item.path,
    cache: true,
  };

  const onPageChanged = (page, numberOfPages) => {
    setCurrentPage(page);
  };

  const onScaleChanged = scaleNumber => {
    setScaleNumber(scaleNumber);
  };

  const setScaleMinusBtn = () => {
    if (pdfRef.current) {
      let scale = scaleNumber - 0.5;
      if (scale < 1) {
        scale = 1;
      }
      pdfRef.current.setNativeProps({scale});
    }
  };

  const setScalePlusBtn = () => {
    if (pdfRef.current) {
      let scale = scaleNumber + 0.5;
      if (scale > 3) {
        scale = 3;
      }
      pdfRef.current.setNativeProps({scale});
    }
  };

  const goToNextPage = () => {
    if (pdfRef.current) {
      pdfRef.current.setPage(currentPage + 1);
    }
  };

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const goToPrevPage = () => {
    if (pdfRef.current) {
      pdfRef.current.setPage(currentPage - 1);
    }
  };

  const toggleBackBtn = () => {
    const timestamp = Date.now();
    const date = formatDate(timestamp);
    if (item.id !== undefined) {
      const updatedValues = {
        name: item.name,
        path: item.path,
        numberPage: currentPage,
        scale: scaleNumber,
        dateRead: date,
      };
      const id = item.id;
      dispath(updateItem({id, updatedValues}));
    } else {
      dispath(
        addItem({
          name: item.name,
          path: item.path,
          numberPage: currentPage,
          scale: scaleNumber,
          dateRead: date,
        }),
      );
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pdf
        ref={pdfRef}
        page={numberPage}
        scale={scale}
        trustAllCerts={false}
        source={source}
        maxScale={3.0}
        minScale={1.0}
        onPageChanged={onPageChanged}
        onScaleChanged={onScaleChanged}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      <BottomBar
        numberOfPages={currentPage}
        toggleBackBtn={toggleBackBtn}
        toggleZoomMinusBtn={setScaleMinusBtn}
        toggleZoomPlusBtn={setScalePlusBtn}
        toggleNextPageBtn={goToNextPage}
        toggleBackPageBtn={goToPrevPage}
      />
    </View>
  );
};

export default PDFViewScreen;
