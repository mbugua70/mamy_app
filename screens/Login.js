import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";

// import LoadingOverlay from '../components/ui/LoadingOverlay';
import { LoginHander } from "../http/api";
import { AuthContext } from "../store/store";
import AuthContent from "../components/AuthContent";
import CocaColaTitle from "../UI/CokeHead";
import HeadComp from "../components/HeadComp";
import Toast from "react-native-toast-message";

const Login = () => {
  const { authenticate, isAuthenticate } = useContext(AuthContext);

  console.log("login isauth", isAuthenticate);

  const { data, mutate, isError, error, isPending } = useMutation({
    mutationFn: LoginHander,
    // the code below will wait the request to finish before moving to another page.
    onMutate: async (data) => {
      return data;
    },

    onSuccess: (data) => {
      console.log(data, "message");

      if (data.failure) {
        Toast.show({
          type: "error",
          text1: "Log in failed",
          text2: "Incorrect phone number and password",
        });
      }

      if (data.message === "Login Successful") {
        const baRecord = {
          phone: data.ba_phone,
          //     name: data.name,
          ba_id: data.ba_id,
        };
        authenticate(JSON.stringify(baRecord));
      }
    },
  });

  /**
   *
   * @param {*} {name, password}
   * login func/calling the mutation
   */

  async function loginHandler({ name, password }) {
    mutate({ name, password });
  }

  useEffect(() => {
    if (error && !isPending) {
      Toast.show({
        type: "error",
        text1: "Failed to log in",
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
    <View style={styles.screen}>
      <View style={styles.cokeHeadStyle}>
        <HeadComp />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Please login to continue.</Text>
      </View>
      <AuthContent
        isLogin
        isAuthenticate={isPending}
        onAuthenticate={loginHandler}
        isUpdating={false}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginBlock: 10,
  },

  cokeHeadStyle: {
    width: "100%",
    marginTop: 62,
    // paddingVertical: 5,
    // justifyContent: 'center',
    alignItems: "center",
  },

  textContainer: {
    marginTop: 62,
    marginHorizontal: 16,
    paddingHorizontal: 16,
  },

  text: {
    color: "grey",
    fontSize: 16,
  },
});
