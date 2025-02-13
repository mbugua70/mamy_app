import { View, Text } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthContentTwo from "../components/AuthContentTwo";
import Toast from "react-native-toast-message";
import { SummaryFormTwo } from "../http/api";

const CorporateMeeting = () => {

  const { data, mutate, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: SummaryFormTwo,
    // the code below will wait the request to finish before moving to another page.
    onMutate: async (data) => {
      return data;
    },

    onSuccess: (data) => {
       const parsedData = JSON.parse(data)
      if (parsedData.response === "fail") {
        Toast.show({
          type: "error",
          text1: "Failed to submit",
          text2: "Failed to submit the record, please try again!",
        });
      }

      if (parsedData.response === "success") {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Data submitted successfully!",
        });
      }
    },
  });


  async function submitHandler(credentials){
    mutate(credentials)
  }


    useEffect(() => {
      console.log(error, "Error");
      if (error && !isPending) {
        Toast.show({
          type: "error",
          text1: "Failed to submit",
          text2: error.message,
        });
      } else if (error === "TOO_MANY_ATTEMPTS_TRY-LATER" && !isPending) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Too many attempts try later",
        });
      }
    }, [error, isPending]);

  return (
    <>
      <AuthContentTwo onAuthenticate={submitHandler} isMeetingCorp={true} isPending={isPending} isSuccess={isSuccess}  isError={isError} />
    </>
  );
};

export default CorporateMeeting;
