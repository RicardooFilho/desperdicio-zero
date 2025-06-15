DELETE FROM DONATION_ITEM WHERE 1=1;
DELETE FROM DONATION WHERE 1=1;
DELETE FROM FOOD WHERE 1=1;
DELETE FROM INSTITUTION WHERE 1=1;
DELETE FROM VENDOR WHERE 1=1;
DELETE FROM PERSON WHERE 1=1;

INSERT INTO PERSON (NAME, ACTIVE) VALUES
('Maria Silva Santos', true),
('João Pedro Oliveira', true),
('Ana Carolina Costa', true),
('Carlos Eduardo Lima', true),
('Fernanda Souza Alves', true),
('Roberto Carlos Pereira', true),
('Juliana Martins Rocha', true),
('Paulo Henrique Barbosa', true),
('Camila Rodrigues Dias', true),
('Anderson Luiz Ferreira', true),
('Patricia Gomes Ribeiro', true),
('Ricardo Augusto Moura', true),
('Luciana Cristina Araujo', true),
('Marcelo Antonio Silva', true),
('Renata Paula Nascimento', true);


INSERT INTO VENDOR (NAME, PHONE, ACTIVE) VALUES
('Feira do João - Centro', '(11) 99876-5432', true),
('Mercado São José', '(11) 98765-4321', true),
('Padaria Pão Dourado', '(11) 97654-3210', true),
('Feira Livre Vila Mariana', '(11) 96543-2109', true),
('Supermercado Bom Preço', '(11) 95432-1098', true),
('Quitanda Dona Rosa', '(11) 94321-0987', true),
('Açougue e Frios Central', '(11) 93210-9876', true),
('Hortifruti Verde Vida', '(11) 92109-8765', true),
('Padaria Artesanal Delícia', '(11) 91098-7654', true),
('Feira Orgânica Sustentável', '(11) 90987-6543', true),
('Mercado Municipal Norte', '(11) 89876-5432', true),
('Distribuidora Frutas & Cia', '(11) 88765-4321', true);


INSERT INTO INSTITUTION (NAME, DESCRIPTION, CNPJ, CAPACITY, INSTITUTION_TYPE, ID_OWNER) VALUES
('Casa do Bem - Assistência Social', 'ONG que atende famílias em situação de vulnerabilidade social oferecendo alimentação e apoio', '12.345.678/0001-90', 200, 'ONG', 1),
('Lar Esperança - Abrigo', 'Abrigo para crianças e adolescentes em situação de risco', '23.456.789/0001-01', 50, 'ABRIGO', 2),
('Escola Municipal Futuro Brilhante', 'Escola pública que atende crianças da comunidade local', '34.567.890/0001-12', 300, 'ESCOLA', 3),
('Instituto Mãos Solidárias', 'Organização que trabalha com pessoas em situação de rua', '45.678.901/0001-23', 150, 'ONG', 4),
('Abrigo São Francisco', 'Abrigo para idosos em situação de vulnerabilidade', '56.789.012/0001-34', 80, 'ABRIGO', 5),
('Creche Pequenos Anjos', 'Creche comunitária para crianças de 0 a 5 anos', '67.890.123/0001-45', 120, 'ESCOLA', 6),
('ONG Amor ao Próximo', 'Organização focada no combate à fome na região metropolitana', '78.901.234/0001-56', 250, 'ONG', 7),
('Casa de Apoio Vida Nova', 'Casa de apoio para mulheres em situação de violência', '89.012.345/0001-67', 40, 'ABRIGO', 8),
('Escola Técnica Profissionalizante', 'Escola técnica que oferece cursos para jovens da comunidade', '90.123.456/0001-78', 180, 'ESCOLA', 9),
('Centro Comunitário Unidos', 'Centro que oferece várias atividades sociais e distribuição de alimentos', '01.234.567/0001-89', 100, 'ONG', 10);


INSERT INTO FOOD (NAME, DESCRIPTION, CATEGORY, PERISHABLE, SHELF_LIFE) VALUES
('Banana Prata', 'Banana doce, rica em potássio', 'FRUTA', true, 5),
('Maçã Gala', 'Maçã vermelha, crocante e doce', 'FRUTA', true, 15),
('Laranja Pera', 'Laranja doce, ideal para suco', 'FRUTA', true, 10),
('Mamão Papaya', 'Mamão pequeno, muito doce', 'FRUTA', true, 7),
('Abacaxi Pérola', 'Abacaxi doce e suculento', 'FRUTA', true, 8),
('Manga Tommy', 'Manga grande e saborosa', 'FRUTA', true, 6),
('Uva Thompson', 'Uva verde sem semente', 'FRUTA', true, 7),

