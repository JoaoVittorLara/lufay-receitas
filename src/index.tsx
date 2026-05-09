import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Servir arquivos estáticos da pasta public
app.use('/static/*', serveStatic({ root: './' }))

// Rota principal — Landing Page de Vendas
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="25 receitas fáceis, simples e deliciosas para o seu dia a dia. Café da manhã, almoço, janta e lanches prontos em até 40 minutos." />
  <title>Lufay Receitas — 25 Receitas Fáceis, Simples e Deliciosas</title>

  <!-- ═══════════════════════════════════════ -->
  <!-- Meta Pixel — substitua YOUR_PIXEL_ID   -->
  <!-- ═══════════════════════════════════════ -->
  <!--
  <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  </script>
  -->

  <!-- ═══════════════════════════════════════ -->
  <!-- Google Analytics — substitua GA_ID     -->
  <!-- ═══════════════════════════════════════ -->
  <!--
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
  -->

  <!-- Fontes -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <!-- Font Awesome (ícones) -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />

  <style>
    /* ═══════════════════════════════════════════
       RESET E VARIÁVEIS GLOBAIS
    ═══════════════════════════════════════════ */
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --marrom:       #3B1F0A;   /* marrom escuro da marca */
      --amarelo:      #F0A500;   /* amarelo dourado da marca */
      --amarelo-claro:#FFF3D4;   /* fundo suave */
      --laranja-bg:   #F5A623;   /* laranja vibrante */
      --branco:       #FFFFFF;
      --cinza-texto:  #4A4A4A;
      --verde-ok:     #2D7A2D;
      --fonte-titulo: 'Playfair Display', Georgia, serif;
      --fonte-corpo:  'Inter', sans-serif;
      --sombra-cta:   0 6px 32px rgba(240, 165, 0, 0.55);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--fonte-corpo);
      background: #FDFAF5;
      color: var(--cinza-texto);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* ═══════════════════════════════════════════
       BARRA SUPERIOR DE URGÊNCIA
    ═══════════════════════════════════════════ */
    .urgency-bar {
      background: var(--marrom);
      color: var(--amarelo);
      text-align: center;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .urgency-bar span {
      color: #fff;
      font-weight: 400;
    }

    /* ═══════════════════════════════════════════
       SEÇÃO HERO — ACIMA DA DOBRA
    ═══════════════════════════════════════════ */
    .hero {
      background: linear-gradient(160deg, var(--marrom) 0%, #5C3317 55%, #7A4520 100%);
      color: var(--branco);
      padding: 64px 20px 72px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    /* Padrão decorativo de fundo (ícones de comida sutis) */
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(circle at 15% 20%, rgba(240,165,0,0.08) 0%, transparent 50%),
        radial-gradient(circle at 85% 80%, rgba(240,165,0,0.06) 0%, transparent 50%);
      pointer-events: none;
    }

    .hero-badge {
      display: inline-block;
      background: var(--amarelo);
      color: var(--marrom);
      font-size: 12px;
      font-weight: 800;
      padding: 6px 18px;
      border-radius: 100px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 28px;
    }

    .hero h1 {
      font-family: var(--fonte-titulo);
      font-size: clamp(32px, 6vw, 64px);
      font-weight: 900;
      line-height: 1.15;
      max-width: 780px;
      margin: 0 auto 24px;
    }

    .hero h1 .destaque {
      color: var(--amarelo);
      display: block;
    }

    .hero-sub {
      font-size: clamp(16px, 2.5vw, 20px);
      opacity: 0.88;
      max-width: 580px;
      margin: 0 auto 40px;
      line-height: 1.75;
    }

    /* Indicadores rápidos abaixo do subtítulo */
    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-bottom: 44px;
      flex-wrap: wrap;
    }
    .hero-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .hero-stat-num {
      font-size: clamp(20px, 4vw, 32px);
      font-weight: 800;
      color: var(--amarelo);
      font-family: var(--fonte-titulo);
      line-height: 1;
      white-space: nowrap;
    }
    .hero-stat-label {
      font-size: 12px;
      opacity: 0.75;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Botão CTA principal */
    .cta-btn {
      display: inline-block;
      background: var(--amarelo);
      color: var(--marrom);
      font-size: clamp(16px, 2.5vw, 20px);
      font-weight: 800;
      padding: 18px 48px;
      border-radius: 12px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      box-shadow: var(--sombra-cta);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      letter-spacing: 0.3px;
    }
    .cta-btn:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 40px rgba(240,165,0,0.65);
    }
    .cta-btn:active {
      transform: translateY(0) scale(0.99);
    }

    .cta-garantia {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 16px;
      font-size: 13px;
      opacity: 0.7;
      flex-wrap: wrap;
    }
    .cta-garantia span { color: var(--amarelo); font-weight: 600; }

    /* Imagem de capa flutuante */
    .hero-book-wrapper {
      margin-top: 52px;
      position: relative;
      display: inline-block;
    }
    .hero-book-img {
      width: 220px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.45);
      transition: transform 0.4s ease;
    }
    .hero-book-img:hover { transform: rotate(-2deg) scale(1.03); }

    .hero-book-badge {
      position: absolute;
      top: -14px;
      right: -14px;
      background: var(--amarelo);
      color: var(--marrom);
      font-weight: 900;
      font-size: 13px;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1.2;
      text-align: center;
      box-shadow: 0 4px 16px rgba(240,165,0,0.5);
    }
    .hero-book-badge strong { font-size: 22px; display: block; }

    /* ═══════════════════════════════════════════
       FAIXA DE PROVA SOCIAL RÁPIDA
    ═══════════════════════════════════════════ */
    .social-strip {
      background: var(--amarelo-claro);
      border-top: 3px solid var(--amarelo);
      border-bottom: 3px solid var(--amarelo);
      padding: 20px;
      text-align: center;
    }
    .social-strip p {
      font-size: clamp(14px, 2vw, 16px);
      color: var(--marrom);
      font-weight: 600;
    }
    .social-strip .estrelas {
      color: var(--amarelo);
      font-size: 18px;
      display: block;
      margin-bottom: 6px;
    }

    /* ═══════════════════════════════════════════
       SEÇÃO DE DOR — ESPELHO DA REALIDADE
    ═══════════════════════════════════════════ */
    .pain-section {
      padding: 80px 20px;
      max-width: 720px;
      margin: 0 auto;
      text-align: center;
    }
    .section-label {
      display: inline-block;
      background: rgba(240,165,0,0.15);
      color: var(--marrom);
      font-size: 12px;
      font-weight: 800;
      padding: 5px 16px;
      border-radius: 100px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 20px;
      border: 1px solid rgba(240,165,0,0.3);
    }
    .section-title {
      font-family: var(--fonte-titulo);
      font-size: clamp(26px, 4.5vw, 42px);
      font-weight: 700;
      color: var(--marrom);
      line-height: 1.25;
      margin-bottom: 28px;
    }
    .section-title .amarelo { color: var(--amarelo); }

    .pain-list {
      list-style: none;
      text-align: left;
      display: inline-block;
      margin: 0 auto 36px;
    }
    .pain-list li {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      font-size: clamp(15px, 2vw, 18px);
      line-height: 1.6;
      margin-bottom: 16px;
      color: var(--cinza-texto);
    }
    .pain-list li .icon-x {
      color: #D63031;
      font-size: 18px;
      margin-top: 3px;
      flex-shrink: 0;
    }

    .pain-turn {
      background: var(--marrom);
      color: var(--branco);
      border-radius: 16px;
      padding: 32px;
      margin-top: 40px;
      text-align: left;
    }
    .pain-turn h3 {
      font-family: var(--fonte-titulo);
      font-size: clamp(20px, 3vw, 28px);
      color: var(--amarelo);
      margin-bottom: 16px;
    }
    .pain-turn p {
      font-size: clamp(15px, 2vw, 17px);
      opacity: 0.9;
      line-height: 1.75;
    }

    /* ═══════════════════════════════════════════
       SEÇÃO "O QUE VOCÊ RECEBE"
    ═══════════════════════════════════════════ */
    .what-section {
      background: linear-gradient(180deg, var(--amarelo-claro) 0%, #fff 100%);
      padding: 80px 20px;
    }
    .what-inner {
      max-width: 1000px;
      margin: 0 auto;
      text-align: center;
    }
    .what-inner .section-title { margin-bottom: 12px; }
    .what-sub {
      font-size: clamp(15px, 2vw, 18px);
      color: var(--cinza-texto);
      max-width: 580px;
      margin: 0 auto 56px;
    }

    /* Grade de categorias */
    .recipe-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
      margin-bottom: 60px;
    }
    .category-card {
      background: var(--branco);
      border-radius: 20px;
      padding: 36px 28px;
      box-shadow: 0 4px 24px rgba(59,31,10,0.09);
      border: 2px solid transparent;
      transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
      text-align: left;
    }
    .category-card:hover {
      border-color: var(--amarelo);
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(240,165,0,0.18);
    }
    .cat-icon {
      width: 56px;
      height: 56px;
      background: var(--amarelo-claro);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      margin-bottom: 20px;
      border: 2px solid rgba(240,165,0,0.25);
    }
    .cat-title {
      font-family: var(--fonte-titulo);
      font-size: 22px;
      font-weight: 700;
      color: var(--marrom);
      margin-bottom: 8px;
    }
    .cat-count {
      font-size: 12px;
      font-weight: 700;
      color: var(--amarelo);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 16px;
      display: block;
    }
    .cat-recipes {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .cat-recipes li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: var(--cinza-texto);
    }
    .cat-recipes li::before {
      content: '✓';
      color: var(--verde-ok);
      font-weight: 700;
      flex-shrink: 0;
    }

    /* Bloco de bônus */
    .bonus-block {
      background: var(--marrom);
      color: var(--branco);
      border-radius: 20px;
      padding: 36px 32px;
      text-align: left;
      display: flex;
      gap: 24px;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .bonus-icon {
      font-size: 48px;
      line-height: 1;
      flex-shrink: 0;
    }
    .bonus-content h3 {
      font-family: var(--fonte-titulo);
      font-size: clamp(18px, 2.5vw, 24px);
      color: var(--amarelo);
      margin-bottom: 12px;
    }
    .bonus-content p {
      font-size: 15px;
      opacity: 0.88;
      line-height: 1.7;
    }
    .bonus-list {
      list-style: none;
      margin-top: 14px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .bonus-list li {
      background: rgba(240,165,0,0.15);
      border: 1px solid rgba(240,165,0,0.35);
      color: var(--amarelo);
      font-size: 13px;
      font-weight: 600;
      padding: 5px 14px;
      border-radius: 100px;
    }

    /* ═══════════════════════════════════════════
       SEÇÃO DE PROVA SOCIAL — DEPOIMENTOS
    ═══════════════════════════════════════════ */
    .proof-section {
      padding: 80px 20px;
      background: #fff;
    }
    .proof-inner {
      max-width: 1000px;
      margin: 0 auto;
      text-align: center;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 48px;
    }
    .testimonial-card {
      background: #FDFAF5;
      border-radius: 16px;
      padding: 28px;
      text-align: left;
      border: 1px solid rgba(240,165,0,0.2);
      position: relative;
    }
    .testimonial-card::before {
      content: '"';
      font-family: var(--fonte-titulo);
      font-size: 72px;
      color: rgba(240,165,0,0.2);
      line-height: 0.8;
      position: absolute;
      top: 20px;
      left: 20px;
    }
    .testimonial-stars {
      color: var(--amarelo);
      font-size: 14px;
      margin-bottom: 12px;
    }
    .testimonial-result {
      display: inline-block;
      background: var(--verde-ok);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 14px;
    }
    .testimonial-card p.quote {
      font-size: 15px;
      line-height: 1.75;
      color: var(--cinza-texto);
      margin-bottom: 18px;
    }
    .testimonial-author {
      font-weight: 700;
      color: var(--marrom);
      font-size: 14px;
    }
    .testimonial-author span {
      display: block;
      font-weight: 400;
      color: #888;
      font-size: 12px;
      margin-top: 2px;
    }

    /* ═══════════════════════════════════════════
       SEÇÃO DE OBJEÇÕES (FAQ)
    ═══════════════════════════════════════════ */
    .objections-section {
      padding: 80px 20px;
      background: var(--amarelo-claro);
    }
    .objections-inner {
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
    }

    .faq-list {
      margin-top: 44px;
      text-align: left;
    }
    .faq-item {
      background: var(--branco);
      border-radius: 12px;
      margin-bottom: 12px;
      border: 1px solid rgba(240,165,0,0.2);
      overflow: hidden;
    }
    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      cursor: pointer;
      font-weight: 700;
      font-size: clamp(14px, 2vw, 16px);
      color: var(--marrom);
      gap: 16px;
      user-select: none;
    }
    .faq-question .faq-arrow {
      color: var(--amarelo);
      font-size: 18px;
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }
    .faq-item.open .faq-arrow { transform: rotate(180deg); }
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease, padding 0.3s ease;
      padding: 0 24px;
      font-size: 15px;
      color: var(--cinza-texto);
      line-height: 1.75;
    }
    .faq-item.open .faq-answer {
      max-height: 400px;
      padding: 0 24px 24px;
    }

    /* ═══════════════════════════════════════════
       SEÇÃO DO AUTOR
    ═══════════════════════════════════════════ */
    .author-section {
      padding: 80px 20px;
      background: #fff;
    }
    .author-inner {
      max-width: 780px;
      margin: 0 auto;
      display: flex;
      gap: 40px;
      align-items: center;
      flex-wrap: wrap;
    }
    .author-avatar {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--marrom), var(--amarelo));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 56px;
      flex-shrink: 0;
      box-shadow: 0 8px 32px rgba(59,31,10,0.25);
    }
    .author-text h3 {
      font-family: var(--fonte-titulo);
      font-size: clamp(22px, 3vw, 30px);
      color: var(--marrom);
      margin-bottom: 6px;
    }
    .author-handle {
      color: var(--amarelo);
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .author-text p {
      font-size: 16px;
      line-height: 1.75;
      color: var(--cinza-texto);
    }

    /* ═══════════════════════════════════════════
       SEÇÃO DE OFERTA FINAL + CTA
    ═══════════════════════════════════════════ */
    .offer-section {
      background: linear-gradient(160deg, var(--marrom) 0%, #4A2510 100%);
      color: var(--branco);
      padding: 88px 20px;
      text-align: center;
    }
    .offer-section .section-title {
      color: var(--branco);
      margin-bottom: 12px;
    }
    .offer-section .section-title .amarelo { color: var(--amarelo); }

    .offer-desc {
      font-size: clamp(15px, 2vw, 18px);
      opacity: 0.85;
      max-width: 560px;
      margin: 0 auto 48px;
      line-height: 1.75;
    }

    /* Card de preço */
    .price-card {
      background: rgba(255,255,255,0.07);
      border: 2px solid rgba(240,165,0,0.4);
      border-radius: 24px;
      padding: 48px 36px;
      max-width: 460px;
      margin: 0 auto 48px;
      backdrop-filter: blur(8px);
    }
    .price-de {
      font-size: 16px;
      opacity: 0.55;
      text-decoration: line-through;
      margin-bottom: 4px;
    }
    .price-por {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--amarelo);
      font-weight: 700;
      margin-bottom: 8px;
    }
    .price-main {
      font-family: var(--fonte-titulo);
      font-size: clamp(56px, 10vw, 88px);
      font-weight: 900;
      color: var(--amarelo);
      line-height: 1;
      margin-bottom: 8px;
    }
    .price-main .cifrao {
      font-size: 0.45em;
      vertical-align: top;
      margin-top: 14px;
      display: inline-block;
    }
    .price-main .centavos {
      font-size: 0.4em;
      vertical-align: top;
      margin-top: 18px;
      display: inline-block;
      opacity: 0.8;
    }
    .price-context {
      font-size: 14px;
      opacity: 0.65;
      margin-bottom: 32px;
    }

    /* Checklist de entrega */
    .delivery-list {
      list-style: none;
      text-align: left;
      margin-bottom: 36px;
      display: inline-block;
    }
    .delivery-list li {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      margin-bottom: 12px;
      opacity: 0.9;
    }
    .delivery-list li .check {
      width: 22px;
      height: 22px;
      background: var(--amarelo);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--marrom);
      font-size: 12px;
      font-weight: 900;
      flex-shrink: 0;
    }

    .cta-btn-big {
      display: block;
      background: var(--amarelo);
      color: var(--marrom);
      font-size: clamp(18px, 3vw, 22px);
      font-weight: 800;
      padding: 22px 40px;
      border-radius: 14px;
      text-decoration: none;
      box-shadow: var(--sombra-cta);
      transition: transform 0.2s, box-shadow 0.2s;
      width: 100%;
      max-width: 420px;
      margin: 0 auto 20px;
    }
    .cta-btn-big:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 48px rgba(240,165,0,0.65);
    }

    /* Selos de segurança */
    .trust-badges {
      display: flex;
      justify-content: center;
      gap: 24px;
      flex-wrap: wrap;
      margin-top: 28px;
      opacity: 0.65;
    }
    .trust-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }
    .trust-badge i { font-size: 16px; color: var(--amarelo); }

    /* ═══════════════════════════════════════════
       GARANTIA
    ═══════════════════════════════════════════ */
    .guarantee-section {
      padding: 72px 20px;
      background: var(--amarelo-claro);
      text-align: center;
    }
    .guarantee-inner {
      max-width: 640px;
      margin: 0 auto;
    }
    .guarantee-icon {
      font-size: 72px;
      margin-bottom: 20px;
      display: block;
    }
    .guarantee-inner h2 {
      font-family: var(--fonte-titulo);
      font-size: clamp(24px, 4vw, 36px);
      color: var(--marrom);
      margin-bottom: 16px;
    }
    .guarantee-inner p {
      font-size: clamp(15px, 2vw, 18px);
      color: var(--cinza-texto);
      line-height: 1.75;
    }

    /* ═══════════════════════════════════════════
       RODAPÉ
    ═══════════════════════════════════════════ */
    .footer {
      background: var(--marrom);
      color: rgba(255,255,255,0.6);
      padding: 40px 20px;
      text-align: center;
    }
    .footer-logo {
      margin-bottom: 16px;
      display: flex;
      justify-content: center;
    }
    .footer-logo img {
      height: 56px;
      width: auto;
      filter: brightness(0) invert(1);
      opacity: 0.9;
    }
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .footer-links a {
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--amarelo); }
    .footer-social {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .footer-social a {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      font-size: 15px;
      transition: background 0.2s, color 0.2s;
    }
    .footer-social a:hover {
      background: var(--amarelo);
      color: var(--marrom);
    }
    .footer p { font-size: 12px; }

    /* ═══════════════════════════════════════════
       BOTÃO FIXO MOBILE (APENAS EM TELAS PEQUENAS)
    ═══════════════════════════════════════════ */
    .sticky-cta {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--amarelo);
      color: var(--marrom);
      text-align: center;
      padding: 16px;
      font-weight: 800;
      font-size: 17px;
      text-decoration: none;
      z-index: 999;
      box-shadow: 0 -4px 24px rgba(240,165,0,0.5);
    }
    @media (max-width: 640px) {
      .sticky-cta { display: block; }
      body { padding-bottom: 64px; }
    }

    /* ═══════════════════════════════════════════
       RESPONSIVIDADE
    ═══════════════════════════════════════════ */
    @media (max-width: 640px) {
      .hero { padding: 48px 16px 56px; }
      .cta-btn { width: 100%; text-align: center; }
      .hero-stats { gap: 20px; }
      .author-inner { flex-direction: column; text-align: center; }
      .author-avatar { margin: 0 auto; }
      .bonus-block { flex-direction: column; }
      .price-card { padding: 36px 20px; }
    }
  </style>
