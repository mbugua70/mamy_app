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
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchRecordDataSearch } from "../http/api";

import InputTwo from "./InputTwo";
import FlatButton from "../UI/FlatButton";
import DropdownComponent from "./Dropdown";
import LocationPicker from "./LocationPicker";
import SearchComp from "./SearchComp";

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
    corporatename: corporatenameIsValid
  } = credentialsInvalid;

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
          text1: "Failed to submit",
          text2: "Failed to submit the record, please try again!",
        });
      }

      if (parsedData.response === "success") {
        const fetchedData = parsedData.corporates.map((item) => item.name)
        setFilteredData(fetchedData)
      }
    },
  });

  const handleSearch = (text) => {
    const textFormatted = text.trim();

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



  function updateInputValueHandler(inputType, enteredValue) {
    if(inputType === "corporate name"){
      if(!selected){
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
        console.log()
        setEnteredCorporateName(enteredValue);
        break;
    }
  }

  const handleSelectSearch = (item) => {
    if(item) {
      // updateInputValueHandler(this, "corporate name",)
      setEnteredCorporateName(item)
      setSelected(item);
      setQuery(item);
      setFilteredData([]);
    }
  };

  // console.log(enteredSales, enteredLocation, enteredCorporate, enteredFirms, enteredPerson, enteredStaff)

  function submitHandler() {

    onSubmit({
      sales: enteredSales,
      location: enteredLocation,
      corporate: enteredCorporate,
      corporateName: enteredCorporateName,
      staff: enteredStaff,
      person: enteredPerson,
      insurance: enteredFirms,
      appointmentdate: enteredAppointDate,
      appointmenttime: enteredTimeAppointment,
      designation: enteredDesignation,
      date: enteredDate,
      time: enteredTime,
      talked: enteredNoStaffTalk,
      coupons: enteredCoupons,
      feedback: enteredFeedback,
    });
  }

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
      setEnteredTime("")
      setEnteredDate("")
      setEnteredCorporateName("")
    }
  }, [isSuccess, isError, isSubmiting]);

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
