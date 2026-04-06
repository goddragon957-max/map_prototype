import { makeAutoObservable } from "mobx";

export interface Restaurant {
  id: string;
  name: string;
  area: string;
  category: string;
  priceLabel: string;
  summary: string;
  update: string;
  likes: number;
  reports: number;
  rating: number;
  lat: number;
  lng: number;
  x: number;
  y: number;
}

export const initialRestaurants: Restaurant[] = [
  {
    id: "hanbit",
    name: "한빛식당",
    area: "연남",
    category: "한식",
    priceLabel: "6,000원",
    summary: "제육 + 국 + 계란후라이가 매일 바뀌는 동네 밥집",
    update: "오늘 10:12 업데이트",
    likes: 142,
    reports: 9,
    rating: 4.8,
    lat: 37.558,
    lng: 126.925,
    x: 18,
    y: 28,
  },
  {
    id: "guksu",
    name: "청춘국수",
    area: "합정",
    category: "면요리",
    priceLabel: "5,500원",
    summary: "잔치국수 곱빼기 무료. 멸치육수 평이 좋은 집",
    update: "어제 18:40 업데이트",
    likes: 119,
    reports: 6,
    rating: 4.6,
    lat: 37.549,
    lng: 126.913,
    x: 26,
    y: 63,
  },
  {
    id: "seongsu-deli",
    name: "성수 델리박스",
    area: "성수",
    category: "도시락",
    priceLabel: "7,000원",
    summary: "샐러드 + 단백질 도시락. 점심 피크에도 회전이 빠름",
    update: "오늘 09:01 업데이트",
    likes: 177,
    reports: 12,
    rating: 4.9,
    lat: 37.544,
    lng: 127.056,
    x: 63,
    y: 38,
  },
  {
    id: "nori-snack",
    name: "노리분식",
    area: "잠실",
    category: "분식",
    priceLabel: "4,800원",
    summary: "떡볶이 + 튀김 세트가 강점. 학생 제보가 많은 집",
    update: "오늘 11:24 업데이트",
    likes: 98,
    reports: 5,
    rating: 4.4,
    lat: 37.513,
    lng: 127.100,
    x: 76,
    y: 70,
  },
  {
    id: "brew-table",
    name: "브루테이블",
    area: "성수",
    category: "카페",
    priceLabel: "3,900원",
    summary: "아메리카노 리필 가능. 좌석이 넓어 작업하기 좋음",
    update: "오늘 08:48 업데이트",
    likes: 154,
    reports: 7,
    rating: 4.7,
    lat: 37.547,
    lng: 127.060,
    x: 58,
    y: 22,
  },
  {
    id: "home-rice",
    name: "집밥정식",
    area: "연남",
    category: "한식",
    priceLabel: "7,500원",
    summary: "반찬 가짓수가 많고 학생 할인 시간대가 있음",
    update: "어제 12:20 업데이트",
    likes: 89,
    reports: 4,
    rating: 4.5,
    lat: 37.562,
    lng: 126.920,
    x: 12,
    y: 48,
  },
];

export const createRestaurantStore = () => {
  const store = {
    restaurants: initialRestaurants as Restaurant[],
    selectedId: "hanbit" as string | null,
    searchQuery: "",
    selectedCategory: "전체",

    get filteredRestaurants() {
      return this.restaurants.filter((r) => {
        const matchesQuery = r.name.includes(this.searchQuery) || r.area.includes(this.searchQuery);
        const matchesCategory = this.selectedCategory === "전체" || r.category === this.selectedCategory;
        return matchesQuery && matchesCategory;
      });
    },

    get selectedRestaurant() {
      return this.restaurants.find((r) => r.id === this.selectedId) || null;
    },

    setSelectedId(id: string | null) {
      this.selectedId = id;
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
      // Filter result might change, if selected id is not in filter, reset it
      const filtered = this.filteredRestaurants;
      if (this.selectedId && !filtered.find(r => r.id === this.selectedId)) {
        this.selectedId = filtered[0]?.id || null;
      }
    },

    setSelectedCategory(category: string) {
      this.selectedCategory = category;
      const filtered = this.filteredRestaurants;
      if (this.selectedId && !filtered.find(r => r.id === this.selectedId)) {
        this.selectedId = filtered[0]?.id || null;
      }
    }
  };

  return makeAutoObservable(store);
};

export const restaurantStore = createRestaurantStore();
