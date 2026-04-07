# Map Prototype Core Rules

이 문서는 **Map Prototype** 프로젝트의 핵심 기술 스택과 전용 아키텍처 원칙을 정의합니다.

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js 15.x (Pages Router), React 18+
- **Languages/State**: TypeScript, MobX (Functional Pattern)
- **UI/Styles**: MUI (Material-UI) + Tailwind CSS, MUI Charts, AG-Grid
- **Client**: Axios (with JWT Interceptor)

### Backend (Future Integration)
- **Core**: Java 21, Spring Boot 3.3+, Gradle
- **Database**: MS SQL Server 2022, MyBatis
- **Note**: 초기 프로토타입 단계에서는 Mock API 및 클라이언트 로컬 상태(MobX)를 우선 활용합니다.

---

## 📂 디렉토리 구조 및 레이어링 (Structure)

### 의존성 원칙 (Dependency Direction)
- `src/common` → `src/components` → `src/features` → `src/pages`
- **핵심 정책**: 낮은 레이어는 높은 레이어를 절대 참조하지 않습니다. 순환 참조를 엄격히 금지합니다.

---

## 📜 개발 및 보안 핵심 원칙

### 1. 스타일링 및 컴포넌트 (UI/UX)
- **Hybrid Styling**: UI 구조는 MUI를 사용하되, 상세 스타일은 Tailwind CSS(`className`)를 최우선으로 적용합니다. (MUI + Tailwind 하이브리드)
- **Box over div**: 레이아웃 컨테이너는 순수 `<div>` 대신 MUI `<Box>`를 사용합니다.
- **Glassmorphism**: 프로토타입의 핵심 아이덴티티인 반투명 화이트 카드와 옅은 블루그레이 배경을 유지합니다.
- **Dark Mode**: 초기 단계에서는 라이트 모드(Default)를 우선하며, 다크 모드는 향후 과제로 보류합니다.

### 2. 데이터 및 비즈니스 로직
- **State Persistence**: 보안 정보는 `HttpOnly Cookie` 또는 `authStore` 상태로 관리하고, 비민감 UI 설정(마지막 선택 카테고리 등)은 `localStorage` 사용을 허용합니다.
- **DTO Only**: 엔티티나 로우 데이터를 외부 API 응답으로 직접 노출하지 않으며 반드시 DTO/Model로 변환하여 사용합니다.

---

## 🧠 LLM 협업 및 행동 원칙

1.  **Simplify First**: 불필요하게 복잡한 추상화를 금지하고, 200줄의 코드를 50줄로 줄일 수 있는 단순성을 추구합니다.
2.  **Surgical Changes**: 요청된 부분 외에 인접한 코드를 불필요하게 수정하지 않습니다.
3.  **Goal-Driven**: "제보 기능 구현"과 같은 구체적인 성공 기준을 수립하고 한 단계씩 실행합니다.
4.  **Language**: 기술 분석은 전문 용어를 사용하되, 사용자 소통은 한국어를 사용합니다. 커밋 메시지는 `feat: 식당 목록 리팩토링`과 같이 한글로 작성합니다.
