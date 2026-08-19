import { ArrowUpRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/commerce/types";

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: currencyCode }).format(Number(amount));
}

function ProductCard({ product }: { product: Product }) {
  const { addItem, loading } = useCart();
  const variant = product.variants[0];
  const image = product.images[0];

  return (
    <article className="shop-product-card">
      <div className="shop-product-image-wrap">
        {image ? <img src={image.url} alt={image.altText ?? product.title} className="shop-product-image" /> : <div className="shop-product-placeholder">CEN 2027</div>}
        <span className="shop-product-tag">Protótipo</span>
      </div>
      <div className="shop-product-info">
        <div>
          <span className="shop-product-type">{product.productType}</span>
          <h3>{product.title}</h3>
        </div>
        <p className="shop-product-description">{product.description.replace(/<[^>]+>/g, "")}</p>
        <div className="shop-product-footer">
          <strong>{formatMoney(product.priceRange.min.amount, product.priceRange.min.currencyCode)}</strong>
          <button className="shop-add-button" type="button" disabled={!variant?.availableForSale || loading} onClick={() => variant && addItem(variant.id)}>
            <span>{variant?.availableForSale ? "Adicionar" : "Indisponível"}</span>
            <ArrowUpRight size={17} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem, proceedToCheckout, loading } = useCart();
  if (!isOpen) return null;

  return (
    <div className="cart-overlay" role="presentation" onClick={closeCart}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}>
        <div className="cart-header">
          <div><span className="eyebrow eyebrow-dark">Sua sacola</span><h2 id="cart-title">Produtos do CEN</h2></div>
          <button className="cart-close" type="button" onClick={closeCart} aria-label="Fechar sacola"><X size={22} /></button>
        </div>
        {!cart?.items.length ? (
          <p className="cart-empty">Sua sacola está vazia. Escolha um produto para continuar.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map((item) => (
                <div className="cart-item" key={item.lineId}>
                  {item.image ? <img src={item.image.url} alt="" /> : <div className="cart-item-placeholder" />}
                  <div className="cart-item-copy"><strong>{item.productTitle}</strong><span>{formatMoney(item.unitPrice.amount, item.unitPrice.currencyCode)}</span></div>
                  <div className="cart-quantity" aria-label={`Quantidade de ${item.productTitle}`}>
                    <button type="button" onClick={() => updateQuantity(item.lineId, Math.max(0, item.quantity - 1))} disabled={loading} aria-label="Diminuir quantidade"><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.lineId, item.quantity + 1)} disabled={loading} aria-label="Aumentar quantidade"><Plus size={14} /></button>
                  </div>
                  <button className="cart-remove" type="button" onClick={() => removeItem(item.lineId)} disabled={loading}>Remover</button>
                </div>
              ))}
            </div>
            <div className="cart-total"><span>Total</span><strong>{formatMoney(cart.total.amount, cart.total.currencyCode)}</strong></div>
            <button className="cart-checkout-button" type="button" onClick={proceedToCheckout} disabled={loading}>Continuar para o checkout <ArrowUpRight size={18} /></button>
            <p className="cart-note">O checkout será aberto em uma nova aba pela loja de desenvolvimento.</p>
          </>
        )}
      </aside>
    </div>
  );
}

export default function ShopPreview() {
  // Sem `retry: false` a consulta ficava repetindo a chamada indefinidamente
  // quando nao ha backend (build estatico) ou quando o Shopify nao esta
  // configurado. Enquanto isso `isLoading` e `isError` ficavam ambos falsos com
  // a lista vazia, e a secao renderizava um buraco sem explicacao nenhuma.
  const { data: products = [], isLoading, isError } = trpc.commerce.products.list.useQuery(
    { first: 2 },
    { retry: false },
  );
  const semProdutos = !isLoading && !isError && products.length === 0;
  const { itemCount, openCart } = useCart();

  return (
    <section id="loja" className="shop-section section-light" aria-labelledby="shop-title">
      <div className="section-seal seal-shop" aria-hidden="true"><span>CEN</span><strong>27</strong></div>
      <div className="container">
        <div className="shop-heading-row">
          <div>
            <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /><span>Loja do congresso</span></div>
            <h2 id="shop-title">Leve a presença<br /><em>com você.</em></h2>
          </div>
          <div className="shop-heading-side">
            <p>Produtos personalizados para guardar a memória de Goiânia 2027 e caminhar com a identidade do CEN.</p>
            <button className="shop-cart-trigger" type="button" onClick={openCart}><ShoppingBag size={18} /><span>Minha sacola{itemCount > 0 ? ` · ${itemCount}` : ""}</span></button>
          </div>
        </div>
        {isLoading && <div className="shop-state" role="status">Carregando os produtos da loja…</div>}
        {(isError || semProdutos) && <div className="shop-state" role="status">O catálogo está em preparação. Os produtos serão publicados aqui.</div>}
        {!isLoading && !isError && products.length > 0 && <div className="shop-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
        <p className="shop-disclaimer">Loja protótipo: preços, disponibilidade e detalhes de personalização serão confirmados pela organização antes da abertura oficial.</p>
      </div>
      <CartDrawer />
    </section>
  );
}
