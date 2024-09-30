import {View, Text, useWindowDimensions, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {images} from '../../assets';

const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.containerView}>
      <View style={styles.imageView}>
        <Image source={item.image} style={styles.image} />
        {item.haveArrow ? (
          <>
            <Image source={images.arrow} style={styles.imageArrow} />
            <Image source={images.pdf} style={styles.imagePDF} />
          </>
        ) : (
          <></>
        )}
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export default OnboardingItem;
