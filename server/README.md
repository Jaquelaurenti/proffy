# Funcionalidades


## Conexões

- Rota para listar o total de conexões
- Rota para criar uma nova conexão

## Aulas

- Rota para criar aulas
- Rota para listar aulas
  - Filtrar por matéria, dia da semana e horãrio


## Execução das Migrations

Foi criado um script para leitura do knex, já que ele só le arquivos JS.
Com isso, precisamos indicar que será lido arquivos TS.
No package.json foi add os scripts referentes ao Knex.

"knex:migrate":"knex --knexfile knexfile.ts migrate:latest",
"knex:migrate:rollback":"knex --knexfile knexfile.ts migrate:rollback"

Conforme for precisando rodar mais métodos sobre o Knex, será necessário ir adicionando nos scripts.
