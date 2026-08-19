// Direção visual: Identidade Solar do Cerrado: pastoral, ilustrada, territorial e comunitária.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";

function Router() {
  // O wouter compara as rotas com location.pathname inteiro. Servido de uma
  // subpasta (GitHub Pages de projeto), "/" nunca casava e tudo caia no
  // NotFound. BASE_URL vale "/" em dev, entao o base fica vazio e nada muda.
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  // make sure to consider if you need authentication for certain routes
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Router />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
