import { Plant } from "./types";

export const popularPlants: Plant[] = [
  {
    id: "1",
    name: "Trầu Bà Lỗ",
    image: "https://vuacayxanh.net/wp-content/uploads/2024/05/trau-ba-lo-1.jpg",
    favorite: false,
  },
  {
    id: "2",
    name: "Đuôi Công Táo",
    image:
      "https://duonglangarden.com/wp-content/uploads/2022/03/cogn-dung-cay-duoi-cong-tao.jpg",
    favorite: true,
  },
  {
    id: "3",
    name: "Tùng Nho",
    image:
      "https://phuongrosa.com/file/sanpham/cayvanphong/1587997738-cay-tung.jpg",
    favorite: false,
  },
  {
    id: "4",
    name: "Hạc Cam",
    image:
      "https://mowgarden.com/wp-content/uploads/2022/09/cay-hong-hac-mini-Philodendron-Billietiae-chau-uom-2-1.jpg",
    favorite: false,
  },
  {
    id: "5",
    name: "Xương Rồng",
    image: "https://static.vinwonders.com/production/trong-xuong-rong.jpg",
    favorite: false,
  },
];

export const similarPlants: Plant[] = [
  {
    id: "5",
    name: "Sen Đá",
    image:
      "https://sendakimcuong.net/wp-content/uploads/2022/04/sen-da-co-an-duoc-khong.jpg",
    favorite: false,
  },
  {
    id: "6",
    name: "Xương Rồng",
    image: "https://static.vinwonders.com/production/trong-xuong-rong.jpg",
    favorite: false,
  },
  {
    id: "7",
    name: "Sen Đá",
    image: "https://static.vinwonders.com/production/trong-xuong-rong.jpg",
    favorite: false,
  },
  {
    id: "8",
    name: "Sen Đá Hồng",
    image:
      "https://vuoncuasen.com/wp-content/uploads/2024/03/sen-da-soi-hong.jpeg",
    favorite: false,
  },
  {
    id: "9",
    name: "Xương Rồng",
    image:
      "https://vuoncuasen.com/wp-content/uploads/2024/03/sen-da-soi-hong.jpeg",
    favorite: false,
  },
  {
    id: "10",
    name: "Xương Rồng",
    image:
      "https://hoadepviet.com/wp-content/uploads/2019/02/cay-an-qua-lam-cay-bong-mat-.gif",
    favorite: false,
  },
];

export const plantData = {
  plant_name: "Không xác đinh",
  scientific_name: "Không rõ",
  overview: ["Không xác định"],
  characteristic: ["Không xác định"],
  function: ["Không xác định"],
  meaning: ["Không xác định"],
  image_url: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DsFSPndbdhffeTwdwLbdB9hkubnzoDGdBuDQ8MHyRAzMudfevVV2w3asalMGt8JERdU&usqp=CAU",
  ],
  difficulty_level: "EASY" as const,
  soil_type: "LOAM" as const,
  category_id: "f1b45078-6b0c-4949-b8c8-466257157880",
  habitatLocation: "OUTDOOR" as const,
  minTemperature: 20,
  maxTemperature: 35,
  minMatureSize: 50,
  maxMatureSize: 200,
  humidityRange: "HIGH" as const,
  lightRequirement: "HIGH" as const,
  Category: {
    category_name: "Không xác định",
  },
};
