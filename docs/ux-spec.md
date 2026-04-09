# Todo App UX 사양서

## 1. 화면 구성 (Screen Layout)

### 전체 레이아웃

```
+--------------------------------------------------+
|                    헤더 영역                        |
|          "할 일 목록" 제목 + 남은 개수 표시            |
+--------------------------------------------------+
|                  입력 영역                          |
|     [ 할 일을 입력하세요...        ] [ 추가 ]        |
+--------------------------------------------------+
|               필터 바 영역                          |
|         [ 전체 ] [ 미완료 ] [ 완료 ]                |
+--------------------------------------------------+
|                 목록 영역                           |
|  (O) 우유 사기                              [x]    |
|  ( ) Next.js 공부하기                        [x]    |
|  ...                                              |
+--------------------------------------------------+
|              완료된 항목 모두 삭제                    |
+--------------------------------------------------+
```

- **헤더 영역**: 앱 제목("할 일 목록")과 남은 할 일 개수를 표시한다. 모든 할 일이 완료되면 "모든 할 일을 완료했어요!" 메시지를 표시한다.
- **입력 영역**: 텍스트 입력 필드와 "추가" 버튼으로 구성된다.
- **필터 바 영역**: 전체/미완료/완료 3가지 필터 버튼을 제공한다.
- **목록 영역**: 필터 조건에 맞는 Todo 항목을 리스트로 표시한다. 항목이 없으면 "할 일이 없습니다" 안내 문구를 표시한다.
- **하단 영역**: 완료된 항목이 1개 이상일 때 "완료된 항목 모두 삭제" 버튼을 표시한다.

### 반응형 디자인 기준

| 구간 | 너비 | 동작 |
|------|------|------|
| 모바일 | < 640px | 카드 너비 100%, 좌우 패딩 16px. 삭제 버튼 항상 표시 (터치 환경). 입력 필드 font-size 16px (iOS 줌 방지). |
| 태블릿/데스크톱 | >= 640px | 카드 최대 너비 448px (max-w-md), 화면 중앙 정렬. 삭제 버튼은 hover 시에만 표시. |

- 전체 화면은 그라데이션 배경(indigo-50 -> blue-100) 위에 흰색 카드가 중앙에 위치한다.
- 카드는 `rounded-2xl shadow-xl` 스타일로 부드러운 그림자 효과를 적용한다.

---

## 2. 사용자 흐름 (User Flows)

### 2.1 Todo 추가 흐름

1. 사용자가 입력 필드에 할 일 텍스트를 입력한다.
2. "추가" 버튼 클릭 또는 Enter 키를 누른다.
3. 입력값이 공백만 있거나 비어있으면 아무 동작도 하지 않는다.
4. 유효한 텍스트인 경우 `POST /api/todos` API를 호출한다.
5. 성공 시 목록에 새 항목이 추가되고, 입력 필드가 초기화된다.

### 2.2 Todo 완료 체크 흐름

1. 사용자가 Todo 항목 왼쪽의 원형 체크 버튼을 클릭한다.
2. `PATCH /api/todos/[id]` API를 호출하여 `completed` 상태를 토글한다.
3. 완료된 항목은 체크 아이콘(indigo 배경) + 텍스트 취소선 + 회색 텍스트로 시각적 변화를 준다.
4. 미완료 항목은 빈 원형 + 일반 텍스트로 표시된다.
5. 헤더의 남은 개수가 실시간으로 업데이트된다.

### 2.3 Todo 삭제 흐름

1. (데스크톱) 사용자가 Todo 항목에 마우스를 올리면 오른쪽에 X 버튼이 나타난다.
2. (모바일) X 버튼이 항상 표시된다.
3. X 버튼을 클릭하면 `DELETE /api/todos/[id]` API를 호출한다.
4. 성공 시 해당 항목이 목록에서 제거된다.
5. "완료된 항목 모두 삭제" 버튼 클릭 시 완료 상태인 모든 항목에 대해 삭제 API를 호출한다.

### 2.4 필터링 흐름

1. 필터 바에서 버튼을 클릭하여 보기 모드를 전환한다.
2. **전체**: 모든 Todo 항목을 표시한다. (기본값)
3. **미완료**: `completed === false`인 항목만 표시한다.
4. **완료**: `completed === true`인 항목만 표시한다.
5. 현재 선택된 필터 버튼은 시각적으로 강조(indigo 배경색 등)하여 활성 상태를 표시한다.
6. 필터링은 클라이언트 측에서 수행하며 API 호출 없이 즉시 반영된다.

---

## 3. 컴포넌트 구조 (Component Structure)

### 컴포넌트 트리

```
app/page.tsx
  └── TodoApp (Client Component)
        ├── TodoInput
        ├── TodoFilter
        └── TodoList
              └── TodoItem (반복)
```

### 각 컴포넌트 상세

#### `app/page.tsx` - 페이지 래퍼

