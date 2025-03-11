const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!;
const PLATFORM = "greenvision.dev.com";
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const localStorage = {
  accessToken: "accessToken",
  onboarded: "onboarded",
};

const urls = {
  register: "/auth/register",
  login: "/auth/login",
  otp: "/auth/verify-otp",
  status: "/auth/status",
  scan: "/gemini/upload-image",
  popular: "/plants/client-plants",
  plantDetail: (id: string | string[]) => `/plants/${id}`,
};

const methods = {
  post: "POST",
  get: "GET",
  put: "PUT",
  delete: "DELETE",
  patch: "PATCH",
};
const ENUM_TRANSLATIONS = {
  PLANT_SITE: {
    INDOOR: "Trong nhà",
    OUTDOOR: "Ngoài trời",
    BALCONY: "Ban công",
    GARDEN: "Vườn",
    GREENHOUSE: "Nhà kính",
    WINDOW_SILL: "Bệ cửa sổ",
    KITCHEN: "Nhà bếp",
    BATHROOM: "Phòng tắm",
    TERRACE: "Sân thượng",
    OFFICE: "Văn phòng",
    HYDROPONICS: "Thủy canh",
    WALL_PLANTER: "Vườn treo",
  },
  SOIL_TYPE: {
    SANDY: "Đất cát",
    CLAY: "Đất sét",
    SILT: "Đất phù sa",
    PEAT: "Đất than bùn",
    CHALK: "Đất đá vôi",
    LOAM: "Đất mùn",
  },
  DIFFICULTY_LEVEL: {
    EASY: "Dễ",
    MEDIUM: "Trung bình",
    HARD: "Khó",
    VERY_HARD: "Rất khó",
    EXTREME: "Cực kỳ khó",
  },
  LEVEL: {
    NONE: "Không có",
    VERY_LOW: "Rất thấp",
    LOW: "Thấp",
    MEDIUM: "Trung bình",
    HIGH: "Cao",
    VERY_HIGH: "Rất cao",
  },
};

export default {
  API_BASE_URL,
  GOOGLE_CLIENT_ID,
  PLATFORM,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  ENUM_TRANSLATIONS,
  localStorage,
  urls,
  methods,
};
