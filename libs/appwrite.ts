import { Client, Avatars, Account, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import variables from "@/constants/variables";
import { router } from "expo-router";

export const config = {
  platform: variables.PLATFORM,
  endpoint: variables.APPWRITE_ENDPOINT,
  projectId: variables.APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const account = new Account(client);
export const avatar = new Avatars(client);

export const login = async () => {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const logout = async () => {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    console.log("📡 Calling account.get()...");
    const result = await account.get();
    console.log("👤 User data:", result);

    if (!result?.$id) {
      console.log("⚠️ No user found.");
      return null;
    }

    return { ...result, avatar: avatar.getInitials(result.name).toString() };
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return null;
  }
};

export const checkSession = async (onSessionFound?: () => void) => {
  try {
    const session = await account.getSession("current");
    console.log("✅ Session found:", session);

    if (session && onSessionFound) {
      onSessionFound();
    }

    return session;
  } catch (error) {
    console.error("❌ No session found, redirecting to SignIn:", error);
    router.push("/sign-in");
    return null;
  }
};
