import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import App from "./App";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,

      retry: 3,

      retryDelay: (
        attemptIndex
      ) =>
        Math.min(
          1000 * 2 ** attemptIndex,
          30000
        ),
    },
  },
});

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <App />
    </QueryClientProvider>
  </StrictMode>
);