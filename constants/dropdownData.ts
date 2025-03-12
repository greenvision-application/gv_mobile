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
      label: "Ban công",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.BALCONY,
    },
    {
      label: "Phòng tắm",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.BATHROOM,
    },
    {
      label: "Trong vườn",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.GARDEN,
    },
    {
      label: "Nhà kính",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.GREENHOUSE,
    },
    {
      label: "Thủy canh",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.HYDROPONICS,
    },
    {
      label: "Trong nhà",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.INDOOR,
    },
    {
      label: "Nhà bếp",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.KITCHEN,
    },
    {
      label: "Văn phòng",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.OFFICE,
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
      label: "Vường treo",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.WALL_PLANTER,
    },
    {
      label: "Bệ của sổ",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.WINDOW_SILL,
    },
  ],
  soilType: [
    { label: "Đất đá vôi", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.CHALK },
    { label: "Đất set", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.CLAY },
    { label: "Đất mùn", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.LOAM },
    {
      label: "Đất than bùn",
      value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.PEAT,
    },
    { label: "Đất cát", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.SANDY },
    { label: "Đất phù sa", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.SILT },
  ],
  typeOfPlant: [
    { label: "Cây cảnh", value: "Cây cảnh" },
    { label: "Cây ăn qả", value: "Cây ăn qả" },
    { label: "Cây thân gỗ", value: "Cây thân gỗ" },
    { label: "Cây thủy sinh", value: "Cây thủy sinh" },
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
