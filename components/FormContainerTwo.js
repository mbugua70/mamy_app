import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchRecordDataSearch } from "../http/api";
import { Notifier, NotifierComponents } from "react-native-notifier";

import Toast from "react-native-toast-message";
import InputTwo from "./InputTwo";
import FlatButton from "../UI/FlatButton";
import DropdownComponent from "./Dropdown";
import LocationPicker from "./LocationPicker";
import SearchComp from "./SearchComp";
import { GlobalStyles } from "../Constants/Globalcolors";

const data = {
  locationData: [
    { label: "Westlands", value: "Westlands" },
    { label: "CBD", value: "CBD" },
    { label: "Imara Mall", value: "Imara Mall" },
  ],
  staffData: [
    { label: "A : 500 staff and above", value: "A : 500 staff and above" },
    { label: "B : 100 – 500 Staff", value: "B : 100 – 500 Staff" },
    { label: "C : 50 – 100 staff", value: "C : 50 – 100 staff" },
    { label: "D : 20 – 50 staff", value: "D : 20 – 50 staff" },
    { label: "E:- < 20 staff", value: "E:- < 20 staff" },
  ],
  frequency: [
    { label: "Weekly", value: "Weekly" },
    { label: "Daily", value: "Daily" },
    { label: "Yearly", value: "Yearly" },
  ],
  sku: [
    { label: "300ml", value: "300ml" },
    { label: "500ml", value: "500ml" },
    { label: "1L", value: "1L" },
  ],
};

/**
 *
 *
 * @param {*} {
 *   isSuccess,
 *   isError,
 *   isLogin,
 *   onSubmit,
 *   credentialsInvalid,
 *   isSubmiting,
 *   resetForm,
 *   isMeetingCorp,
 *   isCorporateMap,
 *   isEyeClinicScreen,
 *   isOutComeScreen,
 * }
 * @return {*}
 */
/**
 *
 *
 * @param {*} {
 *   isSuccess,
 *   isError,
 *   isLogin,
 *   onSubmit,
 *   credentialsInvalid,
 *   isSubmiting,
 *   resetForm,
 *   isMeetingCorp,
 *   isCorporateMap,
 *   isEyeClinicScreen,
 *   isOutComeScreen,
 * }
 * @return {*}
 */
