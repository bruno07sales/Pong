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
