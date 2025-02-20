import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { supabase } from "./supabase";
import variables from "@/constants/variables";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: variables.GOOGLE_CLIENT_ID,
    redirectUri: variables.REDIRECT_URI,
    scopes: ["profile", "email"],
  });

  async function signInWithGoogle() {
    console.log("🔍 Bắt đầu đăng nhập...");
    const result = await promptAsync();
    console.log("🔍 Kết quả từ Google:", result);

    if (result?.type === "success") {
      const { authentication } = result;
      console.log("✅ ID Token:", authentication?.idToken);

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: authentication?.idToken!,
      });
      console.log("🔍 Kết quả từ Supabase:", { data, error });

      if (error) console.error(error);
      return data;
    }
  }

  return { signInWithGoogle };
}
