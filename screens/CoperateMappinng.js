import { View, Text } from "react-native";
import { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native'
import AuthContentTwo from '../components/AuthContentTwo'

const CoperateMappinng = () => {
  async function submitHandler({ name, phone, region }) {
  }
  return (
    <>
      <AuthContentTwo onAuthenticate={submitHandler} />
    </>
  );
};

export default CoperateMappinng;
