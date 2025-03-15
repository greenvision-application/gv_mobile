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
  timeline: "/user-plant/client-schedule",
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
const placePlant = {
  BALCONY: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.BALCONY,
    value: "BALCONY",
    image:
      "https://images.pexels.com/photos/3722570/pexels-photo-3722570.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  BATHROOM: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.BATHROOM,
    value: "BATHROOM",
    image: "https://images.unsplash.com/photo-1552454799-ca5cfdc612c8?w=400",
  },
  GARDEN: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.GARDEN,
    value: "GARDEN",
    image:
      "https://plus.unsplash.com/premium_photo-1673141390230-8b4a3c3152b1?w=400",
  },
  GREENHOUSE: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.GREENHOUSE,
    value: "GREENHOUSE",
    image:
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=400",
  },
  HYDROPONICS: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.HYDROPONICS,
    value: "HYDROPONICS",
    image:
      "https://images.pexels.com/photos/30228484/pexels-photo-30228484/free-photo-of-farmer-in-a-rice-field-by-the-river-with-boats.jpeg?w=400",
  },
  INDOOR: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.INDOOR,
    value: "INDOOR",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400",
  },
  KITCHEN: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.KITCHEN,
    value: "KITCHEN",
    image:
      "https://images.pexels.com/photos/2098912/pexels-photo-2098912.jpeg?w=400",
  },
  OFFICE: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.OFFICE,
    value: "OFFICE",
    image:
      "https://images.unsplash.com/photo-1604328702728-d26d2062c20b?q=80&w=400",
  },
  OUTDOOR: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.OUTDOOR,
    value: "OUTDOOR",
    image:
      "https://images.unsplash.com/photo-1734079692147-c6fc9438a2d0?q=80&w=400",
  },
  TERRACE: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.TERRACE,
    value: "TERRACE",
    image:
      "https://cdn2.hubspot.net/hub/1763197/file-3736232681-jpg/blog-files/amber-freda-2-300x227.jpg",
  },
  WALL_PLANTER: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.WALL_PLANTER,
    value: "WALL_PLANTER",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/indoor-plant-growing-vertical-garden-royalty-free-image-1702760279.jpg",
  },
  WINDOW_SILL: {
    label: ENUM_TRANSLATIONS.PLANT_SITE.WINDOW_SILL,
    value: "WINDOW_SILL",
    image:
      "https://images.pexels.com/photos/28318911/pexels-photo-28318911/free-photo-of-a-window-with-wooden-shutters-and-flowers-in-pots.jpeg?w=400",
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
  placePlant,
};
