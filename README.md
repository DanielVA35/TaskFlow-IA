# TaskFlow IA

Gerenciador de tarefas simples, responsivo e executado inteiramente no navegador.

## Funcionalidades

- Cadastro e edição de tarefas.
- Prioridades baixa, média e alta.
- Conclusão e reabertura de tarefas.
- Filtros por todas, pendentes e concluídas.
- Validação de campos e feedback das ações.

## Tecnologias

JavaScript vanilla, HTML e CSS. Não há backend: as tarefas são persistidas no `localStorage` do navegador.

## Executar

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Testes e build

```bash
npm test
npm run build
```

O build de produção é gerado em `dist/`.
