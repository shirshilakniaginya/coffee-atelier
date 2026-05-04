"use client";

import { useRef, useCallback } from "react";
import type { Product } from "@/api/products";
import { getFileUrl } from "@/lib/pocketbase";
import { formatPrice } from "@/lib/helpers";

interface ProductMenuSectionProps {
  products: Product[];
  loading: boolean;
  error: boolean;
  selectedProductId: string;
  selectedProduct: Product | undefined;
  cart: { productId: string; title: string; price: number; quantity: number }[];
  cartTotal: number;
  cartOpen: boolean;
  orderSubmitState: "idle" | "submitting" | "success" | "error";
  checkoutForm: { customer_name: string; phone: string; email: string; comment: string };
  onSelectProduct: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onQuantityChange: (productId: string, delta: number) => void;
  onCheckoutChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmitOrder: (e: React.FormEvent) => void;
  onCloseCart: () => void;
}

export default function ProductMenuSection({
  products,
  loading,
  error,
  selectedProductId,
  selectedProduct,
  onSelectProduct,
  onAddToCart,
}: ProductMenuSectionProps) {
  const selectorGridRef = useRef<HTMLDivElement | null>(null);
  const selectorScrollFrame = useRef<number | null>(null);

  const syncSelectedProductFromScroll = useCallback(() => {
    if (typeof window === "undefined" || window.innerWidth > 880) return;
    if (selectorScrollFrame.current !== null) {
      cancelAnimationFrame(selectorScrollFrame.current);
    }
    selectorScrollFrame.current = window.requestAnimationFrame(() => {
      const grid = selectorGridRef.current;
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll<HTMLButtonElement>(".selector-card"));
      if (cards.length === 0) return;
      const viewportCenter = grid.scrollLeft + grid.clientWidth / 2;
      let nextId = selectedProductId;
      let nearest = Number.POSITIVE_INFINITY;
      cards.forEach((card) => {
        const id = card.dataset.productId;
        if (!id) return;
        const center = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < nearest) {
          nearest = dist;
          nextId = id;
        }
      });
      if (nextId !== selectedProductId) onSelectProduct(nextId);
    });
  }, [selectedProductId, onSelectProduct]);

  if (loading) {
    return (
      <section className="selector-section" id="collection">
        <div className="selector-section__header">
          <div>
            <span className="section-kicker">Подборка кофе</span>
            <h2>Выбери профиль и сразу увидь, что внутри.</h2>
          </div>
          <p>Сетка позиций слева и тихая карточка справа. При выборе пакета обновляются описание, ноты вкуса и сценарий заваривания.</p>
        </div>
        <div className="loading-state">Загружаем меню…</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="selector-section" id="collection">
        <div className="selector-section__header">
          <div>
            <span className="section-kicker">Подборка кофе</span>
            <h2>Выбери профиль и сразу увидь, что внутри.</h2>
          </div>
          <p>Сетка позиций слева и тихая карточка справа. При выборе пакета обновляются описание, ноты вкуса и сценарий заваривания.</p>
        </div>
        <div className="error-state">Не удалось загрузить меню. Проверьте подключение к базе.</div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="selector-section" id="collection">
        <div className="selector-section__header">
          <div>
            <span className="section-kicker">Подборка кофе</span>
            <h2>Выбери профиль и сразу увидь, что внутри.</h2>
          </div>
          <p>Сетка позиций слева и тихая карточка справа. При выборе пакета обновляются описание, ноты вкуса и сценарий заваривания.</p>
        </div>
        <div className="empty-state">Пока нет товаров</div>
      </section>
    );
  }

  return (
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
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              data-product-id={product.id}
              className={
                product.id === selectedProduct?.id
                  ? "selector-card selector-card--active"
                  : "selector-card"
              }
              aria-pressed={product.id === selectedProduct?.id}
              onClick={(event) => {
                onSelectProduct(product.id);
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
                <img
                  src={(() => {
                    const fileName = Array.isArray(product.image) ? product.image[0] : product.image;
                    if (!fileName || !product.collectionId) return "";
                    return getFileUrl(product, fileName);
                  })()}
                  alt={`Упаковка ${product.title}`}
                  className="selector-card__image"
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                />
              </div>
              <div className="selector-card__body">
                <span>{product.badge}</span>
                <strong>{product.title}</strong>
                <p>{(product.notes || []).join(" · ")}</p>
                <small>{formatPrice(product.price)}</small>
              </div>
            </button>
          ))}
        </div>

        {selectedProduct && (
          <article className="selector-detail">
            <div className="selector-detail__copy">
              <span className="section-kicker">Сейчас выбран</span>
              <h3>{selectedProduct.title}</h3>
              <p className="selector-detail__price">{formatPrice(selectedProduct.price)}</p>
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

              {(selectedProduct.notes || []).length > 0 && (
                <div className="selection-group">
                  <p>Ноты вкуса</p>
                  <div className="chip-row">
                    {selectedProduct.notes.map((item: string) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(selectedProduct.brew_for || []).length > 0 && (
                <div className="selection-group">
                  <p>Подойдёт для</p>
                  <div className="chip-row">
                    {selectedProduct.brew_for.map((item: string) => (
                      <span key={item} className="chip chip--soft">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(selectedProduct.formats || []).length > 0 && (
                <div className="selection-group">
                  <p>Фасовка</p>
                  <div className="chip-row">
                    {selectedProduct.formats.map((item: string) => (
                      <span key={item} className="chip chip--soft">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                className="button button--wide button--dark"
                onClick={() => onAddToCart(selectedProduct)}
              >
                Добавить в корзину
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
