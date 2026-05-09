# lufay-receitas
# 🍽️ Lufay Receitas — Landing Page

Landing page de vendas desenvolvida para comercialização do e-book **"Fácil, Simples e Delicioso"** da Lufay Receitas. Projeto real em produção, construído como uma aplicação serverless rodando na edge da Cloudflare.

🔗 **[Ver projeto no ar →](https://lufayreceitas.pages.dev/)**

---

## 📋 Sobre o Projeto

A **Lufay Receitas** é uma startup de conteúdo culinário focada em receitas rápidas e acessíveis para o dia a dia. Esta landing page foi desenvolvida para converter visitantes em compradores do e-book digital com 25 receitas.

A arquitetura escolhida prioriza **performance e SEO**: o servidor entrega o HTML já montado (SSR), sem JavaScript pesado no cliente, garantindo carregamento rápido e boa indexação por buscadores.

---

## 🛠️ Stack Técnica

| Camada | Tecnologia | Versão |
|---|---|---|
| Runtime | Cloudflare Workers (Edge V8) | — |
| Framework backend | Hono | ^4.12.5 |
| Linguagem | TypeScript | ^5.x |
| Bundler | Vite | ^6.x |
| Deploy / CLI | Wrangler | ^4.x |
| Hospedagem | Cloudflare Pages | Free tier |

---

## 🏗️ Arquitetura

```
Request do usuário
       ↓
Cloudflare Edge (CDN global — 300+ pontos de presença)
       ↓
_worker.js (Hono compilado pelo Vite)
       ↓
Rota GET "/"     → retorna HTML completo (SSR)
Rota /static/*   → serve assets estáticos
```

O projeto segue o padrão **SSR leve (Server-Side Rendering)**: o Hono monta e entrega o HTML já pronto, sem necessidade de JavaScript no cliente. Isso garante carregamento rápido e boa indexação por buscadores.

---

## 📂 Estrutura de Arquivos

```
webapp/
├── src/
│   └── index.tsx          # Toda a aplicação (rotas + HTML)
├── public/
│   └── static/
│       ├── capa-ebook.jpg  # Imagem da capa (512×800px, 83KB)
│       └── logo-lufay.png  # Logotipo da marca (39KB)
├── dist/                   # Build gerado pelo Vite
│   ├── _worker.js          # Worker compilado (76KB)
│   ├── _routes.json        # Mapa de rotas do Cloudflare
│   └── static/             # Assets copiados do public/
├── vite.config.ts          # Configuração do bundler
├── wrangler.jsonc          # Configuração do Cloudflare
└── ecosystem.config.cjs    # PM2 para ambiente de dev
```

---

## 💡 Decisões Técnicas

**Por que Hono?**
Framework minimalista (~14KB) projetado para rodar no edge. Latência muito menor do que Express ou Fastify em ambiente Cloudflare Workers.

**Por que SSR ao invés de SPA com React/Vue?**
Para uma landing page de vendas, frameworks de frontend adicionam peso desnecessário. O HTML entregue pelo servidor já é o conteúdo final, sem hidratação ou bundle de client-side.

**Por que Cloudflare Pages?**
- Deploy em mais de 300 pontos de presença global
- HTTPS automático e gratuito
- Cold start praticamente zero (V8 isolates, diferente de AWS Lambda ou Railway)
- Free tier suficiente para o volume esperado de tráfego

**Assets estáticos:** servidos via `serveStatic` do próprio Hono (`hono/cloudflare-workers`), lendo os arquivos do bundle gerado pelo Vite em tempo de build — sem acesso ao sistema de arquivos em runtime (limitação do Workers runtime).

---

## ⚡ Performance

| Métrica | Estimativa |
|---|---|
| TTFB (Time to First Byte) | < 50ms (edge global) |
| Bundle size (`_worker.js`) | 76KB |
| Imagens otimizadas | < 85KB cada |
| Cold start | ~0ms (V8 isolates) |

---

## 🚀 Funcionalidades da Página

- Design responsivo — celular, tablet e desktop
- Seção hero com proposta de valor e CTA principal
- Listagem de conteúdo do e-book (25 receitas por categoria)
- Seção de depoimentos (prova social)
- FAQ com as principais objeções de compra
- Integração com plataforma de pagamento [Cakto](https://cakto.com.br)
- Links para redes sociais (Instagram, WhatsApp)
- Garantia de 7 dias destacada visualmente

---

## 🔮 Melhorias Futuras

- [ ] **Meta Pixel / Google Analytics** — já presentes no código, comentados, aguardando IDs
- [ ] **Depoimentos reais** — substituir os fictícios por capturas reais de clientes
- [ ] **Domínio próprio** — apontar `lufayreceitas.com.br` para o Cloudflare Pages
- [ ] **A/B Testing** — testar variações de headline e preço via Cloudflare Zaraz
- [ ] **Captura de leads** — formulário integrado ao Cloudflare D1 antes do checkout

---

## 👨‍💻 Desenvolvedor

**João Vittor Lara**
Estudante de Ciência da Computação — Uninter
📍 Curitiba, PR

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jo%C3%A3o-vittor-7b445631b/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/JoaoVittorLara)

---

## 📄 Licença

Projeto desenvolvido em contexto de startup. Código disponibilizado para fins de portfólio com autorização do co-fundador.
