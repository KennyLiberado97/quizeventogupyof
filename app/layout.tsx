import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Recrut.ia - Simulador de Recrutamento',
  description: 'Simulador de recrutamento e verificação de antecedentes.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#021231" />
      </head>
      <body className="bg-[#021231] text-[#f5f5f5] font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
