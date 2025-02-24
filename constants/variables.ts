const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!;
const REDIRECT_URI = "https://auth.expo.io/@gv_mobile/gv_mobile";

export default {
  API_BASE_URL,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  GOOGLE_CLIENT_ID,
  REDIRECT_URI,
};
