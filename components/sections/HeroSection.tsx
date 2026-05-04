"use client";

import type { Product } from "@/api/products";
import { getFileUrl } from "@/lib/pocketbase";

interface HeroSectionProps {
  products: Product[];
  loading: boolean;
  error: boolean;
}

export default function HeroSection({ products, loading, error }: HeroSectionProps) {
  return (
    <section className="hero-shell" id="home">
      <div className="hero-shell__visual">
        <div className="visual-portrait">
          <div className="visual-portrait__image" style={{ width: "100%", height: "100%", background: "var(--color-bg-elevated, #f0ede8)" }} />
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

        {!error && !loading && products.length > 0 && (
          <div className="hero-mini-grid">
            {products.slice(0, 2).map((product) => (
              <article key={product.id} className="mini-product-card">
                <img
                  src={(() => {
                    const fileName = Array.isArray(product.image) ? product.image[0] : product.image;
                    if (!fileName || !product.collectionId) return "";
                    return getFileUrl(product, fileName);
                  })()}
                  alt={`Упаковка ${product.title}`}
                  className="mini-product-card__image"
                  style={{ width: 58, height: 72, objectFit: "contain" }}
                />
                <div>
                  <p>{product.title}</p>
                  <a href="#collection">Открыть подборку</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
