
import * as Font from 'expo-font';

export const LoadFonts = async () => {

  await Font.loadAsync({
   
    'sans-bold': require('../../assets/fonts/Bahij_TheSansArabic-Bold.ttf'),
    'sans-plain': require('../../assets/fonts/Bahij_TheSansArabic-Plain.ttf'),


  });
}
