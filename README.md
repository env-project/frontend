# frontend

## 팀 컨벤션
### 브랜칭 전략
+ git hub flow 전략을 사용한다.
+ 브랜치 생성 시 이슈 생성을 필수로 선행한다.
+ 브랜치 이름은 feature(or hotfix)/이슈번호-브랜치이름으로 통일한다.
+ 기본적으로 하나의 브랜치는 한 사람이 관리한다.

### PR
+ 작업 브랜치를 dev에 merge할 때는 필수로 PR를 작성한다.
+ 기본적으로 하나의 PR은 하나의 기능에 관한 코드만 포함되어야한다.
+ merge하기 위해선 최소 한 명의 approve가 필요하다.
+ 다른 사람의 코드를 적극적으로 리뷰한다.

### 변수 네이밍
+ 약어 사용은 지양한다.

❌ 안 좋은 예시
```typescript
  const changeRFtoRD = () => {...}
```
✅ 좋은 예시
```typescript
  const changeRecruitmentFormToRequestData = () => {...}
```

### 텍스트 사용
+ 텍스트를 사용할 때 항상 \<Text\> 혹은 \<H1\>,\<H2\>, \<H3\> 컴포넌트를 사용한다.
+ 단 커스텀 컴포너넌트를 사용할 때 자체적으로 위 텍스트 컴포넌트를 사용하고 있으면 제외한다.

```jsx
<button>버튼</button>
```
✅ 좋은 예시
```jsx
<button><Text variant="label">버튼<Text></button>
```

### axios 데이터 리턴
+ axios를 사용할 때 AxiosResponse로 감싼 값이 아니라 데이터만 리턴한다.


❌ 안 좋은 예시
```typescript
  const { isPending, data } = useQuery<AxiosResponse<MasterData>>({
    queryKey: ["master-data"],
    queryFn: () => {
      return api.get("/common/master-data");
    },
  });
```

✅ 좋은 예시
```typescript
  const { isPending, data } = useQuery<MasterData>({
    queryKey: ["master-data"],
    queryFn: () => {
      const res = api.get("/common/master-data");
      return res.data;
    },
  });
```
