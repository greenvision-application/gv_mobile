import variables from "@/constants/variables";

export const dropdownData = {
  developStage: [
    { label: "Mới gieo trồng", value: "Mới gieo trồng" },
    { label: "Mới nảy mầm", value: "Mới nảy mầm" },
    { label: "Phát triển thành cây non", value: "Phát triển thành cây non" },
    { label: "Cây trưởng thành", value: "Cây trưởng thành" },
  ],
  placePlant: [
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.BALCONY,
      value: "BALCONY",
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.BATHROOM,
      value: "BATHROOM",
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.GARDEN,
      value: "GARDEN",
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.GREENHOUSE,
      value: "GREENHOUSE",
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.HYDROPONICS,
      value: "HYDROPONICS",
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.INDOOR,
      value: "INDOOR",
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.KITCHEN,
      value: "KITCHEN",
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.OFFICE,
      value: "OFFICE",
    },
    {
      label: "OUTDOOR",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.OUTDOOR,
    },
    {
      label: "Sân thượng",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.TERRACE,
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.WALL_PLANTER,
      value: "WALL_PLANTER",
    },
    {
      label: variables.ENUM_TRANSLATIONS.PLANT_SITE.WINDOW_SILL,
      value: "WINDOW_SILL",
    },
  ],
  soilType: [
    { value: "CHALK", label: variables.ENUM_TRANSLATIONS.SOIL_TYPE.CHALK },
    { value: "CLAY", label: variables.ENUM_TRANSLATIONS.SOIL_TYPE.CLAY },
    { value: "LOAM", label: variables.ENUM_TRANSLATIONS.SOIL_TYPE.LOAM },
    {
      value: "PEAT",
      label: variables.ENUM_TRANSLATIONS.SOIL_TYPE.PEAT,
    },
    { value: "SANDY", label: variables.ENUM_TRANSLATIONS.SOIL_TYPE.SANDY },
    { value: "SILT", label: variables.ENUM_TRANSLATIONS.SOIL_TYPE.SILT },
  ],
  careTimeOptions: [
    { label: "Dưới 5 phút", value: "under_5_minute" },
    { label: "5 - 10 phút", value: "about_5_10_minute" },
    { label: "10 - 20 phút", value: "about_10_20_minute" },
    { label: "Trên 20 phút", value: "above_20_minute" },
  ],
  careTasksOptions: [
    { label: "Tưới nước", value: "watering" },
    { label: "Bón phân", value: "fertilizing" },
    { label: "Tỉa lá", value: "pruning" },
    { label: "Kiểm tra sâu bệnh", value: "pest_check" },
    { label: "Vệ sinh chậu và đất", value: "cleaning" },
    { label: "Thay đất", value: "soil_change" },
    { label: "Chiếu sáng", value: "lighting" },
    { label: "Phun sương", value: "misting" },
    { label: "Tạo độ ẩm", value: "humidity_control" },
    { label: "Cắt tỉa rễ", value: "root_pruning" },
  ],
  convenientTimesOptions: [
    { label: "Sáng sớm (5h - 8h)", value: "morning_5h_8h" },
    { label: "Buổi trưa (12h - 14h)", value: "noon_12h_14h" },
    { label: "Buổi chiều (16h - 18h)", value: "afternoon_16h_18h" },
    { label: "Buổi tối (20h - 22h)", value: "evening_20h_22h" },
  ],
};

export default dropdownData;
