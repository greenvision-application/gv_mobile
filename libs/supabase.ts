import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import variables from "@/constants/variables";

const supabaseUrl = variables.SUPABASE_URL;
const supabaseAnonKey = variables.SUPABASE_ANON_KEY;
