import NetInfo from "@react-native-community/netinfo";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SummaryForm } from "../http/api";
// import { Colors } from '../../constants/styles';

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
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  async function submitHandler(credentials) {
    let {
      sales,
      location,
      corporate,
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

    sales = sales.trim();
    location = location.trim();
    corporate = corporate.trim();
    // frequency = frequency.trim();
    // variant = variant.trim();
    // sku = sku.trim();
    // feedback = feedback.trim();
    // purchase = purchase.trim();

    const salesIsValid = sales.length > 2;
    const locationIsValid = location.length > 2;
    const corporateIsValid = corporate.length > 1;
    // const variantIsValid = variant.length > 1;
    // const skuIsValid = sku.length > 1;
    // const feedbackIsvalid = feedback.length > 1;
    // const pricingIsValid = pricing.length > 1;
    // const purchaseIsValid = purchase.length > 1;

    if (
      !salesIsValid ||
      !locationIsValid ||
      !corporateIsValid
    ) {
      Alert.alert("Invalid input", "Please check your input values.");
      setCredentialsInvalid({
        sales: !salesIsValid,
        location: !locationIsValid,
        corporate: !corporateIsValid,
      });
      return;
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
    });
    console.log(credentials, "sending data")
    onAuthenticate(credentials);
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
