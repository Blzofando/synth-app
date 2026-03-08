# Mapa de Arquitetura

O sistema Synth é estruturado da seguinte forma. (De acordo com a regra de Efeito Cascata):

## Módulo Principal (Frontend Next.js)
- **`src/app/page.tsx`**: Rota `/` (Dashboard).
- **`src/components/Dashboard.tsx`**: Concentra a UI do Dashboard.
  - Dependências: `src/components/RadarChartComponent.tsx`, `src/components/Sidebar.tsx` e lib `embla-carousel-react`.
- **`src/app/materias/page.tsx`**: Rota `/materias` (Minhas Matérias).
- **`src/app/materias/[id]/page.tsx`**: Rota dinâmica `/materias/[id]`. Exibe detalhes unitários da matéria.
- **`src/components/Materias.tsx`**: Concentra a UI da lista de matérias globais e formulário de adição.
- **`src/components/MateriaInterna.tsx`**: Exibe o perfil unitário da matéria (Anotações/Arquivos e Botões de Revisão).
  - Dependências: `src/components/Sidebar.tsx` e lib `embla-carousel-react`.

## Módulo de Autenticação & Segurança (Firebase)
- **`src/lib/firebase.ts`**: Inicializa os SDKs. É o único ponto de acesso nativo.
- **`src/contexts/AuthContext.tsx`**: Monitora o estado de Auth do usuário logado e cruza com a coleção `/users` do Firestore para recuperar seu `status` (pending | approved).
- **Roteamento Seguro**: Embutido dentro do `AuthContext`. Nenhuma tela restrita pode ser acessada se `status !== 'approved'`. Tentar burlar isso redireciona de volta ao Login ou para a tela de Aguardando Aprovação.

*OBS: Sempre que adicionar um relacionamento de banco de dados ou nova rota restrita, reflita isso aqui!*