</head>
<body>

  <!-- ───────────────────────────────────────────
       BARRA DE URGÊNCIA / ANÚNCIO
  ─────────────────────────────────────────── -->
  <div class="urgency-bar">
    🔥 Oferta por tempo limitado! Acesso imediato após a compra.
  </div>

  <!-- ───────────────────────────────────────────
       HERO — A GRANDE PROMESSA
  ─────────────────────────────────────────── -->
  <section class="hero">
    <div class="hero-badge">📖 E-Book Digital · Entrega Imediata</div>

    <h1>
      Chega de Ficar Perdido(a)<br>
      na Cozinha.
      <span class="destaque">Coma Bem Todo Dia,</span>
      Sem Complicar.
    </h1>

    <p class="hero-sub">
      25 receitas testadas e aprovadas: rápidas, baratas e
      deliciosas. Café da manhã, almoço, janta e lanches.
      Do micro-ondas ao fogão, qualquer pessoa consegue fazer.
    </p>

    <!-- Estatísticas rápidas (prova social de impacto) -->
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-num">25</span>
        <span class="hero-stat-label">Receitas</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-num">até 40</span>
        <span class="hero-stat-label">min cada</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-num">3</span>
        <span class="hero-stat-label">Categorias</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-num">100%</span>
        <span class="hero-stat-label">Fáceis</span>
      </div>
    </div>

    <a href="#comprar" class="cta-btn">
      🍽️ Quero Minhas 25 Receitas
    </a>
    <div class="cta-garantia">
      <span>✓ Acesso imediato</span>
      &nbsp;·&nbsp;
      <span>✓ Funciona no celular</span>
      &nbsp;·&nbsp;
      <span>✓ Ingredientes simples</span>
    </div>

    <!-- Imagem de capa -->
    <div class="hero-book-wrapper">
      <img
        class="hero-book-img"
        src="/static/capa-ebook.jpg"
        alt="Capa do E-Book Lufay Receitas — Fácil, Simples, Delicioso"
        loading="eager"
      />
      <div class="hero-book-badge">
        <strong>25</strong>
        receitas
      </div>
    </div>
  </section>

  <!-- ───────────────────────────────────────────
       FAIXA DE PROVA SOCIAL
  ─────────────────────────────────────────── -->
  <div class="social-strip">
    <span class="estrelas">★★★★★</span>
    <p>
      Mais de <strong>1.000 pessoas</strong> já cozinharam com as receitas da Lufay.
      Aprovadas na prática, na mesa de verdade.
    </p>
  </div>

  <!-- ───────────────────────────────────────────
       SEÇÃO DE DOR — ESPELHO
  ─────────────────────────────────────────── -->
  <section class="pain-section">
    <span class="section-label">Você se identifica?</span>
    <h2 class="section-title">
      Quantas vezes você chegou em casa
      sem saber <span class="amarelo">o que cozinhar?</span>
    </h2>

    <ul class="pain-list">
      <li>
        <i class="fas fa-times-circle icon-x"></i>
        Olhou para a geladeira e não teve ideia nenhuma
      </li>
      <li>
        <i class="fas fa-times-circle icon-x"></i>
        Tentou uma receita do YouTube e ficou uma bagunça
      </li>
      <li>
        <i class="fas fa-times-circle icon-x"></i>
        Pediu delivery de novo porque "é mais fácil"
      </li>
      <li>
        <i class="fas fa-times-circle icon-x"></i>
        Passou o café da manhã sem comer de verdade
      </li>
      <li>
        <i class="fas fa-times-circle icon-x"></i>
        Preparou algo e não ficou nem um pouco gostoso
      </li>
    </ul>

    <div class="pain-turn">
      <h3>A virada começa na próxima refeição.</h3>
      <p>
        Este e-book não é para chefs. É para pessoas reais,
        com geladeiras normais e tempo limitado. Cada receita foi
        pensada para funcionar de primeira, com o que você já tem
        em casa, em menos de 40 minutos, com resultado garantido.
      </p>
    </div>
  </section>

  <!-- ───────────────────────────────────────────
       O QUE VOCÊ RECEBE
  ─────────────────────────────────────────── -->
  <section class="what-section">
    <div class="what-inner">
      <span class="section-label">Conteúdo Completo</span>
      <h2 class="section-title">
        25 Receitas Organizadas
        <span class="amarelo">para Cada Momento do Dia</span>
      </h2>
      <p class="what-sub">
        Do café da manhã até o jantar, com lanches bônus
        que deixam qualquer criança e adulto satisfeito.
      </p>

      <!-- Categorias de receitas -->
      <div class="recipe-categories">

        <!-- Café da Manhã -->
        <div class="category-card">
          <div class="cat-icon">☀️</div>
          <div class="cat-title">Café da Manhã</div>
          <span class="cat-count">10 receitas · até 12 minutos</span>
          <ul class="cat-recipes">
            <li>Pão de Queijo de Frigideira</li>
            <li>Cuscuz no Micro-ondas</li>
            <li>Patê de Frango Cremoso</li>
            <li>Mascarpone Caseiro</li>
            <li>Sanduíche de Frango e Cottage</li>
            <li>Mingau de Aveia Rápido</li>
            <li>Panqueca de Banana e Ovo</li>
            <li>Torrada com Ricota e Mel</li>
            <li>Creme de Milho com Queijo Ralado</li>
            <li>Bolo de Micro-ondas de Chocolate com Banana</li>
          </ul>
        </div>

        <!-- Almoço e Janta -->
        <div class="category-card">
          <div class="cat-icon">🍽️</div>
          <div class="cat-title">Almoço e Janta</div>
          <span class="cat-count">10 receitas · até 40 minutos</span>
          <ul class="cat-recipes">
            <li>Panqueca Sem Leite (18 unidades)</li>
            <li>Bauru de Forno com Pão de Forma</li>
            <li>Taco de Big Mac Caseiro</li>
            <li>Purê de Batata Salsa</li>
            <li>Bife com Molho</li>
            <li>Macarrão com Atum e Molho de Tomate</li>
            <li>Strogonoff de Frango Simples</li>
            <li>Frango Xadrez Simplificado</li>
            <li>Risoto de Frango com Cenoura</li>
            <li>Sanduíche de Panela (Frango Desfiado)</li>
          </ul>
        </div>

        <!-- Bônus Lanches -->
        <div class="category-card">
          <div class="cat-icon">🎁</div>
          <div class="cat-title">Bônus: Lanches</div>
          <span class="cat-count">5 receitas exclusivas · bônus</span>
          <ul class="cat-recipes">
            <li>Pão de Cuscuz (Frigideira)</li>
            <li>Sanduíche com Molho Pesto</li>
            <li>Bolinho de Arroz com Queijo</li>
            <li>Torta Doce de Pão de Forma</li>
            <li>Picolé de Iogurte com Fruta</li>
          </ul>
        </div>

      </div><!-- /recipe-categories -->

      <!-- Destaque de bônus -->
      <div class="bonus-block">
        <div class="bonus-icon">🎁</div>
        <div class="bonus-content">
          <h3>5 Receitas Bônus Incluídas, Sem Custo Extra</h3>
          <p>
            Além das 20 receitas principais, você ganha uma seção exclusiva
            de Bônus Lanche com 5 receitas práticas para os intervalos
            do dia: desde um picolé saudável até um bolinho de arroz
            que todo mundo vai pedir de novo.
          </p>
          <ul class="bonus-list">
            <li>Lanches para o trabalho</li>
            <li>Opções para crianças</li>
            <li>Receitas sem forno</li>
            <li>Sobremesas fáceis</li>
          </ul>
        </div>
      </div>

    </div>
  </section>

  <!-- ───────────────────────────────────────────
       DEPOIMENTOS
  ─────────────────────────────────────────── -->
  <section class="proof-section">
    <div class="proof-inner">
      <span class="section-label">Resultados Reais</span>
      <h2 class="section-title">
        Quem Cozinhou,
        <span class="amarelo">Aprovou.</span>
      </h2>

      <div class="testimonials-grid">

        <!-- Depoimento 1 -->
        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <span class="testimonial-result">✓ Parou de pedir delivery</span>
          <p class="quote">
            "Sério, eu nunca cozinhei na vida. Nem ovo. Fiz o cuscuz
            no micro-ondas na primeira tentativa e ficou perfeito.
            Agora faço café da manhã todo dia em 10 minutos. Minha família
            não acredita que fui eu que fiz."
          </p>
          <div class="testimonial-author">
            Ana Paula M.
            <span>Professora, 34 anos • São Paulo</span>
          </div>
        </div>

        <!-- Depoimento 2 -->
        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <span class="testimonial-result">✓ Economizou R$400/mês em delivery</span>
          <p class="quote">
            "Gastava uma fortuna em aplicativo de comida. Depois do e-book,
            comecei a cozinhar o almoço todo dia. O strogonoff de frango
            ficou tão bom que meus colegas de trabalho me pediram a receita.
            Valeu cada centavo."
          </p>
          <div class="testimonial-author">
            Carlos R.
            <span>Analista de TI, 28 anos • Belo Horizonte</span>
          </div>
        </div>

        <!-- Depoimento 3 -->
        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <span class="testimonial-result">✓ Filhos aprovaram tudo</span>
          <p class="quote">
            "Meu maior medo era que as receitas fossem complicadas demais.
            Mas até minha filha de 12 anos conseguiu fazer o picolé de
            iogurte sozinha. O bauru de forno virou o lanche favorito
            do fim de semana aqui em casa."
          </p>
          <div class="testimonial-author">
            Fernanda L.
            <span>Enfermeira, 41 anos • Curitiba</span>
          </div>
        </div>

      </div><!-- /testimonials-grid -->
    </div>
  </section>

  <!-- ───────────────────────────────────────────
       OBJEÇÕES / FAQ
  ─────────────────────────────────────────── -->
  <section class="objections-section">
    <div class="objections-inner">
      <span class="section-label">Dúvidas Frequentes</span>
      <h2 class="section-title">
        Antes de Você Pensar em Não Comprar,
        <span class="amarelo">Leia Isso.</span>
      </h2>

      <div class="faq-list">

        <div class="faq-item">
          <div class="faq-question" onclick="toggleFaq(this)">
            <span>Não sei cozinhar absolutamente nada. Esse e-book é para mim?</span>
            <i class="fas fa-chevron-down faq-arrow"></i>
          </div>
          <div class="faq-answer">
            Sim, exatamente para você. As receitas foram criadas para
            quem nunca cozinhou antes. Cada passo é explicado de forma
            direta, sem termos técnicos e sem ingredientes exóticos.
            Se você consegue ligar um micro-ondas ou uma frigideira,
            você consegue fazer todas as receitas deste e-book.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question" onclick="toggleFaq(this)">
            <span>Os ingredientes são caros ou difíceis de encontrar?</span>
            <i class="fas fa-chevron-down faq-arrow"></i>
          </div>
          <div class="faq-answer">
            Absolutamente não. Todas as receitas usam ingredientes que
            você já tem em casa ou que encontra em qualquer mercadinho.
            Nada de trufa, nada de ingrediente importado. Farinha, ovo,
            frango, leite. Os básicos que estão na sua geladeira agora.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question" onclick="toggleFaq(this)">
            <span>Não tenho tempo. Essas receitas são realmente rápidas?</span>
            <i class="fas fa-chevron-down faq-arrow"></i>
          </div>
          <div class="faq-answer">
            A receita mais demorada do e-book leva 40 minutos.
            A maioria fica pronta entre 5 e 15 minutos. O pão de queijo
            de frigideira leva 10 minutos. O cuscuz no micro-ondas leva
            literalmente 2 minutos de forno. Se você tem tempo para pedir
            no app, você tem tempo para cozinhar com este e-book.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question" onclick="toggleFaq(this)">
            <span>Como recebo o e-book depois da compra?</span>
            <i class="fas fa-chevron-down faq-arrow"></i>
          </div>
          <div class="faq-answer">
            Acesso imediato após a confirmação do pagamento. Você recebe
            um link por e-mail e pode baixar o PDF no seu celular,
            computador ou tablet. O arquivo funciona offline e não precisa
            de internet para acessar depois de baixado.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question" onclick="toggleFaq(this)">
            <span>E se eu não gostar? Existe garantia?</span>
            <i class="fas fa-chevron-down faq-arrow"></i>
          </div>
          <div class="faq-answer">
            Sim. Você tem 7 dias para testar. Se por qualquer motivo
            você não ficar satisfeito(a), basta enviar uma mensagem
            e devolvemos 100% do seu dinheiro. Sem perguntas,
            sem burocracia. O risco é zero do seu lado.
          </div>
        </div>

      </div><!-- /faq-list -->
    </div>
  </section>

  <!-- ───────────────────────────────────────────
       AUTOR / AUTORIDADE
  ─────────────────────────────────────────── -->
  <section class="author-section">
    <div class="author-inner">
      <div class="author-avatar">
          <img src="/static/logo-lufay.png" alt="Logo Lufay Receitas" style="width:100%;height:100%;object-fit:contain;border-radius:50%;padding:10px;background:#fff;" />
        </div>
      <div class="author-text">
        <h3>Lufay Receitas</h3>
        <div class="author-handle">
          <i class="fab fa-instagram"></i> @lufay.receitas &nbsp;·&nbsp;
          <i class="fab fa-facebook"></i> Lufay Receitas
        </div>
        <p>
          Com mais de <strong>1.000 seguidores</strong> e o WhatsApp
          sempre cheio de dúvidas sobre como cozinhar de forma simples,
          a Lufay criou este e-book para dar acesso às receitas mais pedidas
          da comunidade em um só lugar. Receitas organizadas, testadas
          e prontas para funcionar na primeira tentativa.
          Contato direto: <strong>(41) 997046913</strong>.
        </p>
      </div>
    </div>
  </section>

  <!-- ───────────────────────────────────────────
       OFERTA FINAL + CTA PRINCIPAL
  ─────────────────────────────────────────── -->
  <section class="offer-section" id="comprar">
    <span class="section-label" style="background:rgba(240,165,0,0.2);color:var(--amarelo);border-color:rgba(240,165,0,0.4);">
      Garanta Seu Acesso
    </span>
    <h2 class="section-title">
      25 Receitas. Uma Decisão.
      <span class="amarelo">Uma Transformação.</span>
    </h2>
    <p class="offer-desc">
      Você está a um clique de nunca mais ficar sem ideia na cozinha.
      Acesso imediato, para sempre, no seu celular.
    </p>

    <div class="price-card">
      <div class="price-de">De R$ 47,00</div>
      <div class="price-por">Hoje por apenas</div>
      <div class="price-main">
        <span class="cifrao">R$</span>15<span class="centavos">,90</span>
      </div>
      <div class="price-context" style="margin-bottom:6px;">via Pix · Acesso vitalício</div>
      <div style="font-size:14px;color:var(--amarelo);margin-bottom:20px;">ou 3× de <strong>R$6,04</strong> no cartão de crédito</div>

      <!-- O que está incluso -->
      <ul class="delivery-list">
        <li>
          <span class="check">✓</span>
          25 receitas completas em PDF
        </li>
        <li>
          <span class="check">✓</span>
          5 receitas bônus de lanches
        </li>
        <li>
          <span class="check">✓</span>
          Acesso imediato no celular e PC
        </li>
        <li>
          <span class="check">✓</span>
          Funciona offline após o download
        </li>
        <li>
          <span class="check">✓</span>
          Garantia de 7 dias ou devolução total
        </li>
      </ul>

      <a href="https://pay.cakto.com.br/3fser7s_455149" target="_blank" rel="noopener" class="cta-btn-big" id="btn-comprar">
        🍽️ Quero as 25 Receitas por R$15,90 no Pix
      </a>
      <div class="cta-garantia" style="justify-content:center; margin-top:12px;">
        <span>🔒 Compra 100% Segura</span>
        &nbsp;·&nbsp;
        <span>✓ 7 Dias de Garantia</span>
      </div>
    </div>

    <!-- Selos de confiança -->
    <div class="trust-badges">
      <div class="trust-badge">
        <i class="fas fa-lock"></i>
        <span>Pagamento Seguro</span>
      </div>
      <div class="trust-badge">
        <i class="fas fa-bolt"></i>
        <span>Acesso Imediato</span>
      </div>
      <div class="trust-badge">
        <i class="fas fa-shield-alt"></i>
        <span>Garantia de 7 Dias</span>
      </div>
      <div class="trust-badge">
        <i class="fas fa-mobile-alt"></i>
        <span>Funciona no Celular</span>
      </div>
    </div>
  </section>

  <!-- ───────────────────────────────────────────
       GARANTIA
  ─────────────────────────────────────────── -->
  <section class="guarantee-section">
    <div class="guarantee-inner">
      <span class="guarantee-icon">🛡️</span>
      <h2>Garantia Incondicional de 7 Dias</h2>
      <p>
        Baixe o e-book, teste as receitas, mostre para a família.
        Se por qualquer motivo você não ficar 100% satisfeito(a),
        entre em contato em até 7 dias e devolvemos cada centavo
        do seu investimento. Sem questionamentos. Sem burocracia.
        O risco é completamente nosso.
      </p>
    </div>
  </section>

  <!-- ───────────────────────────────────────────
       RODAPÉ
  ─────────────────────────────────────────── -->
  <footer class="footer">
    <div class="footer-logo">
      <img src="/static/logo-lufay.png" alt="Lufay Receitas" />
    </div>
    <div class="footer-social">
      <a href="https://www.instagram.com/lufay.receitas" target="_blank" rel="noopener" title="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="#" target="_blank" rel="noopener" title="Facebook">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://wa.me/5541997046913" target="_blank" rel="noopener" title="WhatsApp">
        <i class="fab fa-whatsapp"></i>
      </a>
    </div>
    <div class="footer-links">
      <a href="#comprar">Comprar</a>
      <a href="#" onclick="alert('Política de Privacidade — adicione sua página')">Privacidade</a>
      <a href="#" onclick="alert('Termos de Uso — adicione sua página')">Termos de Uso</a>
      <a href="https://wa.me/5541997046913" target="_blank">Contato</a>
    </div>
    <p>© 2025 Lufay Receitas · Todos os direitos reservados</p>
  </footer>

  <!-- ───────────────────────────────────────────
       CTA FIXO PARA MOBILE (STICKY BAR)
  ─────────────────────────────────────────── -->
  <a href="#comprar" class="sticky-cta">
    🍽️ Quero Minhas 25 Receitas por R$15,90
  </a>

  <!-- ───────────────────────────────────────────
       JAVASCRIPT: FAQ ACCORDION
  ─────────────────────────────────────────── -->
  <script>
    // Abre/fecha perguntas do FAQ
    function toggleFaq(questionEl) {
      const item = questionEl.parentElement;
      const isOpen = item.classList.contains('open');

      // Fecha todos os abertos
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
      });

      // Abre o clicado (a não ser que já estava aberto)
      if (!isOpen) {
        item.classList.add('open');
      }
    }

    // Rastreia cliques no CTA principal (Meta Pixel / GA)
    document.getElementById('btn-comprar')?.addEventListener('click', function() {
      // Descomente as linhas abaixo depois de configurar os pixels:
      // fbq('track', 'InitiateCheckout');
      // gtag('event', 'begin_checkout');
    });

    // Scroll suave para links internos (fallback para navegadores antigos)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  </script>

</body>
</html>`)
})

export default app
