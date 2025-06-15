# 🌱 Desperdício Zero - Plataforma de Doações de Alimentos

> **Tecnologia para Combater a Fome e Reduzir o Desperdício de Alimentos**

Uma plataforma digital que conecte feirantes, comerciantes e pequenos produtores com ONGs e instituições sociais, facilitando a doação de alimentos excedentes que, embora fora dos padrões comerciais, estejam em condições adequadas de consumo.

## 📖 Sobre o Projeto

### Contexto e Motivação

O desperdício de alimentos é uma problemática urbana com sérias consequências sociais, ambientais e econômicas. Em feiras livres e mercados, toneladas de alimentos ainda próprios para consumo são descartadas diariamente, enquanto milhares de pessoas enfrentam a insegurança alimentar nas cidades.

Alinhado ao **ODS 11 - "Cidades e comunidades sustentáveis"**, o Projeto Desperdício Zero surge como uma solução inovadora que promove o aproveitamento consciente de alimentos e o fortalecimento da solidariedade urbana.

### Objetivos

- **Conectar doadores e beneficiários**: Facilitar a conexão entre feirantes/comerciantes e ONGs/instituições sociais
- **Reduzir desperdício**: Diminuir significativamente o descarte de alimentos ainda próprios para consumo
- **Combater a fome**: Aumentar o número de refeições distribuídas por instituições sociais
- **Fortalecer solidariedade**: Promover engajamento social e construção de redes de apoio local

### Funcionalidades Principais

- ✅ **Cadastro de Doações**: Feirantes podem cadastrar alimentos disponíveis ao final do expediente
- ✅ **Visualização em Tempo Real**: ONGs visualizam doações disponíveis instantaneamente
- ✅ **Agendamento de Coletas**: Sistema de reserva e agendamento de retirada
- ✅ **Notificações Instantâneas**: Alertas automáticos sobre novas doações
- ✅ **Histórico e Controle**: Acompanhamento completo do processo de doações
- ✅ **Gestão de Usuários**: Cadastro e gerenciamento de feirantes, instituições e pessoas

## 🏗️ Arquitetura do Sistema

### Tecnologias Utilizadas

**Backend:**
- ☕ **Java 21**
- 🍃 **Spring Boot 3.5.0**
- 🗄️ **Spring Data JPA**
- 📊 **Liquibase** (Migração de banco)
- 🐘 **PostgreSQL** (Produção)
- 🧪 **H2 Database** (Desenvolvimento)
- 🏗️ **Lombok** (Redução de boilerplate)

**Frontend:**
- 🅰️ **Angular 19**
- 🎨 **Angular Material**
- 📱 **Design Responsivo**
- 🌐 **TypeScript**

**Infraestrutura:**
- 🔄 **RESTful APIs**
- 📱 **Progressive Web App (PWA)**
- 🧪 **Perfis de ambiente (dev/prod)**

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Java 21** ou superior
- **Node.js 18+** e **npm**
- **Maven 3.6+**
- **Git**

### 1. Clone o Repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd desperdicio-zero
```

### 2. Executando o Backend

```bash
cd server

# Compile e execute o projeto
./mvnw spring-boot:run

# Ou usando Maven instalado
mvn spring-boot:run
```

O servidor estará disponível em: `http://localhost:8080`

**💡 Console H2**: Acesse `http://localhost:8080/h2-console` para visualizar o banco de dados
- **URL**: `jdbc:h2:mem:desperdicioZero`
- **Username**: `sa`
- **Password**: *(deixe em branco)*

### 3. Executando o Frontend

```bash
cd front

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm start
# ou
ng serve
```

A aplicação estará disponível em: `http://localhost:4200`

## 📊 Banco de Dados

### Estrutura das Tabelas

- **PERSON**: Cadastro de pessoas
- **VENDOR**: Feirantes e comerciantes
- **INSTITUTION**: ONGs, abrigos e escolas
- **FOOD**: Catálogo de alimentos
- **DONATION**: Controle de doações
- **DONATION_ITEM**: Itens específicos de cada doação

### Dados Iniciais

O projeto inclui um arquivo `data.sql` que **executa automaticamente** no profile de desenvolvimento, populando o banco com:

- ✅ 15 pessoas cadastradas
- ✅ 12 feirantes/vendedores
- ✅ 10 instituições (ONGs, abrigos, escolas)
- ✅ 30 tipos de alimentos (frutas, verduras, legumes, grãos, etc.)
- ✅ 15 doações de exemplo
- ✅ Múltiplos itens por doação

**🔄 Recarga Automática**: Como o sistema usa `ddl-auto: create-drop`, os dados são recriados a cada restart da aplicação.

## 🌐 Endpoints da API

### Principais Rotas

```
GET    /api/pessoas          # Lista todas as pessoas
POST   /api/pessoas          # Cadastra nova pessoa
GET    /api/pessoas/{id}     # Busca pessoa por ID

GET    /api/feirantes        # Lista todos os feirantes
POST   /api/feirantes        # Cadastra novo feirante

GET    /api/instituicoes     # Lista todas as instituições
POST   /api/instituicoes     # Cadastra nova instituição

GET    /api/alimentos        # Lista todos os alimentos
POST   /api/alimentos        # Cadastra novo alimento

GET    /api/doacoes          # Lista todas as doações
POST   /api/doacoes          # Cadastra nova doação
```

## 🎯 Funcionalidades por Módulo

### 🏪 Gerenciar Feirantes
- Cadastro de vendedores e produtores
- Controle de ativação/desativação
- Histórico de doações realizadas

### 🏢 Gerenciar Instituições
- Cadastro de ONGs, abrigos e escolas
- Definição de capacidade de atendimento
- Categorização por tipo de instituição

### 🎁 Controlar Doações
- Cadastro de alimentos disponíveis
- Status de doação (Disponível/Coletado/Cancelado)
- Agendamento de coletas

### 🍎 Catálogo de Alimentos
- Gerenciamento de tipos de alimentos
- Categorização (Frutas, Verduras, Legumes, etc.)
- Controle de perecibilidade e validade

## 🔧 Configuração de Ambiente

### Profile de Desenvolvimento (dev)
- Banco H2 em memória
- Console H2 habilitado
- Logs SQL visíveis
- Execução automática do `data.sql`

### Profile de Produção (prod)
- Banco PostgreSQL
- Validação de schema
- Logs otimizados
- Sem execução de dados de teste

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 👥 Equipe

- **Yves Morello**
- **Vinicius Vilela**
- **Ricardo Francisco**

## 📈 Resultados Esperados

- 📉 Redução significativa do desperdício de alimentos nas feiras participantes
- 🍽️ Aumento no número de refeições distribuídas por instituições sociais
- 🤝 Fortalecimento da rede de solidariedade local
- 🌱 Contribuição para cidades mais sustentáveis e humanas

## 📜 Licença

Este projeto está sob licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**🌱 Desperdício Zero** - *Tecnologia a serviço da solidariedade*