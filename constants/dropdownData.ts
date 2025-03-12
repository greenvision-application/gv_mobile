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
      label: "Ngoài trời",
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
    { label: "Đất đá vôi", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.CHALK },
    { label: "Đất sét", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.CLAY },
    { label: "Đất mùn", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.LOAM },
    {
      label: "Đất than bùn",
      value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.PEAT,
    },
    { label: "Đất cát", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.SANDY },
    { label: "Đất phù sa", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.SILT },
  ],
  careTimeOptions: [
    { label: "Dưới 5 phút", value: "under_5" },
    { label: "5 - 10 phút", value: "5_10" },
    { label: "10 - 20 phút", value: "10_20" },
    { label: "Trên 20 phút", value: "above_20" },
  ],
  careTasksOptions: [
    { label: "Tưới nước", value: "watering" },
    { label: "Bón phân", value: "fertilizing" },
    { label: "Tỉa lá", value: "pruning" },
    { label: "Kiểm tra sâu bệnh", value: "pest_check" },
    { label: "Vệ sinh chậu và đất", value: "cleaning" },
  ],
  convenientTimesOptions: [
    { label: "Sáng sớm (6h - 8h)", value: "morning" },
    { label: "Buổi trưa (12h - 14h)", value: "noon" },
    { label: "Buổi chiều (16h - 18h)", value: "afternoon" },
    { label: "Buổi tối (20h - 22h)", value: "evening" },
  ],
};

export default dropdownData;
