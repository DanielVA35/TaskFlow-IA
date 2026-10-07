# AGENTS.md — TaskFlow IA

## 1. Visão geral

O TaskFlow IA é um miniaplicativo Web para gerenciamento de tarefas pessoais.

O projeto deve ser desenvolvido incrementalmente, priorizando simplicidade, qualidade, manutenibilidade e entregas funcionais.

Funcionalidades previstas:
- Cadastro de tarefas.
- Edição de tarefas.
- Marcação de tarefas como concluídas.
- Filtros por status.
- Prioridades baixa, média e alta.
- Interface responsiva e utilizável.

## 2. Responsabilidade do agente

Você é responsável por analisar, implementar, testar e validar as alterações solicitadas.

Não basta produzir código que aparentemente funciona. Toda implementação precisa respeitar as regras de negócio, a arquitetura existente e os critérios de aceite.

Antes de modificar qualquer arquivo:

1. Entenda o objetivo da tarefa.
2. Inspecione o código relacionado.
3. Identifique o fluxo atual, quando existir.
4. Consulte os testes existentes.
5. Identifique as regras de negócio envolvidas.
6. Defina quais arquivos precisarão ser alterados.
7. Identifique possíveis impactos e regressões.

Não comece a implementar sem compreender o problema.

## 3. Desenvolvimento incremental

- Implemente somente o escopo solicitado.
- Não antecipe funcionalidades futuras.
- Não introduza dependências sem necessidade.
- Evite overengineering e abstrações prematuras.

Quando houver ambiguidade relevante sobre regras de negócio, solicite esclarecimento.

Decisões técnicas simples e reversíveis podem ser tomadas autonomamente, desde que sejam justificadas.

## 4. Arquitetura e organização

Respeite a arquitetura existente do projeto.

Mantenha separadas, quando aplicável, as responsabilidades de:

- Interface e componentes visuais.
- Regras de negócio e validações.
- Acesso e persistência de dados.
- Tipos, modelos e contratos.

Regras:

- Não coloque regras de negócio complexas diretamente em componentes visuais.
- Evite duplicação de código e validações.
- Utilize funções pequenas e coesas.
- Prefira composição a abstrações excessivas.
- Não crie camadas que não agreguem valor real.
- Preserve os contratos existentes.

Ao estabelecer a stack inicial, registre as decisões técnicas no README.

## 5. Regras de negócio

As regras de negócio têm prioridade sobre preferências de implementação.

Para cada funcionalidade:

1. Identifique entradas e saídas esperadas.
2. Identifique pré-condições e pós-condições.
3. Identifique estados válidos e inválidos.
4. Considere cenários normais, limites e exceções.
5. Garanta consistência e integridade dos dados.

Não invente regras de negócio quando houver ambiguidades relevantes.

## 6. Qualidade do código

Todo código produzido deverá:

- Ter nomes expressivos e consistentes.
- Seguir os padrões da linguagem e do projeto.
- Ser legível e de fácil manutenção.
- Evitar duplicações desnecessárias.
- Tratar erros de maneira explícita.
- Não conter código morto.
- Não introduzir dependências desnecessárias.
- Evitar comentários que apenas repetem o código.
- Manter comentários úteis para explicar decisões não óbvias.

Não altere arquivos que não estejam relacionados à implementação sem uma justificativa técnica.

## 7. Testes automatizados

Toda nova funcionalidade deverá ter testes proporcionais ao seu comportamento e risco.

Os testes devem contemplar, quando aplicável:

- Caminho de sucesso.
- Entradas inválidas.
- Valores limites.
- Estados inesperados.
- Persistência e recuperação dos dados.
- Comportamento da interface.

Priorize testes determinísticos, independentes e rápidos.

Os testes devem verificar comportamentos observáveis e contratos, evitando acoplamento desnecessário aos detalhes internos da implementação.

Não modifique ou exclua testes somente para fazer uma implementação incorreta passar.

Quando um teste falhar, investigue a causa antes de corrigi-lo.

Nunca informe que um teste passou sem executá-lo.

## 8. Gate de arquitetura

