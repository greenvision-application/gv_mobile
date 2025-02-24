import { SafeAreaView, Text } from "react-native";
import LoginForm from "@/components/LoginForm";
import React from "react";
import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";

const Login = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <SafeAreaView className="h-full bg-neutral">
      <LoginForm />
      {session && session.user && <Text>{session.user.id}</Text>}
    </SafeAreaView>
  );
};

export default Login;
