# DESIGN.md - 한끼레이더 (Map Prototype) 디자인 시스템

이 문서는 AI 에이전트가 프로젝트의 UI를 생성하거나 수정할 때 반드시 준수해야 하는 **디자인 시스템 표준**입니다. 모든 컴포넌트는 아래 정의된 토큰과 원칙을 따릅니다.

## 1. 디자인 철학 (Design Philosophy)

- **Map-Centric Interface**: 지도가 전체 화면의 배경이며, 모든 UI는 지도 위에 떠 있는(Floating) 형태여야 합니다.
- **Glassmorphism**: 투명도와 블러(Blur) 효과를 적극 활용하여 지도의 가시성을 확보하면서도 정보를 명확히 구분합니다.
- **Minimalism & Density**: '거지맵' 스타일의 고밀도 정보를 제공하기 위해 불필요한 여백을 최소화하고 컴팩트한 레이아웃을 추구합니다.

## 2. 디자인 토큰 (Design Tokens)

### 색상 (Colors)
- **Primary**: `#1d3366` (Deep Navy) - 브랜드 컬러 및 메인 버튼
- **Secondary**: `#334155` (Slate 700) - 텍스트 및 서브 요소
- **Accent**: `#2563eb` (Blue 600) - 강조, 링크, GPS 상태
- **Background (Light)**: `bg-white/72` - 일반 패널 (Glass 효과 필수)
- **Background (Dark/Premium)**: `bg-slate-900/80` - 내비게이션 바, 헤더 포인트

### 효과 (Effects)
- **Backdrop Blur**: `backdrop-blur-xl` 또는 `backdrop-blur-2xl`
- **Border**: `border-white/50` (Glass 효과의 경계를 정의)
- **Shadow**: `shadow-2xl` (패널의 입체감을 위해 깊은 그림자 사용)
- **Corner Radius**: `rounded-[20px]` (표준 패널), `rounded-full` (알약형 버튼/내비)

### 타이포그래피 (Typography)
- **Title**: `font-black` 또는 `font-bold`, `tracking-tight`
- **Body**: `font-semibold` 또는 `font-medium`, `text-slate-700`
- **Mini Label**: `text-[0.6rem]`, `font-extrabold`, `tracking-[0.1em]`, `uppercase`

## 3. 레이아웃 원칙 (Layout Principles)

1. **Floating Panels**: `absolute` 또는 `fixed` 속성을 사용하여 지도 레이어 위에 독립적으로 배치합니다.
2. **Compact Padding**: 기본 패딩은 `p-2.5`에서 `p-3.5` 사이를 권장합니다.
3. **Pointer Events Handling**:
   - 패널 컨테이너는 `pointer-events-none`을 사용하여 지도의 인터랙션을 방해하지 않아야 합니다.
   - 실제 클릭이 필요한 개별 패널만 `pointer-events-auto`를 적용합니다.

## 4. 컴포넌트 표준 (Component Standards)

### Floating Navigation Bar (Pill)
- **Container**: `fixed left-1/2 bottom-6 -translate-x-1/2`, `rounded-full`, `bg-slate-900/80`
- **Indicator**: 선택된 항목 뒤에서 흐르는 동적인 배경 바.
- **Icons**: MUI Outline 스타일 아이콘 사용.

### Info Sidebar
- **Width**: `w-[min(380px,calc(100vw-2rem))]`
- **Overflow**: 내부 스크롤 사용(`overscroll-contain`).