const FormContainerTwo = ({
  isSuccess,
  isError,
  isLogin,
  onSubmit,
  credentialsInvalid,
  isSubmiting,
  resetForm,
  isMeetingCorp,
  isCorporateMap,
  isEyeClinicScreen,
  isOutComeScreen,
}) => {
  const dataFetched = [
    "Apple",
    "Banana",
    "Cherry",
    "Mango",
    "Grapes",
    "Pineapple",
  ];
  const [enteredCorporate, setEnteredCorporate] = useState("");
  const [enteredSales, setEnteredSales] = useState("");
  const [enteredPerson, setEnteredPerson] = useState("");
  const [enteredStaff, setEnteredStaff] = useState("");
  const [enteredFirms, setEnteredFirms] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredAppointDate, setEnteredAppointDate] = useState("");
  const [enteredTimeAppointment, setEnteredTimeAppointment] = useState("");
  const [enteredDesignation, setEnteredDesignation] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [enteredNoStaffTalk, setEnteredNoStaffTalk] = useState("");
  const [enteredCoupons, setEnteredCoupons] = useState("");
  const [enteredFeedback, setEnteredFeedback] = useState("");
  const [enteredCorporateName, setEnteredCorporateName] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState("");

  const navigaton = useNavigation();

  // userRefs for input fields to be used in the form
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);
  const inputRef7 = useRef(null);
  const inputRef8 = useRef(null);
  const inputRef9 = useRef(null);
  const inputRef10 = useRef(null);
  const inputRef11 = useRef(null);
  const inputRef12 = useRef(null);

  const {
    location: locationIsInvalid,
    corporate: corporateIsInvalid,
    sales: salesIsInvalid,
    corporateName: corporatenameIsValid,
  } = credentialsInvalid;

  // mutation

  const {
    data: dataSearch,
    mutate,
    isError: isErrorSearch,
    error: ErrorSearch,
    isPending: isPendingSearch,
    isSuccess: isSuccessSearch,
  } = useMutation({
    mutationFn: fetchRecordDataSearch,
    // the code below will wait the request to finish before moving to another page.
    onMutate: async (data) => {
      return data;
    },

    onSuccess: (data) => {
      const parsedData = JSON.parse(data);

      if (parsedData.response === "fail") {
        Toast.show({
          type: "error",
          text1: "Failed to search",
          text2: "Failed to search the corporate name, Please try again!",
        });
      }

      if (parsedData.response === "success") {
        if (parsedData.message === "Data Found") {
          const fetchedData = parsedData.corporates.map((item) => item.name);
          setFilteredData(fetchedData);
        }

        if (parsedData.message === "No Data Found") {
          setFilteredData([]);
        }
      }
    },
  });

  // offline and internet configuration

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      setIsInternetReachable(state.isInternetReachable);
    });

    setTimeout(() => {
      if (unsubscribe()) {
        checkNetwork();
      }
    }, 3000);
    return () => unsubscribe();
  }, []);

  const handleSearch = (text) => {
    const textFormatted = text.trim();

    if (isOffline) {
      Notifier.showNotification({
        title: "Network Error",
        description: "No network access, Please check your network!",
        Component: NotifierComponents.Notification,
        componentProps: {
          imageSource: require("../assets/image/no-internet.png"),
          containerStyle: { backgroundColor: GlobalStyles.colors.error500 },
          titleStyle: { color: "#fff" },
          descriptionStyle: { color: "#fff" },
        },
      });

      return;
    } else if (!isInternetReachable) {
      Notifier.showNotification({
        title: "Network Error",
        description: "No internet access",
        Component: NotifierComponents.Notification,
        componentProps: {
          imageSource: require("../assets/image/no-network.png"),
          containerStyle: { backgroundColor: GlobalStyles.colors.error500 },
          titleStyle: { color: "#fff" },
          descriptionStyle: { color: "#fff" },
        },
      });
      return;
    }

    if (textFormatted.length === 0) {
      setFilteredData([]); // Clear search results immediately
      setQuery("");
      return; // Prevent mutation from being called
    }

    // Add a small delay before calling the mutation (debouncing effect)
    setTimeout(() => {
      mutate(text);
    }, 100);
  };

  // onchange func handler

  function updateInputValueHandler(inputType, enteredValue) {
    if (inputType === "corporate name") {
      if (!selected) {
        handleSearch(enteredValue);
      }
    }

    switch (inputType) {
      case "corporate":
        setEnteredCorporate(enteredValue);
        break;
      case "person":
        setEnteredPerson(enteredValue);
        break;
      case "staff":
        setEnteredStaff(enteredValue);
        break;
      case "location":
        setEnteredLocation(enteredValue);
        break;
      case "sales":
        setEnteredSales(enteredValue);
        break;
      case "insurance":
        setEnteredFirms(enteredValue);
        break;
      case "appointmentdate":
        setEnteredAppointDate(enteredValue);
        break;
      case "appointmenttime":
        setEnteredTimeAppointment(enteredValue);
        break;
      case "designation":
        setEnteredDesignation(enteredValue);
        break;
      case "date":
        setEnteredDate(enteredValue);
        break;
      case "time":
        setEnteredTime(enteredValue);
        break;
      case "talked":
        setEnteredNoStaffTalk(enteredValue);
        break;
      case "coupons":
        setEnteredCoupons(enteredValue);
        break;
      case "feedback":
        setEnteredFeedback(enteredValue);
        break;
      case "corporate name":
        setEnteredCorporateName(enteredValue);
        break;
    }
  }

  // select on search handler

  const handleSelectSearch = (item) => {
    if (item) {
      // updateInputValueHandler(this, "corporate name",)
      setEnteredCorporateName(item);
      setSelected(item);
      setQuery(item);
      setFilteredData([]);
    }
  };

  // submit to db

  function submitHandler() {
    let syntaxDateOne = enteredAppointDate.replace(/\//g, "-");
    let syntaxDateTwo = enteredDate.replace(/\//g, "-");
    // date and time validation
    let dateFormattedOne = new Date(syntaxDateOne);
    let dateFormattedTwo = new Date(syntaxDateTwo);

    if (enteredAppointDate !== "") {
      if (isNaN(dateFormattedOne.getDate())) {
        Toast.show({
          type: "error",
          text1: "Wrong Date  format",
          text2: " Invalid date input",
        });
        return;
      } else {
        dateFormattedOne = dateFormattedOne.toISOString().split("T")["0"];
      }
    }

    if (enteredDate !== "") {
      if (isNaN(dateFormattedTwo.getDate())) {
        Toast.show({
          type: "error",
          text1: "Wrong Date  format",
          text2: " Invalid date input",
        });
        return;
      } else {
        dateFormattedTwo = dateFormattedTwo.toISOString().split("T")["0"];
      }
    }

    onSubmit({
      sales: enteredSales,
      location: enteredLocation,
      corporate: enteredCorporate,
      corporateName: enteredCorporateName,
      staff: enteredStaff,
      person: enteredPerson,
      insurance: enteredFirms,
      appointmentdate: dateFormattedOne,
      appointmenttime: enteredTimeAppointment,
      designation: enteredDesignation,
      date: dateFormattedTwo,
      time: enteredTime,
      talked: enteredNoStaffTalk,
      coupons: enteredCoupons,
      feedback: enteredFeedback,
    });
  }

  // clearing the inputs fields
  useEffect(() => {
    if (isSuccess && !isError && !isSubmiting) {
      setEnteredLocation("");
      setEnteredFirms("");
      setEnteredCorporate("");
      setEnteredStaff("");
      setEnteredFirms("");
      setEnteredAppointDate("");
      setEnteredTimeAppointment("");
      setEnteredDesignation("");
      setEnteredDate("");
      setEnteredNoStaffTalk("");
      setEnteredCoupons("");
      setEnteredPerson("");
      setEnteredSales("");
      setEnteredTime("");
      setEnteredDate("");
      setEnteredCorporateName("");
    }
  }, [isSuccess, isError, isSubmiting]);

  // error when fetching

  useEffect(() => {
    if (ErrorSearch && !isPendingSearch) {
      Toast.show({
        type: "error",
        text1: "Failed to search",
        text2: ErrorSearch.message,
      });
    } else if (ErrorSearch === "TOO_MANY_ATTEMPTS_TRY-LATER" && !isPending) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Too many attempts try later",
      });
    }
  }, [ErrorSearch, isPendingSearch]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'>
          {isCorporateMap && (
            <DropdownComponent
              label='Location'
              data={data.locationData}
              value={enteredLocation}
              onUpdateValue={updateInputValueHandler.bind(this, "location")}
              ref={inputRef1}
            />
          )}
          {isCorporateMap && (
            <InputTwo
              label='Sales Representative'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "sales")}
              value={enteredSales}
              isInvalid={salesIsInvalid}
              placeholder='Enter  name'
            />
          )}

          {isCorporateMap && (
            <InputTwo
              label='Corporate Name'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "corporate")}
              value={enteredCorporate}
              isInvalid={corporateIsInvalid}
              placeholder='Enter corporate name'
            />
          )}

          {isCorporateMap && (
            <DropdownComponent
              label='Approximate Number of staffs'
              data={data.staffData}
              value={enteredStaff}
              onUpdateValue={updateInputValueHandler.bind(this, "staff")}
              ref={inputRef3}
            />
          )}

          {(isEyeClinicScreen || isMeetingCorp || isOutComeScreen) && (
            <InputTwo
              label='Corporate Name'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(
                this,
                "corporate name"
              )}
              value={enteredCorporateName}
              placeholder='Enter corporate name to search'
              isInvalid={corporatenameIsValid}
              inputType='search'
            />
          )}

          {filteredData.length > 0 && (
            <SearchComp
              onChangeSelect={handleSelectSearch}
              filteredData={filteredData}
            />
          )}

          {isCorporateMap && (
            <InputTwo
              label='Insurance  Firms'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "insurance")}
              value={enteredFirms}
              placeholder='Enter firm name'
            />
          )}

          {(isCorporateMap || isOutComeScreen) && (
            <InputTwo
              label='Person Contacted'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "person")}
              value={enteredPerson}
              placeholder='Person Contacted'
              keyboardType='phone-pad'
            />
          )}

          {(isMeetingCorp || isEyeClinicScreen) && (
            <InputTwo
              label='Date of appointment'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(
                this,
                "appointmentdate"
              )}
              value={enteredAppointDate}
              placeholder='YYYY-MM-DD'
            />
          )}

          {(isMeetingCorp || isEyeClinicScreen) && (
            <InputTwo
              label='Time of appointment'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(
                this,
                "appointmenttime"
              )}
              value={enteredTimeAppointment}
              placeholder='E.g 03:02'
            />
          )}

          {isOutComeScreen && (
            <InputTwo
              label='Designation'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "designation")}
              value={enteredDesignation}
              placeholder='Enter you answer'
            />
          )}

          {isOutComeScreen && (
            <InputTwo
              label='Date'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "date")}
              value={enteredDate}
              placeholder='YYYY-MM-DD'
            />
          )}

          {isOutComeScreen && (
            <InputTwo
              label='TIME'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "time")}
              value={enteredTime}
              placeholder='E.g 12.08'
            />
          )}

          {isOutComeScreen && (
            <InputTwo
              label='No. of Staffs Talked To'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "talked")}
              value={enteredNoStaffTalk}
              placeholder='Enter your answer'
            />
          )}

          {isOutComeScreen && (
            <InputTwo
              label='COUPONS ISSUED'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "coupons")}
              value={enteredCoupons}
              placeholder='Enter your answer'
            />
          )}

          {isOutComeScreen && (
            <InputTwo
              label='FEEDBACK FROM ADMIN'
              ref={inputRef2}
              onUpdateValue={updateInputValueHandler.bind(this, "feedback")}
              value={enteredFeedback}
              placeholder='Enter your answer'
            />
          )}

          {/* button content */}
          <View style={styles.submitContainer}>
            {isSubmiting ? (
              <ActivityIndicator
                animating={true}
                color={MD2Colors.lightBlueA700}
                size='small'
              />
            ) : (
              <FlatButton isSubmiting={isSubmiting} onPress={submitHandler}>
                SUBMIT
              </FlatButton>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FormContainerTwo;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 20,
    flexGrow: 1,
  },

  submitContainer: {
    marginTop: 20,
    marginBottom: 0,
  },
});
