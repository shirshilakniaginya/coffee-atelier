"use client";

import { useState, useEffect, useCallback } from "react";
import { contacts } from "@/lib/coffee-content";
import { getProducts, type Product } from "@/api/products";
import { getPageSections, type PageSection } from "@/api/page-sections";
import { createOrder } from "@/api/orders";

import AnnouncementBar from "@/components/sections/AnnouncementBar";
import HeaderNav from "@/components/sections/HeaderNav";
import HeroSection from "@/components/sections/HeroSection";
import ProductMenuSection from "@/components/sections/ProductMenuSection";
import StorySections from "@/components/sections/StorySections";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import CartPanel from "@/components/ui/CartPanel";

interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sections, setSections] = useState<PageSection[]>([]);

  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [orderSubmitState, setOrderSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const CACHE_KEY = "coffee_page_sections_cache";

    getProducts()
      .then((data) => {
        setProducts(data);
        if (data.length > 0) {
          setSelectedProductId(data[0].id);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    getPageSections("home")
      .then((data) => {
        setSections(data);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch {}
      })
      .catch(() => {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed)) setSections(parsed);
          }
        } catch {}
      });
  }, []);

  const selectedProduct = products.find((p) => p.id === selectedProductId) ?? products[0];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = useCallback(
    (product: Product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          },
        ];
      });
    },
    []
  );

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckoutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCheckoutForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitState("submitting");
    try {
      const order = await createOrder({
        customer_name: checkoutForm.customer_name,
        phone: checkoutForm.phone,
        email: checkoutForm.email,
        comment: checkoutForm.comment,
        cart: cart.map((item) => ({
          product_id: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          sum: item.price * item.quantity,
        })),
      });
      console.log("Order created", order);
      setCart([]);
      setCheckoutForm({ customer_name: "", phone: "", email: "", comment: "" });
      setOrderSubmitState("success");
    } catch (err) {
      console.error("Order submit failed", err);
      setOrderSubmitState("error");
    }
  };

  const closeCart = () => {
    setCartOpen(false);
    setOrderSubmitState("idle");
  };

  const handleSelectProduct = useCallback((id: string) => {
    setSelectedProductId(id);
  }, []);

  return (
    <main className="coffee-brand-page">
      <AnnouncementBar />

      <HeaderNav
        cartCount={cartCount}
        mobileMenuOpen={mobileMenuOpen}
        onCartOpen={() => setCartOpen(true)}
        onMobileMenuToggle={() => setMobileMenuOpen((v) => !v)}
        onMobileNavClick={() => setMobileMenuOpen(false)}
      />

      <HeroSection products={products} loading={loading} error={error} />

      <ProductMenuSection
        products={products}
        loading={loading}
        error={error}
        selectedProductId={selectedProductId}
        selectedProduct={selectedProduct}
        onSelectProduct={handleSelectProduct}
        onAddToCart={addToCart}
      />

      <section className="philosophy-break" id="philosophy">
        <span className="section-kicker section-kicker--light">Почему мы существуем</span>
        <h2>Ритуал важнее шума.</h2>
        <p>
          Кофе должен ощущаться как спокойный выбор, а не как витрина с бесконечными отвлекающими блоками. Поэтому экран собран вокруг
          продукта, вкуса и тактильной подачи.
        </p>
      </section>

      <StorySections sections={sections} />

      <ContactSection />

      <Footer />

      <CartPanel
        cart={cart}
        cartTotal={cartTotal}
        cartOpen={cartOpen}
        orderSubmitState={orderSubmitState}
        checkoutForm={checkoutForm}
        onClose={closeCart}
        onQuantityChange={updateQuantity}
        onCheckoutChange={handleCheckoutChange}
        onSubmitOrder={handleSubmitOrder}
      />
    </main>
  );
}
