import { SafeAreaView, Text } from "react-native";
import LoginForm from "@/components/LoginForm";
import React from "react";
const Login = () => {
  return (
    <SafeAreaView className="h-full bg-neutral">
      <LoginForm />
    </SafeAreaView>
  );
};

export default Login;
