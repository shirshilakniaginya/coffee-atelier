import { formatPrice } from "@/lib/helpers";

interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartPanelProps {
  cart: CartItem[];
  cartTotal: number;
  cartOpen: boolean;
  orderSubmitState: "idle" | "submitting" | "success" | "error";
  checkoutForm: { customer_name: string; phone: string; email: string; comment: string };
  onClose: () => void;
  onQuantityChange: (productId: string, delta: number) => void;
  onCheckoutChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmitOrder: (e: React.FormEvent) => void;
}

export default function CartPanel({
  cart,
  cartTotal,
  cartOpen,
  orderSubmitState,
  checkoutForm,
  onClose,
  onQuantityChange,
  onCheckoutChange,
  onSubmitOrder,
}: CartPanelProps) {
  if (!cartOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-panel__header">
          <h3>Корзина</h3>
          <button type="button" className="cart-panel__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {orderSubmitState === "success" ? (
          <div className="cart-panel__success">
            <p className="cart-panel__success-title">Заказ оформлен</p>
            <p className="cart-panel__success-text">Мы свяжемся с вами в ближайшее время.</p>
            <button type="button" className="button button--dark" onClick={onClose}>
              Вернуться в магазин
            </button>
          </div>
        ) : cart.length === 0 ? (
          <p className="cart-panel__empty">Корзина пуста</p>
        ) : (
          <>
            <div className="cart-panel__items">
              {cart.map((item) => (
                <div key={item.productId} className="cart-item">
                  <div className="cart-item__info">
                    <strong>{item.title}</strong>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                  <div className="cart-item__controls">
                    <button type="button" onClick={() => onQuantityChange(item.productId, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onQuantityChange(item.productId, 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-panel__total">
              <span>Итого</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            <form className="checkout-form" onSubmit={onSubmitOrder}>
              {orderSubmitState === "error" && (
                <p className="checkout-form__error">Не удалось оформить заказ. Попробуйте ещё раз.</p>
              )}
              <input
                name="customer_name"
                placeholder="Имя"
                required
                value={checkoutForm.customer_name}
                onChange={onCheckoutChange}
              />
              <input
                name="phone"
                placeholder="Телефон"
                required
                value={checkoutForm.phone}
                onChange={onCheckoutChange}
              />
              <input
                name="email"
                placeholder="Email (необязательно)"
                type="email"
                value={checkoutForm.email}
                onChange={onCheckoutChange}
              />
              <textarea
                name="comment"
                placeholder="Комментарий (необязательно)"
                value={checkoutForm.comment}
                onChange={onCheckoutChange}
              />
              <button
                type="submit"
                className="button button--dark button--wide"
                disabled={orderSubmitState === "submitting"}
              >
                {orderSubmitState === "submitting" ? "Отправляем…" : "Оформить заказ"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