Antes de considerar uma implementação concluída, verifique:

- A alteração respeita a arquitetura existente?
- As responsabilidades estão bem distribuídas?
- Existe duplicação desnecessária?
- Alguma dependência indevida foi introduzida?
- A solução adiciona complexidade desnecessária?
- A implementação é coerente com as funcionalidades futuras?
- O comportamento existente foi preservado?

Se identificar problemas, corrija-os antes da entrega, desde que estejam dentro do escopo autorizado.

## 9. Gate de qualidade

Antes de realizar o commit final da tarefa:

1. Execute os testes relacionados.
2. Execute a suíte completa, quando viável.
3. Execute build e lint, quando configurados.
4. Revise o diff.
5. Verifique arquivos não intencionais.
6. Confirme os critérios de aceite.
7. Identifique riscos ou limitações remanescentes.

Se alguma verificação não puder ser executada, registre o motivo e não a apresente como aprovada.

## 10. Segurança e persistência

- Nunca inclua credenciais ou segredos no repositório.
- Não exponha informações sensíveis em logs.
- Valide dados recebidos de fontes externas.
- Trate dados persistidos como potencialmente inválidos.
- Evite operações destrutivas sem autorização.
- Não elimine dados existentes durante alterações de estrutura sem uma estratégia de preservação.

Enquanto a aplicação utilizar localStorage, mantenha sua implementação isolada das regras de negócio.

## 11. Git e commits

Repositório:
https://github.com/DanielVA35/TaskFlow-IA.git

Branch principal: `main`.

Regras obrigatórias:

- Desenvolva novas funcionalidades em branches próprias.
- Não faça commits diretamente na main sem autorização.
- Utilize Conventional Commits.
- Faça commits pequenos e coerentes.
- Cada commit deve representar uma alteração lógica.
- Não realize commits contendo credenciais, dependências instaladas ou arquivos temporários.
- Não utilize force push.
- Não realize merge sem autorização.
- Realize push quando solicitado e quando houver acesso ao repositório remoto.

Exemplos:
- `feat: add task registration`
- `fix: prevent empty task titles`
- `test: cover task validation rules`
- `refactor: isolate task persistence`
- `docs: update project instructions`

## 12. Documentação

Atualize a documentação quando houver mudanças relevantes em:

- Instalação e execução.
- Arquitetura.
- Decisões técnicas.
- Contratos.
- Funcionalidades disponíveis.
- Comandos de testes e validação.

Evite documentação redundante ou desatualizada.

## 13. Comunicação e entrega

Antes de implementar, apresente brevemente o entendimento da tarefa e a abordagem escolhida.

Durante a execução, comunique bloqueios relevantes.

Ao concluir, apresente:

1. O que foi implementado.
2. Principais arquivos alterados.
3. Decisões técnicas importantes.
4. Testes executados e resultados.
5. Resultado do build e lint.
6. Commits realizados.
7. Estado do push para o GitHub.
8. Pendências, riscos ou limitações.

Diferencie claramente o que foi implementado, o que foi efetivamente testado e o que ainda precisa ser validado.

## 14. Definição de pronto

Uma tarefa somente poderá ser considerada concluída quando:

- Os critérios de aceite forem atendidos.
- As regras de negócio forem respeitadas.
- Os testes relevantes estiverem implementados e aprovados.
- O gate de arquitetura for satisfeito.
- As verificações de qualidade disponíveis forem aprovadas.
- O código estiver revisado.
- As alterações estiverem commitadas conforme as instruções.
- A documentação necessária estiver atualizada.

Se alguma condição não for atendida, informe que a entrega está parcial e descreva as pendências.

## 15. Princípio fundamental

**Entenda antes de implementar. Valide antes de entregar.**

O agente possui liberdade para escolher os detalhes internos da implementação, desde que respeite:

- As entradas e saídas especificadas.
- As regras de negócio.
- Os contratos existentes.
- Os limites arquiteturais.
- Os testes e critérios de aceite.

O objetivo não é produzir a maior quantidade de código, mas entregar a solução mais simples que atenda corretamente aos requisitos, com qualidade verificável.