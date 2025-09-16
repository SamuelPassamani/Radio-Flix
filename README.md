# Rádio Flix - Uma Experiência de Rádio Imersiva

## 1. Visão Geral do Projeto

O **Rádio Flix** é uma plataforma web moderna e interativa para uma estação de rádio online, projetada para oferecer uma experiência de audição contínua e visualmente cativante. Construído com tecnologias de ponta, o projeto vai além de um simples player, incorporando recursos dinâmicos, uma interface de usuário elegante e um design totalmente personalizado.

O objetivo é criar um hub central para os ouvintes, onde eles possam não apenas ouvir a transmissão ao vivo, mas também interagir com o conteúdo, como notícias, paradas musicais, pedidos de música e muito mais.

---

## 2. Recursos e Funcionalidades Implementadas

Até o momento, o projeto conta com um conjunto robusto de funcionalidades que formam o núcleo da experiência do usuário:

*   **Player de Rádio Persistente:**
    *   Localizado em uma barra lateral elegante, permite a navegação pelo site sem interrupções no áudio.
    *   **Animação de "Disco de Vinil":** A capa do álbum atual é exibida em formato circular e gira suavemente enquanto a música está tocando, parando instantaneamente ao pausar.
    *   **Metadados em Tempo Real:** Busca dinamicamente o nome da música e do artista através de uma API externa.
    *   **Capas de Álbum em Alta Resolução:** Integra-se com a API do iTunes para buscar e exibir a arte do álbum correspondente, com um sistema de cache para otimização.
    *   **Controles Intuitivos:** Inclui controles de Play/Pause, volume com slider e botão de mudo.

*   **Interface de Usuário Customizada:**
    *   **Design Coeso:** Uma paleta de cores e um sistema de design consistentes, aplicados a todos os componentes, desde botões até cards e widgets.
    *   **Barra de Rolagem Personalizada:** A barra de rolagem do navegador foi estilizada para combinar com a identidade visual da aplicação, aprimorando a imersão.
    *   **Layout Responsivo:** A interface se adapta de forma fluida a diferentes tamanhos de tela.

*   **Página Inicial Dinâmica:**
    *   Um layout rico em conteúdo, estruturado em widgets para "Últimas Notícias", "Galeria de Fotos", "Vídeo em Destaque" e "Top 10".

*   **Otimização de Performance:**
    *   Uso otimizado do componente `next/image`, incluindo a propriedade `sizes` para garantir o carregamento eficiente de imagens em todos os dispositivos.

---

## 3. Tecnologias e Ferramentas

O Rádio Flix é construído sobre uma base de tecnologias modernas e eficientes:

*   **Framework Principal:** **Next.js** (utilizando o App Router)
*   **Linguagem:** **TypeScript**
*   **Estilização:** **Tailwind CSS** (com configuração estendida para cores, fontes e animações personalizadas).
*   **Componentes de UI:** **shadcn/ui** (para componentes base como `Card`, `Button`, `Slider`, etc.).
*   **APIs Externas:**
    *   **Streaming:** Zeno.fm
    *   **Metadados da Música:** TWJ.ES API
    *   **Arte de Álbum:** Apple iTunes Search API

---

## 4. Versionamento

O controle de versão deste projeto é gerenciado através do Git.

---

## 5. Créditos

Este projeto foi concebido e desenvolvido através de uma colaboração entre o idealizador e um assistente de IA.

*   **Autor e Idealizador:** Samuel Passamani (CEO Studio A.Sério by ALLS Company)