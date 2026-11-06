# Inteligência artificial

A funcionalidade disponível é a geração de um quadro com etapas e tarefas a partir de um texto. A API usa OpenRouter, exige `OPENROUTER_API_KEY` e `OPENROUTER_MODEL`, limita o tamanho do plano e valida a resposta antes de persistir tudo em uma única operação.

Sem configuração, o botão de geração fica desabilitado e o usuário pode criar manualmente. A interface informa que o texto será compartilhado com o provedor. Os testes usam respostas simuladas; o envio real depende de credenciais e de um modelo com suporte a JSON.

Sugestão por histórico, chat, rotinas, estimativas e integrações externas ainda são ideias futuras.
