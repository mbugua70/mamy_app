import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import { Colors } from '../../constants/styles';
import NetInfo from "@react-native-community/netinfo";
import FormContainer from "./FormContainer";

function AuthContent({
  onAuthenticate,
  name,
  password,
  isAuthenticate,
  isUpdating,
}) {
  const navigation = useNavigation();
  const [isOffline, setIsOffline] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    password: false,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      setIsInternetReachable(state.isInternetReachable);

      if (!state.isConnected) {
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "No internet connection. Please try again later.",
        });
      }

      if (!state.isInternetReachable) {
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "No internet access",
        });
      }
    });

    setTimeout(() => {
      if (unsubscribe()) {
        checkNetwork();
      }
    }, 3000);
    return () => unsubscribe();
  }, [isOffline, isInternetReachable]);

  function submitHandler(credentials) {
    let { name, password } = credentials;

    name = name.trim();
    password = password.trim();

    const nameIsValid = name.length > 2;
    const passwordIsValid = password.length > 3;

    if (!nameIsValid || !passwordIsValid) {
      Alert.alert("Invalid Input", "Please check your credentials.");
      setCredentialsInvalid({
        name: !nameIsValid,
        password: !passwordIsValid,
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

    onAuthenticate({ name, password });
  }

  return (
    <View style={styles.authContent}>
      <FormContainer
        isAuthenticate={isAuthenticate}
        isUpdating={isUpdating}
        name={name}
        password={password}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 8,
    // backgroundColor: Colors.primary800,
    // elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});
