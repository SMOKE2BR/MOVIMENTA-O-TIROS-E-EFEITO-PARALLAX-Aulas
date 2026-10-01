<<<<<<< HEAD
# Parallax + Disparos (Phaser 3)

## Estrutura
- index.html
- main.js
- assets/
  - bg_far.png
  - bg_mid.png
  - bg_near.png
  - ship.png
  - bullet.png

## Como executar (local)
1. Coloque todos os arquivos em uma pasta.
2. Abra um servidor local na pasta do projeto:
   - Com Node: `npx http-server`
   - Ou com Python 3: `python -m http.server 8000`
3. Abra no navegador: `http://localhost:8080` (ou `http://localhost:8000` conforme o servidor).

> Não abra o `index.html` diretamente pelo sistema de arquivos; alguns navegadores bloqueiam carregamento de assets sem servidor.

## Controles
- **Setas**: mover a nave (↑ ↓ ← →)
- **SPACE**: atirar
  - Sem setas: tiro frontal (para cima)
  - ← ou → + SPACE: tiro lateral
  - ↑ + → + SPACE (por exemplo): tiro diagonal

## O que foi implementado
- **Parallax** com 3 camadas (`bg_far`, `bg_mid`, `bg_near`) movendo-se em velocidades diferentes.
- **Movimentação da nave** usando física Arcade (aceleração, drag, limite de velocidade) — a nave continua respondendo enquanto o cenário se move.
- **Sistema de disparos**:
  - Pool de projéteis (máx 50) para evitar criação/destruição excessiva.
  - Direção do projétil definida pelo estado das teclas direcionais no momento do disparo.
  - Projéteis são desativados ao sair da tela e reaproveitados.
- **Cooldown** entre tiros para evitar disparo excessivo.

## Roteiro curto para demonstração (vídeo)
1. Inicie o servidor e abra o jogo.
2. Mostre o parallax (observe camadas se movendo em velocidades diferentes).
3. Mova a nave enquanto o fundo se desloca.
4. Faça um tiro frontal (SPACE sem setas).
5. Faça um tiro lateral (← + SPACE ou → + SPACE).
6. Faça um tiro diagonal (↑ + → + SPACE).
7. Mostre o README e explique como executar.

## Observações e ajustes
- Ajuste `this.sceneSpeed` em `main.js` para aumentar/diminuir a velocidade do parallax.
- Troque as imagens em `assets/` por outras tileáveis para melhor efeito visual.
- Para adicionar som ao disparo, carregue um áudio em `preload()` e toque em `spawnBullet()`.

# MOVIMENTA-O-TIROS-E-EFEITO-PARALLAX-Aulas
>>>>>>> 0242d3c251cf796176f97e786deeac6290f45a25
