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
