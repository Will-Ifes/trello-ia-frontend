# Inteligência artificial

A geração transforma um texto em um quadro com etapas e tarefas. O backend usa a Groq, com o modelo `openai/gpt-oss-20b`, disponível no plano gratuito. A chave `GROQ_API_KEY` fica somente no servidor. Configure-a como **Secret/Sensitive** em Production no projeto backend da Vercel e publique novamente. Nenhuma chave é necessária no frontend.

## Dados e limites

- Somente o texto digitado é enviado ao provedor, sem nome, e-mail ou conteúdo dos outros quadros.
- Evite incluir dados sensíveis. A Groq declara que não usa inferências para treino e não retém entradas/saídas por padrão, com exceções: [política de dados](https://console.groq.com/docs/your-data). Confira as configurações da conta do provedor.
- São permitidas 5 tentativas por usuário/dia UTC, incluindo falhas, com bloqueio de chamadas simultâneas persistido no PostgreSQL.
- As cotas gratuitas da Groq são compartilhadas pela aplicação. Ao atingir uma cota, a interface informa o problema; não há retentativa automática nem provedor pago de fallback. Mantenha a conta no plano Free.
- O modelo recebe um esquema JSON estrito. O backend também verifica tipos, quantidade de listas/cartões e tamanho dos textos antes de gravar o quadro em uma operação atômica.
- A IA não executa ferramentas ou código e não acessa os quadros existentes. Revise as tarefas geradas antes de executá-las.

Sem a chave, o botão fica desabilitado e a criação manual segue disponível. Erros e respostas incompletas não criam quadros parciais. O backend trata indisponibilidade, configuração inválida e limite da cota com mensagens específicas, sem expor detalhes ou credenciais do provedor.

Os testes automatizados simulam o provedor e verificam persistência, isolamento entre usuários e concorrência no banco. Um teste real exige a chave da sua conta e consome a cota gratuita.

[Crie sua chave](https://console.groq.com/keys) · [Cotas atuais](https://console.groq.com/docs/rate-limits) · [Respostas estruturadas](https://console.groq.com/docs/structured-outputs)

Sugestão por histórico, chat, rotinas, estimativas e integrações externas ainda são ideias futuras.
