import variables from "@/constants/variables";

export interface Plant {
  id: string;
  name: string;
  image: string;
  favorite?: boolean;
  nickname?: string;
}

export interface UserPlant {
  id?: any;
  nickname?: string;
  favorite?: boolean;
  growth_stage?: string;
  planting_date?: string;
  image_url?: string[];
  plant_site?: string;
  caring_plant_infor: any;
  plant_id?: any;
}

type PlantSite = keyof typeof variables.ENUM_TRANSLATIONS.PLANT_SITE;
type SoilType = keyof typeof variables.ENUM_TRANSLATIONS.SOIL_TYPE;
type DifficultyLevel =
  keyof typeof variables.ENUM_TRANSLATIONS.DIFFICULTY_LEVEL;
type Level = keyof typeof variables.ENUM_TRANSLATIONS.LEVEL;
export type TaskType = keyof typeof variables.ENUM_TRANSLATIONS.TASK_STATUS;
export interface CreatePlantRequest {
  plant_name: string;
  scientific_name: string;
  overview: string[];
  characteristic: string[];
  function: string[];
  meaning: string[];
  image_url: string[];
  difficulty_level: DifficultyLevel;
  soil_type: SoilType;
  habitatLocation: PlantSite;
  minTemperature: number;
  maxTemperature: number;
  minMatureSize: number;
  maxMatureSize: number;
  humidityRange: Level;
  lightRequirement: Level;
  approved_content: boolean;
}

export interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}

export interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: Ward[];
}

export interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

export interface DistrictResponse {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

export interface WardResponse {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: Ward[];
}