('Alface Americana', 'Alface crocante para saladas', 'VERDURA', true, 3),
('Rúcula', 'Folhas verdes com sabor levemente picante', 'VERDURA', true, 2),
('Espinafre', 'Rico em ferro e vitaminas', 'VERDURA', true, 3),
('Couve Manteiga', 'Verdura tradicional brasileira', 'VERDURA', true, 4),
('Acelga', 'Folhas verdes nutritivas', 'VERDURA', true, 3),

('Tomate Salada', 'Tomate vermelho maduro', 'LEGUME', true, 5),
('Cenoura', 'Rica em vitamina A', 'LEGUME', true, 15),
('Batata Inglesa', 'Batata para diversos preparos', 'LEGUME', true, 20),
('Cebola Roxa', 'Cebola doce para saladas', 'LEGUME', true, 30),
('Abobrinha', 'Legume versátil e saudável', 'LEGUME', true, 8),
('Brócolis', 'Rico em vitaminas e minerais', 'LEGUME', true, 5),

('Arroz Branco', 'Arroz tipo 1, longo fino', 'GRAO', false, 365),
('Feijão Carioca', 'Feijão tradicional brasileiro', 'GRAO', false, 365),
('Lentilha', 'Leguminosa rica em proteínas', 'GRAO', false, 365),
('Grão de Bico', 'Rico em proteínas vegetais', 'GRAO', false, 365),
('Quinoa', 'Superalimento rico em proteínas', 'GRAO', false, 365),

('Pão Francês', 'Pão tradicional brasileiro', 'SALGADO', true, 1),
('Pão de Forma', 'Pão fatiado para sanduíches', 'SALGADO', true, 5),
('Coxinha', 'Salgado frito tradicional', 'SALGADO', true, 1),
('Pastel Assado', 'Pastel de forno com recheio', 'SALGADO', true, 2),
('Empada de Frango', 'Empada com recheio de frango', 'SALGADO', true, 3),

('Bolo de Chocolate', 'Bolo caseiro de chocolate', 'DOCE', true, 3),
('Brigadeiro', 'Doce tradicional brasileiro', 'DOCE', true, 5),
('Pudim de Leite', 'Pudim caseiro cremoso', 'DOCE', true, 5),
('Torta de Maçã', 'Torta doce com maçãs', 'DOCE', true, 4),
('Beijinho', 'Doce de coco tradicional', 'DOCE', true, 7);

INSERT INTO DONATION (DESCRIPTION, STATUS, ID_VENDOR) VALUES
('Excesso de frutas da feira - bananas e maçãs em bom estado, ideais para consumo imediato', 'DISPONIVEL', 1),
('Sobras de padaria - pães do dia anterior, ainda frescos', 'DISPONIVEL', 3),
('Verduras frescas que não foram vendidas - alface, tomate e cenoura', 'DISPONIVEL', 4),
('Frutas da época - manga e abacaxi maduros', 'COLETADO', 6),
('Doces caseiros - bolos e pudins feitos ontem', 'DISPONIVEL', 9),
('Legumes variados - batata, cebola e abobrinha', 'DISPONIVEL', 8),
('Grãos próximos ao vencimento - arroz e feijão', 'COLETADO', 5),
('Salgados não vendidos - coxinhas e pastéis', 'DISPONIVEL', 3),
('Frutas com pequenos defeitos estéticos mas ótimas para consumo', 'DISPONIVEL', 10),
('Excesso de produção de verduras orgânicas', 'DISPONIVEL', 10),
('Produtos de padaria do final do dia', 'COLETADO', 9),
('Legumes da feira - tomate e brócolis frescos', 'DISPONIVEL', 11),
('Frutas tropicais maduras', 'CANCELADO', 12),
('Doações mistas - frutas, verduras e pães', 'DISPONIVEL', 2),
('Sobras de hortifruti - produtos ainda bons para consumo', 'DISPONIVEL', 7);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(15.5, 1, 1),
(8.0, 1, 2),
(12.0, 1, 3);

INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(50, 2, 21),
(3, 2, 22),
(20, 2, 25);

INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(5.0, 3, 8),
(10.0, 3, 13),
(8.0, 3, 14);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(20.0, 4, 6),
(15.0, 4, 5);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(2, 5, 26),
(30, 5, 27),
(5, 5, 28);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(25.0, 6, 15),
(10.0, 6, 16),
(12.0, 6, 17);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(50.0, 7, 18),
(30.0, 7, 19);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(25, 8, 23),
(30, 8, 24);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(18.0, 9, 1),
(22.0, 9, 4),
(10.0, 9, 7);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(8.0, 10, 9),
(6.0, 10, 10),
(12.0, 10, 11);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(40, 11, 21),
(2, 11, 29),
(25, 11, 30);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(15.0, 12, 13),
(8.0, 12, 18);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(12.0, 13, 6),
(8.0, 13, 5);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(10.0, 14, 2),
(20, 14, 22);


INSERT INTO DONATION_ITEM (QUANTITY, ID_DONATION, ID_FOOD) VALUES
(8.0, 15, 14),
(6.0, 15, 12);