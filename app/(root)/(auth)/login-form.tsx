import { SafeAreaView, Text } from "react-native";
import LoginForm from "@/components/LoginForm";
import React from "react";
import "react-native-url-polyfill/auto";

const Login = () => {

  return (
    <SafeAreaView className="h-full bg-neutral">
      <LoginForm />
    </SafeAreaView>
  );
};

export default Login;
