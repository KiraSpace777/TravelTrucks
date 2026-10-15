"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TanStackProviderProperties {
  children: React.ReactNode;
}

export const TanStackProvider = ({ children }: TanStackProviderProperties) => {
  const [applicationQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return <QueryClientProvider client={applicationQueryClient}>{children}</QueryClientProvider>;
};
