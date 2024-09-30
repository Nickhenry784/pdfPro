import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawlNavigation from './DrawlNavigation';
import {
  CompressPDF,
  DocToPDF,
  ExcelToPDF,
  HtmlToPDF,
  ImageToPDF,
  LanguageScreen,
  MergePDF,
  PDFViewScreen,
  PowerPointToPDF,
  SplitPDF,
} from '../screens';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Drawl">
      <Stack.Screen name="Drawl" component={DrawlNavigation} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="ImageToPDF" component={ImageToPDF} />
      <Stack.Screen name="MergePDF" component={MergePDF} />
      <Stack.Screen name="SplitPDF" component={SplitPDF} />
      <Stack.Screen name="HtmlToPDF" component={HtmlToPDF} />
      <Stack.Screen name="PDFView" component={PDFViewScreen} />
      <Stack.Screen name="DocToPDF" component={DocToPDF} />
      <Stack.Screen name="ExcelToPDF" component={ExcelToPDF} />
      <Stack.Screen name="PowerPointToPDF" component={PowerPointToPDF} />
      <Stack.Screen name="CompressPDF" component={CompressPDF} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
