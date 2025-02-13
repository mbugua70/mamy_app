import { useFonts } from 'expo-font';
import { Text, StyleSheet, Platform } from 'react-native';

const CocaColaTitle = ({size}) => {
  const [fontsLoaded] = useFonts({
    'Coca-Cola': require('../assets/fonts/cocacola.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Render nothing or a fallback UI until the font is loaded
  }

  return <Text style={[styles.title, {fontSize: size}]}>MAMY</Text>;
};

const styles = StyleSheet.create({
  title: {
    // padding: 12,
    paddingHorizontal: 6,
    color: '#043243',
  },
});

export default CocaColaTitle;
