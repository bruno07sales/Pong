# Pong Responsivo

Uma versão responsiva do clássico jogo Pong, desenvolvida com HTML, CSS e JavaScript puro. O jogador controla a raquete esquerda e enfrenta o computador em partidas rápidas; vence quem marcar 5 pontos primeiro.

## Funcionalidades

- Partidas contra o computador
- Três níveis de dificuldade: fácil, normal e difícil
- Aumento gradual da velocidade da bola durante as trocas
- Placar exibido em tempo real
- Controles por teclado em computadores
- Botões de toque em celulares e tablets
- Interface adaptada para diferentes tamanhos e orientações de tela
- Opções para reiniciar a partida ou voltar ao menu

## Como jogar

1. Abra o jogo no navegador.
2. Escolha a dificuldade.
3. Clique em **Iniciar jogo**.
4. Movimente a raquete para impedir que a bola atravesse o seu lado da quadra.
5. Seja o primeiro a marcar 5 pontos.

### Controles

| Ação | Computador | Celular ou tablet |
| --- | --- | --- |
| Mover para cima | `W` ou `↑` | Botão `▲` |
| Mover para baixo | `S` ou `↓` | Botão `▼` |
| Reiniciar após o fim | `Espaço` ou botão **Jogar novamente** | Botão **Jogar novamente** |
| Voltar ao menu | `Esc` ou botão **Menu** | Botão **Menu** |



## Tecnologias

- HTML5
- CSS3
- JavaScript
- Canvas API
- Pointer Events API
- `requestAnimationFrame`

## Estrutura do projeto

```text
Pong/
├── index.html   # Estrutura da interface
├── style.css    # Estilos e responsividade
├── script.js    # Regras, controles e renderização do jogo
└── README.md    # Documentação do projeto
```

## Como funciona

O jogo é desenhado em um elemento `<canvas>`. A atualização dos movimentos e a renderização são realizadas continuamente com `requestAnimationFrame`. A raquete adversária acompanha a posição vertical da bola, e sua velocidade varia de acordo com a dificuldade selecionada.

O ângulo de retorno da bola depende do ponto em que ela atinge a raquete, tornando as partidas mais dinâmicas.

## Projeto para estudo

Durante o desenvolvimento deste projeto, foram estudados e aplicados os seguintes conteúdos de Engenharia de Software:

### 1. Separação de responsabilidades

O projeto foi dividido em arquivos com responsabilidades específicas: o `index.html` define a estrutura da interface, o `style.css` cuida da apresentação e da responsividade, e o `script.js` concentra as regras e o comportamento do jogo. No JavaScript, funções como `drawGame`, `updateGame` e `configureDifficulty` também separam a renderização, a atualização da partida e as configurações.

### 2. Gerenciamento de estado

O estado da partida é representado por objetos e variáveis que armazenam posições, velocidades, pontuação e situação do jogo. As funções `startGame`, `resetGame`, `checkWinner` e `openMenu` controlam as transições entre menu, partida em andamento e fim de jogo, mantendo o comportamento da aplicação organizado e previsível.

### 3. Laço de jogo e detecção de colisões

O jogo utiliza `requestAnimationFrame` para executar continuamente as etapas de atualização e renderização. A cada quadro, o sistema processa os controles, movimenta a bola e as raquetes, verifica colisões e atualiza o placar. A lógica foi dividida em funções menores, como `hasCollision`, `handlePaddleCollision` e `scorePoint`, facilitando a leitura, a manutenção e a evolução do código.