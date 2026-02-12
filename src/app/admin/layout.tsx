
'use client';

import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* O Toaster provider renderiza as notificações */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          // Estilos para os toasts
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
      {children}
    </section>
  );
}
