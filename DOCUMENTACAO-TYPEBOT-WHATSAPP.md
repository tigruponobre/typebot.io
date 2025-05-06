# Documentação do Sistema Typebot com Integração WhatsApp

## Visão Geral

Este documento fornece uma descrição detalhada do sistema Typebot integrado com WhatsApp, incluindo sua arquitetura, tecnologias utilizadas, funcionalidades principais e instruções passo a passo para execução em ambiente Docker.

## Índice

1. [Tecnologias e Frameworks](#tecnologias-e-frameworks)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Componentes Principais](#componentes-principais)
4. [Funcionalidades](#funcionalidades)
5. [Configuração e Execução](#configuração-e-execução)
6. [Integração com WhatsApp](#integração-com-whatsapp)
7. [Manutenção e Troubleshooting](#manutenção-e-troubleshooting)

## Tecnologias e Frameworks

### Stack Principal
- **Frontend**: Next.js (React), TypeScript
- **Backend**: Node.js v22, TypeScript
- **Banco de Dados**: PostgreSQL 16
- **Cache**: Redis Alpine
- **Armazenamento de Objetos**: MinIO (compatível com S3)
- **Gerenciador de Pacotes**: Bun 1.2.8
- **Containerização**: Docker e Docker Compose
- **Autenticação**: NextAuth.js
- **Integração WhatsApp**: Evolution API

### Bibliotecas e Ferramentas Principais
- **ORM**: Prisma
- **Validação de Dados**: Zod
- **Estilização**: Provavelmente Tailwind CSS ou Chakra UI
- **Monorepo**: Turborepo
- **Formatação e Linting**: Biome
- **API**: tRPC e REST APIs

## Arquitetura do Sistema

O sistema é composto por vários serviços Docker interconectados:

1. **typebot-builder**: Interface de construção de chatbots
2. **typebot-viewer**: Interface de visualização e interação com chatbots
3. **typebot-db**: Banco de dados PostgreSQL
4. **typebot-redis**: Cache Redis
5. **minio**: Armazenamento de objetos compatível com S3
6. **evolution_api**: API para integração com WhatsApp

A arquitetura segue um modelo de microsserviços, onde cada componente tem uma responsabilidade específica e se comunica através de redes Docker definidas.

## Componentes Principais

### Typebot Builder
- Interface visual para criação e edição de chatbots
- Gerenciamento de fluxos de conversação
- Configuração de integrações e temas
- Acesso administrativo

### Typebot Viewer
- Renderização dos chatbots para usuários finais
- Processamento de interações e respostas
- Coleta de dados e métricas

### Evolution API
- Integração com WhatsApp
- Gerenciamento de sessões de WhatsApp
- Processamento de mensagens e mídia

### Banco de Dados e Armazenamento
- PostgreSQL: Armazenamento de dados estruturados
- Redis: Cache e gerenciamento de sessões
- MinIO: Armazenamento de arquivos e mídia

## Funcionalidades

### Construção de Chatbots
- Editor visual de fluxos de conversação
- 34+ blocos de construção disponíveis
- Suporte para texto, imagens, vídeos, áudio e embeds
- Diversos tipos de inputs: texto, email, telefone, botões, etc.
- Lógica condicional e ramificações
- Integração com serviços externos via webhooks

### Personalização
- Temas personalizáveis
- Customização de fontes, cores, estilos
- Suporte para CSS personalizado
- Templates reutilizáveis

### Compartilhamento e Integração
- Domínio personalizado
- Incorporação como container, popup ou chat bubble
- Biblioteca JS nativa para incorporação
- Execução via requisições HTTP

### Análise de Resultados
- Métricas detalhadas
- Taxas de abandono e conclusão
- Exportação para CSV

### Integração com WhatsApp
- Envio e recebimento de mensagens via WhatsApp
- Suporte para mídia (imagens, áudios, vídeos)
- Gerenciamento de sessões de WhatsApp
- Webhooks para eventos de WhatsApp

## Configuração e Execução

### Pré-requisitos
- Docker e Docker Compose instalados
- Mínimo de 2GB de RAM disponível
- Portas 8080, 8081, 9000, 9001 e 3333 disponíveis

### Passo a Passo para Execução

1. **Clone o repositório (se aplicável)**
   ```bash
   git clone https://github.com/baptistearno/typebot.io.git
   cd typebot.io
   ```

2. **Configure o arquivo .env**
   - Copie o arquivo .env.example para .env
   - Ajuste as variáveis conforme necessário, especialmente:
     - URLs de acesso
     - Credenciais de administrador
     - Configurações de S3/MinIO

3. **Inicie os containers Docker**
   ```bash
   docker-compose up -d
   ```
   
   Ou, para a versão com integração WhatsApp:
   ```bash
   docker-compose -f docker-compose-novo.yml up -d
   ```

4. **Verifique se todos os serviços estão em execução**
   ```bash
   docker-compose ps
   ```

5. **Acesse as interfaces**
   - Builder: http://localhost:8080 (ou porta configurada)
   - Viewer: http://localhost:8081 (ou porta configurada)
   - MinIO Console: http://localhost:9001 (credenciais: minio/minio123)
   - Evolution API: http://localhost:3333 (se estiver usando a integração WhatsApp)

### Variáveis de Ambiente Importantes

```
# Segurança
ENCRYPTION_SECRET=chave_de_criptografia
NEXTAUTH_SECRET=chave_de_autenticacao

# URLs de acesso
NEXTAUTH_URL=http://localhost:8080
NEXTAUTH_URL_INTERNAL=http://typebot-builder:3000
NEXT_PUBLIC_VIEWER_URL=http://localhost:8081

# Banco de dados
DATABASE_URL=postgresql://postgres:typebot@typebot-db:5432/typebot

# Administração
ADMIN_EMAIL=seu_email@exemplo.com

# S3/MinIO
S3_ACCESS_KEY=minio
S3_SECRET_KEY=minio123
S3_BUCKET=typebot
S3_PORT=9000
S3_ENDPOINT=minio
S3_SSL=false

# Configurações adicionais
DEFAULT_WORKSPACE_PLAN=UNLIMITED
SMTP_AUTH_DISABLED=true
```

## Integração com WhatsApp

A integração com WhatsApp é realizada através da Evolution API, que permite conectar o Typebot ao WhatsApp.

### Configuração da Evolution API

1. **Acesse a API**
   - URL: http://localhost:3333
   - API Key: Definida na variável AUTHENTICATION_API_KEY no docker-compose-novo.yml

2. **Crie uma instância do WhatsApp**
   - Use a interface da Evolution API ou faça uma requisição POST para `/api/instance/create`
   - Escaneie o código QR para autenticar

3. **Configure webhooks no Typebot**
   - Crie um bloco de webhook no seu fluxo do Typebot
   - Configure o webhook para enviar mensagens para a Evolution API
   - Formato da URL: `http://evolution_api:8080/api/messages/send`

4. **Receba mensagens do WhatsApp**
   - Configure um webhook na Evolution API para enviar mensagens recebidas para o Typebot
   - Use a API do Typebot para processar as mensagens recebidas

### Exemplo de Integração

```javascript
// Exemplo de envio de mensagem para o WhatsApp via webhook do Typebot
{
  "method": "POST",
  "url": "http://evolution_api:8080/api/messages/send",
  "headers": {
    "Content-Type": "application/json",
    "apikey": "0417bf43b0a8969bd6685bcb49d783df"
  },
  "body": {
    "number": "{{Phone}}",
    "message": "Olá {{Name}}, obrigado por entrar em contato!"
  }
}
```

## Manutenção e Troubleshooting

### Backup do Banco de Dados

```bash
docker exec typebot-db pg_dump -U postgres typebot > typebot_backup.sql
```

### Logs dos Containers

```bash
# Ver logs do builder
docker-compose logs -f typebot-builder

# Ver logs do viewer
docker-compose logs -f typebot-viewer

# Ver logs da API do WhatsApp
docker-compose logs -f api
```

### Problemas Comuns

1. **Erro de conexão com o banco de dados**
   - Verifique se o container do PostgreSQL está em execução
   - Confirme se a variável DATABASE_URL está correta

2. **Problemas com upload de arquivos**
   - Verifique se o MinIO está configurado corretamente
   - Confirme se as variáveis S3_* estão corretas

3. **Problemas com a integração do WhatsApp**
   - Verifique se a Evolution API está em execução
   - Confirme se o QR code foi escaneado corretamente
   - Verifique os logs da API para mensagens de erro

4. **Erro de autenticação**
   - Confirme se as variáveis NEXTAUTH_* estão configuradas corretamente
   - Verifique se o email de administrador está correto em ADMIN_EMAIL

### Atualização do Sistema

```bash
# Pare os containers
docker-compose down

# Puxe as novas imagens
docker-compose pull

# Inicie os containers novamente
docker-compose up -d
```

---

Este documento fornece uma visão geral do sistema Typebot com integração WhatsApp. Para informações mais detalhadas, consulte a documentação oficial do Typebot em https://docs.typebot.io/ e da Evolution API.