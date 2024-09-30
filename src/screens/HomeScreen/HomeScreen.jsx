import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/theme';
import {images} from '../../assets';

const windowWidth = Dimensions.get('screen').width;

const featureList = [
  {
    id: 1,
    title: 'Image to PDF',
    description: 'Choose images to create PDF',
    color: COLORS.secondary,
    colorICons: '#91C2FB',
    icon: images.imageIcon,
    navigation: 'ImageToPDF',
  },
  {
    id: 2,
    title: 'Word to PDF',
    description: 'Choose Word file to convert to PDF',
    color: COLORS.tertiary,
    colorICons: '#FFB292',
    icon: images.wordWhiteIcon,
    navigation: 'DocToPDF',
  },
  {
    id: 3,
    title: 'Excel to PDF',
    description: 'Choose Excel file to convert to PDF',
    color: COLORS.greenlight,
    colorICons: '#8cd8de',
    icon: images.excelWhiteIcon,
    navigation: 'ExcelToPDF',
  },
  {
    id: 4,
    title: 'PowerPoint to PDF',
    description: 'Choose PowerPoint file to convert to PDF',
    color: COLORS.blue,
    colorICons: '#5A8FC0',
    icon: images.powerpointWhiteIcon,
    navigation: 'PowerPointToPDF',
  },
  {
    id: 5,
    title: 'Html to PDF',
    description: 'Write html to create PDF',
    color: COLORS.yellow,
    colorICons: '#fadb84',
    icon: images.htmlIcon,
    navigation: 'HtmlToPDF',
  },
  {
    id: 6,
    title: 'Merge PDF',
    description: "Continue PDF's in the order you want",
    color: COLORS.dardRed,
    colorICons: '#C2555E',
    icon: images.mergeIcon,
    navigation: 'MergePDF',
  },
  {
    id: 7,
    title: 'Split PDF',
    description: 'Separate one page or a whole set',
    color: COLORS.pink,
    colorICons: '#fac3df',
    icon: images.splitIcon,
    navigation: 'SplitPDF',
  },
  {
    id: 8,
    title: 'Compress PDF',
    description: 'Reduce file size while optimizing for quality',
    color: COLORS.violet,
    colorICons: '#d5aded',
    icon: images.imageIcon,
    navigation: 'CompressPDF',
  },
];

const HomeScreen = () => {
  const isDrawerOpen = useDrawerStatus() === 'open';

  const navigation = useNavigation();

  const openAndCloseDrawer = () => {
    if (isDrawerOpen) {
      navigation.closeDrawer();
    } else {
      navigation.openDrawer();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={openAndCloseDrawer} activeOpacity={0.9}>
          <Image source={images.moreIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>PDF Converter</Text>
      <Text style={styles.descriptionText}>
        An ultimate PDF conversion tool for your device
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listView}>
        <FlatList
          data={featureList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.navigation)}
              activeOpacity={0.9}
              style={[styles.featureView, {backgroundColor: item.color}]}>
              <View style={styles.leftView}>
                <View
                  style={[
                    styles.iconsView,
                    {backgroundColor: item.colorICons},
                  ]}>
                  <Image source={item.icon} style={styles.iconStyle} />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.titleTextItem}>{item.title}</Text>
                  <Text style={styles.descriptionTextItem}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <Image source={images.arrowIcon} style={styles.iconStyle} />
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
        <View style={{height: 200}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
