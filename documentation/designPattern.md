<h1 align='center'>Atomic Design Pattern</h1>
<p>Atomic Design Pattern 은 컴포넌트를 가장 작은 단위인 원자(atom)로 구분하고, 이를 결합한 분자(molecule), 조직(organic, 해당 프로젝트에는 없음)를 만드는 디자인 패턴입니다.</p>
<p>이는 컴포넌트간의 재사용성을 극대화할 수 있는 방식입니다.</p>

```bash
components
├── atoms
│   ├── button.tsx
│   ├── horizonCard.tsx
│   ├── loader.tsx
│   └── verticalCard.tsx
└── molecules
    ├── basicModal.tsx
    └── dialogue.tsx
```

<p>이 프로젝트에서는 아주 단순하게 구현했습니다.</p>
</br>

<p>분자(molecules)의 다이어로그(dialogue.tsx/ 모달의 기본 뼈대가 되는 파일)은 원자 버튼(button.tsx)과 다른 디자인을 결합하여 만들어졌습니다.</p>
<p>또한 분자 기본 모달(basicModal.tsx / 확인 버튼만 있는 기본 모달)은 다이어로그와 결합하여 만들어졌습니다.</p>
</br>
<p>이처럼 상위로 갈수록 하위 수준의 컴포넌트를 조합하여 개발할 수 있도록 구현했습니다.</p>

</br>
<p>ts. 분자를 활용하는데 왜 조직이 아니라 분자에 넣었나요?</p>
<p>컴포넌트의 복잡도가 그리 높지 않고, 낮은 복잡도의 결합한 컴포넌트를 높은 틀에 넣으면 추후 협력하며 개발하기 어려워집니다.</p>


