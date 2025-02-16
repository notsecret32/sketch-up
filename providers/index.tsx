'use client';

import { LiveblocksProvider } from '@liveblocks/react';

import { Toaster } from '@/components/ui/sonner';

import { ConvexClientProvider } from './convex-client-provider';
import { ModalProvider } from './modal-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ConvexClientProvider>
      <Toaster />
      <ModalProvider />
      <LiveblocksProvider authEndpoint='/api/liveblocks-auth'>
        {children}
      </LiveblocksProvider>
    </ConvexClientProvider>
  );
};
