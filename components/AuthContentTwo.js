import NetInfo from "@react-native-community/netinfo";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SummaryForm } from "../http/api";
// import { Colors } from '../../constants/styles';

import { Toast as ToastTwo } from "react-native-toast-message";
import Toast from "react-native-toast-message";
import FormContainerTwo from "./FormContainerTwo";

function AuthContentTwo({
  isPending,
  isSuccess,
  isError,
  isLogin,
  onAuthenticate,
  isMeetingCorp,
  isCorporateMap,
  isEyeClinicScreen,
  isOutComeScreen,
}) {
  const navigation = useNavigation();
  const [resetForm, setResetForm] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    sales: false,
    location: false,
    corporate: false,
    corporatename: false
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      setIsInternetReachable(state.isInternetReachable);

      if(!state.isConnected){
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "No internet connection. Please try again later.",
        });
      }

      if(!state.isInternetReachable){
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "No internet access",
        });
      }
    });

    setTimeout(() => {
     if(unsubscribe()){
      checkNetwork()
     }
    }, 3000)
    return () => unsubscribe();
  }, []);

  async function submitHandler(credentials) {
    let {
      sales,
      location,
      corporate,
      corporateName,
      staff,
      person,
      insurance,
      appointmentdate,
      appointmenttime,
      designation,
      date,
      time,
      talked,
      coupons,
      feedback,
    } = credentials;

    sales = sales.trim()
    location = location.trim();
    corporate = corporate.trim();
    corporateName = corporateName.trim()

    const locationIsValid = location.length > 2;
    const corporateIsValid = corporate.length > 1;
    const salesIsValid = sales.length > 2
    const corporatenameIsValid = corporateName.length > 2


    if(isCorporateMap){
      if (
        !salesIsValid ||
        !locationIsValid ||
        !corporateIsValid
      ) {
        console.log("invalid 1")
        Alert.alert("Invalid input", "Please check your input values.");
        setCredentialsInvalid({
          sales: !salesIsValid,
          location: !locationIsValid,
          corporate: !corporateIsValid,
        });
        return;
      }
    }else if (isEyeClinicScreen || isMeetingCorp || isOutComeScreen){
      if (
        !corporatenameIsValid
      ) {
        console.log("invalid 2")
        Alert.alert("Invalid input", "Please check your input values.");
        setCredentialsInvalid({
          sales: salesIsValid,
          location: locationIsValid,
          corporate: corporateIsValid,
          corporateName: corporatenameIsValid
        });
        return;
      }
    }

    if (isOffline) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "No internet connection. Please try again later.",
      });
      return;
    } else if (!isInternetReachable) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "No internet access",
      });
      return;
    }

    // Submit the form data

    setCredentialsInvalid({
      sales: !salesIsValid,
      corporate: !corporateIsValid,
      location: !locationIsValid,
      corporateName: !corporatenameIsValid
    });
    console.log("called 2")
    onAuthenticate(credentials);
  }


  const checkNetwork = () => {
    if (isOffline) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "No internet connection. Please try again later.",
      });
      return;
    } else if (!isInternetReachable) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "No internet access",
      });
      return;
    }
  }


  return (
    <View style={styles.authContent}>
      <FormContainerTwo
        resetForm={resetForm}
         isSubmiting={isPending}
         isSuccess={isSuccess}
         isError={isError}
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        isMeetingCorp={isMeetingCorp}
        isCorporateMap={isCorporateMap}
        isEyeClinicScreen={isEyeClinicScreen}
        isOutComeScreen={isOutComeScreen}
      />
    </View>
  );
}

export default AuthContentTwo;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    // marginTop: 48,
    paddingTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingBottom: Platform.select({ ios: 20, android: 70 }),
    // backgroundColor: Colors.primary800,
  },
});