- **역할**: 서버 컴포넌트. TodoApp을 import하여 렌더링하는 진입점.
- **상태 관리**: 없음.

```tsx
// 별도 Props 없음
export default function Home(): JSX.Element
```

#### `app/components/TodoApp.tsx` - 메인 컨테이너

- **역할**: 전체 상태 관리 및 API 통신을 담당하는 최상위 클라이언트 컴포넌트.
- **상태**: `todos: Todo[]`, `input: string`, `filter: FilterType`
- **기능**: API 호출 (CRUD), 필터링 로직, 자식 컴포넌트에 콜백 전달.

```tsx
// 'use client'
// 별도 Props 없음 (자체적으로 상태 관리)
type FilterType = 'all' | 'active' | 'completed';
```

#### `app/components/TodoInput.tsx` - 입력 필드 + 추가 버튼

- **역할**: 새로운 Todo 텍스트를 입력받고 추가 이벤트를 상위로 전달.

```tsx
interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}
```

#### `app/components/TodoList.tsx` - 목록 컨테이너

- **역할**: Todo 배열을 받아 TodoItem 목록을 렌더링. 빈 목록일 때 안내 문구 표시.

```tsx
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
```

#### `app/components/TodoItem.tsx` - 단일 Todo 항목

- **역할**: 개별 Todo의 체크 버튼, 텍스트, 삭제 버튼을 렌더링.

```tsx
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
```

#### `app/components/TodoFilter.tsx` - 필터 버튼

- **역할**: 전체/미완료/완료 필터 버튼 3개를 렌더링하고 현재 선택 상태를 시각적으로 표시.

```tsx
type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}
```

---

## 4. API 설계 (API Design)

모든 API는 `app/api/todos/` 경로 아래 Route Handler로 구현한다.

### `GET /api/todos` - 전체 목록 조회

- **요청**: 파라미터 없음
- **응답**: `200 OK`
  ```json
  {
    "todos": [
      {
        "id": "uuid-1234",
        "text": "우유 사기",
        "completed": false,
        "createdAt": "2026-04-09T10:30:00.000Z"
      }
    ]
  }
  ```

### `POST /api/todos` - 새 Todo 추가

- **요청 본문**:
  ```json
  { "text": "새로운 할 일" }
  ```
- **유효성 검사**: `text`가 비어있거나 공백만 있으면 `400 Bad Request` 반환.
- **응답**: `201 Created`
  ```json
  {
    "todo": {
      "id": "uuid-5678",
      "text": "새로운 할 일",
      "completed": false,
      "createdAt": "2026-04-09T11:00:00.000Z"
    }
  }
  ```

### `PATCH /api/todos/[id]` - Todo 완료 상태 토글

- **요청 본문**:
  ```json
  { "completed": true }
  ```
- **응답**: `200 OK`
  ```json
  {
    "todo": {
      "id": "uuid-1234",
      "text": "우유 사기",
      "completed": true,
      "createdAt": "2026-04-09T10:30:00.000Z"
    }
  }
  ```
- **에러**: 해당 ID가 없으면 `404 Not Found` 반환.

### `DELETE /api/todos/[id]` - Todo 삭제

- **요청**: 본문 없음
- **응답**: `204 No Content`
- **에러**: 해당 ID가 없으면 `404 Not Found` 반환.

### 데이터 저장소

- 초기 구현은 서버 메모리(배열)에 데이터를 저장한다.
- 추후 데이터베이스 연동 시 API 인터페이스는 변경하지 않는다.

---

## 5. 데이터 모델 (Data Model)

```typescript
interface Todo {
  id: string;        // UUID v4 (서버에서 생성)
  text: string;      // 할 일 내용 (빈 문자열 불가)
  completed: boolean; // 완료 여부 (기본값: false)
  createdAt: string;  // ISO 8601 형식 생성 시각 (서버에서 생성)
}
```

### 필터 타입

```typescript
type FilterType = 'all' | 'active' | 'completed';
```

### 상태 관리 요약

| 상태 | 위치 | 설명 |
|------|------|------|
| `todos` | TodoApp | 전체 Todo 배열 (API에서 fetch) |
| `input` | TodoApp | 입력 필드의 현재 값 |
| `filter` | TodoApp | 현재 선택된 필터 ('all' / 'active' / 'completed') |

### 파일 구조

```
app/
├── page.tsx                      # 페이지 래퍼
├── components/
│   ├── TodoApp.tsx               # 메인 컨테이너 (상태 관리 + API 호출)
│   ├── TodoInput.tsx             # 입력 필드 + 추가 버튼
│   ├── TodoList.tsx              # 목록 컨테이너
│   ├── TodoItem.tsx              # 단일 항목
│   └── TodoFilter.tsx            # 필터 버튼
└── api/
    └── todos/
        ├── route.ts              # GET, POST 핸들러
        └── [id]/
            └── route.ts          # PATCH, DELETE 핸들러
```
