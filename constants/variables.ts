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
  recommendations: "/plants/recommendations",
  category: "/categories",
  addGarden: "/user-plant",
  favorite: "/user-plant/favorite",
  planted: "/user-plant/planted",
  unplanted: "/user-plant/unplanted",
  user: "/users/detail",
  plantDetail: (id: string | string[]) => `/plants/${id}`,
  updateUserPlant: (id: string | string[]) => `/user-plant/${id}`,
  generateSchedule: (id: string | string[]) => `/care-schedule/${id}`,
  generateTask: (id: string | string[]) => `/tasks/${id}`,
  changeFavorite: (id: string | string[]) => `/user-plant/like/${id}`,
  removeUserPlant: (id: string | string[]) => `/user-plant/${id}`,
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
  TASK_STATUS: {
    DO: "DO",
    DONE: "DONE",
    NOT_YET: "NOT YET",
  },
};

const getHumidityText = (humidityRange: string) => {
  switch (humidityRange) {
    case "NONE":
      return "Không cần ẩm";
    case "VERY_LOW":
      return "Rất ít ẩm";
    case "LOW":
      return "Ít ẩm";
    case "MEDIUM":
      return "Trung bình";
    case "HIGH":
      return "Nhiều ẩm";
    case "VERY_HIGH":
      return "Rất nhiều ẩm";
    default:
      return "Trung bình";
  }
};

const getLightText = (lightRequirement: string) => {
  switch (lightRequirement) {
    case "NONE":
      return "Không cần nắng";
    case "VERY_LOW":
      return "Rất ít nắng";
    case "LOW":
      return "Ít nắng";
    case "MEDIUM":
      return "Trung bình";
    case "HIGH":
      return "Nhiều nắng";
    case "VERY_HIGH":
      return "Rất nhiều nắng";
    default:
      return "Trung bình";
  }
};

const getValue = (level: string) => {
  switch (level) {
    case "NONE":
      return 0;
    case "VERY_LOW":
      return 10;
    case "LOW":
      return 25;
    case "MEDIUM":
      return 50;
    case "HIGH":
      return 75;
    case "VERY_HIGH":
      return 100;
    default:
      return 50;
  }
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
  getHumidityText,
  getLightText,
  getValue,
};
