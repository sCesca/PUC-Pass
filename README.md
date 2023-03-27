# PUC-Pass
Com o objetivo garantir viagens mais seguras e agilizar o embarque dos usuários do transporte público coletivo, o pagamento embarcado em dinheiro da tarifa de ônibus urbano está sendo extinto na maior parte das cidades. Secretarias de Transporte dos Municípios tem buscado soluções inovadoras como forma de tornar as viagens mais seguras para usuários e os motoristas do transporte público. Além disso, estes sistemas inovadores de bilhete urbano também têm sido aplicados aos veículos do BRT (Bus Rapid Transit; Ônibus de Trânsito Rápido) e metrôs.

# Escopo do projeto

A função do sistema de Bilhete Urbano é dar apoio computadorizado para comercialização e utilização do bilhete urbano.

# Fluxo de Utilização do Bilhete Urbano

1 - O primeiro passo, é o usuário de transporte público gerar o seu cartão de Bilhete Urbano através da funcionalidade de Geração de Bilhete Urbano.

2 – O usuário de transporte público tendo obtido um código de Bilhete Urbano, ele pode efetuar a Recarga. Existem várias categorias de bilhetes, todos eles gerenciados por tempo de expiração e não por saldo de crédito.

3 – O usuário de transporte público fará a Utilização do bilhete respeitando a regra do tempo de expiração.

4 – O usuário de transporte público poderá gerar no sistema Relatório de gerenciamento, no qual será possível identificar quais bilhetes estão vigentes e seus respectivos históricos de utilização.

# Sistema de Gerenciamento de Bilhete Urbano

Para o controle e gerenciamento do Bilhete Urbano será necessário o desenvolvimento de um sistema WEB, com base de dados, contendo:

Front-End:

- Interface da Geração de Bilhete Urbano
- Interface da Recarga
- Interface da Utilização do Bilhete
- Interface para o Relatório de Gerenciamento

Back-End:

- Conecta todos os fronts para obtenção dos dados que serão armazenados no sistema, permitindo o seu funcionamento.

# Geração de Bilhete Urbano

O usuário de transporte público ao acessar o sistema escolherá a opção de Geração de Bilhete Urbano. O sistema deverá apresentar ao usuário uma breve explicação de uso do Bilhete Urbano e suas regras, solicitando ao usuário a sua confirmação de aceite. Uma vez confirmado o aceite das regras de utilização, o sistema gerará um código de identificação único para o Bilhete Urbano gerado para o usuário. É importante que o sistema registre a data e hora de geração do bilhete urbano.

#Recarga

O usuário de transporte público ao acessar o sistema escolherá a opção de Recarga. O sistema deverá apresentar, para a escolha do usuário, as opções de recarga abaixo:

1. Bilhete único, que dará direito ao usuário utilizar o bilhete apenas uma vez. Deverá aparecer mensagem ao usuário explicando o modo de utilização, o valor a ser pago e a confirmação para o aceite da compra.

2. Bilhete duplo, que dará direito ao usuário utilizar o bilhete duas vezes. Deverá aparecer mensagem ao usuário explicando o modo de utilização, o valor a ser pago e a confirmação para o aceite da compra.

3. Bilhete de 7 dias, que dará ao usuário utilizar o transporte por um período de 7 dias. Deverá aparecer mensagem ao usuário explicando o modo de utilização, o valor a ser pago e a confirmação para o aceite da compra.

4. Bilhete de 30 dias, que dará ao usuário utilizar o transporte por um período de dias. Deverá aparecer mensagem ao usuário explicando o modo de utilização, o valor a ser pago e a confirmação para o aceite da compra. Para cada recarga efetuada no Bilhete Urbano o sistema deverá registrar a data e hora da recarga e o tipo de recarga.

# Utilização do Bilhete

O usuário de transporte público, ao acessar o sistema de utilização do bilhete, digitará o número do Bilhete Urbano e o sistema irá liberar o acesso ao transporte público seguindo as seguintes regras:

1. Para o Bilhete único o sistema irá debitar o crédito do bilhete, e dará ao usuário o direito utilizar o mesmo bilhete em quantos transportes quiser, por um período de 40 minutos. Deverá aparecer mensagem ao usuário mostrando as regras de utilização e o tempo restante para utilização do Bilhete único.

2. Para o Bilhete duplo o sistema irá debitar um crédito do bilhete. Para cada período de utilização do Bilhete duplo o usuário poderá utilizar o mesmo bilhete em quantos transportes quiser, por um período de 40 minutos. Deverá aparecer mensagem ao usuário mostrando as regras de utilização e o tempo restante para utilização do Bilhete duplo e a quantidade de crédito do bilhete.

3. Para o Bilhete de 7 dias o sistema deverá guardar a data e hora da primeira utilização do bilhete. Este tiplo de bilhete dará ao usuário o direito de utilizar o transporte público quantas vezes quiser durante o período de 7 dias, contados apartir da primeira utilização do bilhete. Deverá aparecer mensagem ao usuário mostrando as regras de utilização o tempo restante para utilização deste bilhete.

4. Para o Bilhete de 30 dias o sistema deverá guardar a data e hora da primeira utilização do bilhete. Este tiplo de bilhete dará ao usuário o direito de utilizar o transporte público quantas vezes quiser durante o período de 30 dias, contados apartir da primeira utilização do bilhete. Deverá aparecer mensagem ao usuário mostrando as regras de utilização o tempo restante para utilização deste bilhete. Para cada Utilização do bilhete o sistema deverá guardar a data e hora da primeira utilização, para efetuar posteriores calculos de tempo.

# Relatório de Gerenciamento

O usuário de transporte público, ao acessar o sistema de relatório de gerenciamento, digitará o número do Bilhete Urbano e o sistema irá mostrar um relatório contendo:
- Data da Geração do Bilhete Urbano
- Data e tipo de cada recarga efetuardas no Bilhete Urbano o Para cada recarga efetuada, mostrar um histórico de utizações, contendo a data e
