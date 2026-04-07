import { makeAutoObservable } from "mobx";

export interface Spot {
  id: string;
  name: string;
  category: string;
  address: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
  lat: number;
  lng: number;
  emoji: string;
  color: "green" | "blue" | "pink" | "warn";
}

class MapStore {
  spots: Spot[] = [
    {
      id: "1",
      name: "옛날국수집",
      category: "음식점",
      address: "서울특별시 마포구 합정동 123-4",
      price: "5,000원",
      rating: 4.7,
      reviews: 128,
      description: "1970년대부터 이어온 손칼국수 전문점. 멸치육수 베이스의 진한 국물이 특징이며 점심 시간에 항상 줄이 늘어서는 숨은 맛집입니다.",
      lat: 37.5484,
      lng: 126.9178,
      emoji: "🍜",
      color: "green"
    },
    {
      id: "2",
      name: "알뜰도시락",
      category: "음식점",
      address: "서울특별시 종로구 관철동 56-7",
      price: "6,500원",
      rating: 4.5,
      reviews: 89,
      description: "매일 바뀌는 12가지 반찬으로 구성된 실속형 도시락 전문점. 근처 직장인들에게 인기 만점입니다.",
      lat: 37.5694,
      lng: 126.9850,
      emoji: "🍱",
      color: "green"
    },
    {
      id: "3",
      name: "동네카페 한잔",
      category: "카페",
      address: "서울특별시 은평구 대조동 89-1",
      price: "3,500원",
      rating: 4.8,
      reviews: 56,
      description: "부담 없는 가격에 직접 로스팅한 신선한 원두로 내린 커피를 즐길 수 있는 아늑한 카페입니다.",
      lat: 37.6114,
      lng: 126.9208,
      emoji: "☕",
      color: "blue"
    },
    {
        id: "4",
        name: "2500원 라면집",
        category: "분식",
        address: "서울특별시 동작구 상도동 45-6",
        price: "2,500원",
        rating: 4.2,
        reviews: 210,
        description: "추억의 가격 그대로! 얼큰한 국물과 쫄깃한 면발을 느낄 수 있는 가성비 끝판왕 라면 전문점.",
        lat: 37.5024,
        lng: 126.9478,
        emoji: "🍜",
        color: "green"
    }
  ];

  selectedSpot: Spot | null = null;
  center = { lat: 37.55, lng: 126.97 }; // Default center (Seoul)

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedSpot(spot: Spot | null) {
    this.selectedSpot = spot;
    if (spot) {
      this.center = { lat: spot.lat, lng: spot.lng };
    }
  }

  setCenter(lat: number, lng: number) {
    this.center = { lat, lng };
  }
}

export const mapStore = new MapStore();
