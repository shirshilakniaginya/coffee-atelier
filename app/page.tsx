"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { announcement, coffeeProducts, contacts, storyHighlights } from "@/lib/coffee-content";

export default function Home() {
  const desktopNavigation = [
    { label: "Магазин", href: "#collection" },
    { label: "О компании", href: "#philosophy" },
  ] as const;

  const mobileNavigation = [
    { label: "Магазин", href: "#collection" },
    { label: "О компании", href: "#philosophy" },
    { label: "Доставка", href: "#contacts" },
    { label: "Контакты", href: "#contacts" },
    { label: "Статьи", href: "#stories" },
    { label: "Фотогалерея", href: "#stories" },
    { label: "Видеогалерея", href: "#stories" },
  ] as const;

  const footerNavigation = [
    { label: "Магазин", href: "#collection" },
    { label: "О компании", href: "#philosophy" },
    { label: "Истории", href: "#stories" },
    { label: "Контакты", href: "#contacts" },
  ] as const;

  const [selectedProductId, setSelectedProductId] = useState<(typeof coffeeProducts)[number]["id"]>(coffeeProducts[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const selectorGridRef = useRef<HTMLDivElement | null>(null);
  const selectorScrollFrame = useRef<number | null>(null);

  const heroProduct = coffeeProducts[0];
  const selectedProduct = coffeeProducts.find((product) => product.id === selectedProductId) ?? heroProduct;

  const syncSelectedProductFromScroll = () => {
    if (typeof window === "undefined" || window.innerWidth > 880) {
      return;
    }

    if (selectorScrollFrame.current !== null) {
      cancelAnimationFrame(selectorScrollFrame.current);
    }

    selectorScrollFrame.current = window.requestAnimationFrame(() => {
      const grid = selectorGridRef.current;

      if (!grid) {
        return;
      }

      const cards = Array.from(grid.querySelectorAll<HTMLButtonElement>(".selector-card"));

      if (cards.length === 0) {
        return;
      }

      const viewportCenter = grid.scrollLeft + grid.clientWidth / 2;
      let nextProductId = selectedProductId;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const cardId = card.dataset.productId as (typeof coffeeProducts)[number]["id"] | undefined;

        if (!cardId) {
          return;
        }

        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextProductId = cardId;
        }
      });

      if (nextProductId !== selectedProductId) {
        setSelectedProductId(nextProductId);
      }
    });
  };

  return (
    <main className="coffee-brand-page">
      <div className="announcement-bar">{announcement}</div>

      <nav className="site-nav">
        <div className="site-nav__side site-nav__side--left">
          {desktopNavigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="site-logo" href="#home" aria-label="Coffee People">
          <Image src="/coffee-people-logo.svg" alt="Coffee People" width={44} height={44} className="site-logo__image" priority />
          <span className="site-logo__text">Coffee People</span>
        </a>

        <div className="site-nav__side site-nav__side--right">
          <a href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}>{contacts.phone}</a>
          <a className="nav-bag" href="#contacts">
            Связаться
          </a>
        </div>
        <button
          type="button"
          className={mobileMenuOpen ? "site-nav__toggle site-nav__toggle--open" : "site-nav__toggle"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Открыть меню"
          onClick={() => setMobileMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={mobileMenuOpen ? "mobile-nav mobile-nav--open" : "mobile-nav"} id="mobile-navigation">
        {mobileNavigation.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </div>

      <section className="hero-shell" id="home">
        <div className="hero-shell__visual">
          <div className="visual-portrait">
            <Image
              src={heroProduct.image}
              alt={`Упаковка ${heroProduct.name}`}
              className="visual-portrait__image"
              fill
              sizes="(max-width: 1280px) 100vw, 42vw"
              priority
            />
          </div>
        </div>

        <div className="hero-shell__content">
          <span className="section-kicker">Свежая обжарка каждый день</span>

          <h1>
            Производитель
            <br />
            кофе средней
            <br />
            обжарки
          </h1>

          <div className="hero-divider" />

          <p className="hero-lead">
            Спокойный экран без лишнего декора: крупный товар, понятная подача вкуса и аккуратный вход в каталог без шума и
            перегруженных блоков.
          </p>

          <div className="hero-actions">
            <a className="button button--dark" href="#collection">
              Смотреть кофе
            </a>
            <a className="button button--ghost" href="#philosophy">
              О бренде
            </a>
          </div>

          <div className="hero-mini-grid">
            {coffeeProducts.slice(3, 5).map((product) => (
              <article key={product.id} className="mini-product-card">
                <Image src={product.image} alt={`Упаковка ${product.name}`} className="mini-product-card__image" width={58} height={72} />
                <div>
                  <p>{product.name}</p>
                  <a href="#collection">Открыть подборку</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="selector-section" id="collection">
        <div className="selector-section__header">
          <div>
            <span className="section-kicker">Подборка кофе</span>
            <h2>Выбери профиль и сразу увидь, что внутри.</h2>
          </div>
          <p>Сетка позиций слева и тихая карточка справа. При выборе пакета обновляются описание, ноты вкуса и сценарий заваривания.</p>
        </div>

        <div className="selector-layout">
          <div
            ref={selectorGridRef}
            className="selector-grid"
            role="list"
            aria-label="Список сортов кофе"
            onScroll={syncSelectedProductFromScroll}
          >
            {coffeeProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                data-product-id={product.id}
                className={product.id === selectedProduct.id ? "selector-card selector-card--active" : "selector-card"}
                aria-pressed={product.id === selectedProduct.id}
                onClick={(event) => {
                  setSelectedProductId(product.id);

                  if (typeof window !== "undefined" && window.innerWidth <= 880) {
                    event.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "center",
                    });
                  }
                }}
              >
                <div className="selector-card__image-wrap">
                  <Image
                    src={product.image}
                    alt={`Упаковка ${product.name}`}
                    className="selector-card__image"
                    fill
                    sizes="(max-width: 880px) 72vw, 18vw"
                  />
                </div>
                <div className="selector-card__body">
                  <span>{product.badge}</span>
                  <strong>{product.name}</strong>
                  <p>{product.notes.join(" · ")}</p>
                  <small>{product.price}</small>
                </div>
              </button>
            ))}
          </div>

          <article className="selector-detail">
            <div className="selector-detail__copy">
              <span className="section-kicker">Сейчас выбран</span>
              <h3>{selectedProduct.name}</h3>
              <p className="selector-detail__price">{selectedProduct.price}</p>
              <p className="selector-detail__lead">{selectedProduct.description}</p>

              <div className="selector-detail__meta">
                <div>
                  <span>Регион</span>
                  <strong>{selectedProduct.origin}</strong>
                </div>
                <div>
                  <span>Обжарка</span>
                  <strong>{selectedProduct.roast}</strong>
                </div>
              </div>

              <div className="selection-group">
                <p>Ноты вкуса</p>
                <div className="chip-row">
                  {selectedProduct.notes.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="selection-group">
                <p>Подойдёт для</p>
                <div className="chip-row">
                  {selectedProduct.brewFor.map((item) => (
                    <span key={item} className="chip chip--soft">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="selection-group">
                <p>Фасовка</p>
                <div className="chip-row">
                  {selectedProduct.formats.map((item) => (
                    <span key={item} className="chip chip--soft">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <a className="button button--wide button--dark" href="#contacts">
                Добавить в корзину
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="philosophy-break" id="philosophy">
        <span className="section-kicker section-kicker--light">Почему мы существуем</span>
        <h2>Ритуал важнее шума.</h2>
        <p>
          Кофе должен ощущаться как спокойный выбор, а не как витрина с бесконечными отвлекающими блоками. Поэтому экран собран вокруг
          продукта, вкуса и тактильной подачи.
        </p>
      </section>

      <section className="story-grid" id="stories">
        {storyHighlights.map((story, index) => {
          const product = coffeeProducts.find((item) => item.id === story.productId) ?? heroProduct;

          return (
            <div key={story.title} className={index % 2 === 1 ? "story-row story-row--reverse" : "story-row"}>
              <div className="story-row__copy">
                <span className="section-kicker">{story.eyebrow}</span>
                <h3>{story.title}</h3>
                <p>{story.text}</p>
              </div>

              <div className="story-row__visual">
                <div className="story-row__frame">
                  <Image
                    src={product.image}
                    alt={`Упаковка ${product.name}`}
                    className="story-row__image"
                    fill
                    sizes="(max-width: 1280px) 100vw, 44vw"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="contact-panel" id="contacts">
        <div className="contact-panel__layout">
          <div className="contact-panel__media">
            <div className="contact-panel__frame">
              <Image
                src="/cofecontacts.png"
                alt="Coffee People interior"
                className="contact-panel__image"
                fill
                sizes="(max-width: 1120px) 100vw, 48vw"
              />
            </div>
          </div>

          <div className="contact-panel__content">
            <div className="contact-panel__intro">
              <span className="section-kicker">Контакты</span>
              <h2>{contacts.title}</h2>
              <p>{contacts.subtitle}</p>
            </div>

            <div className="contact-panel__grid">
              <a className="contact-card" href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}>
                <span>Телефон</span>
                <strong>{contacts.phone}</strong>
              </a>

              <a className="contact-card" href={`mailto:${contacts.email}`}>
                <span>Email</span>
                <strong>{contacts.email}</strong>
              </a>

              <div className="contact-card">
                <span>Адрес</span>
                <strong>{contacts.address}</strong>
              </div>

              <div className="contact-card">
                <span>Режим работы</span>
                <strong>{contacts.hours}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__layout">
          <div className="site-footer__brand">
            <a className="site-logo site-logo--footer" href="#home" aria-label="Coffee People">
              <Image src="/coffee-people-logo.svg" alt="Coffee People" width={38} height={38} className="site-logo__image site-logo__image--footer" />
              <span className="site-logo__text">Coffee People</span>
            </a>
            <p>Спокойная подача кофе без визуального шума: выбрать, заказать и вернуться за любимым вкусом.</p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer">
            <span className="site-footer__label">Разделы</span>
            <div className="site-footer__links">
              {footerNavigation.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="site-footer__contact">
            <span className="site-footer__label">На связи</span>
            <a href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}>{contacts.phone}</a>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            <p>{contacts.address}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© 2026 Coffee People</span>
          <span>{contacts.hours}</span>
        </div>
      </footer>
    </main>
  );
}
