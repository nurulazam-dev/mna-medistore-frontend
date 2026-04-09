import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/providers/ReduxProvider";

const space_Grotesk_init = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-Space_Grotesk",
});

export const metadata: Metadata = {
  title: "MNA MediStore",
  description: "MNA-MediStore is an online medicine shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-Space_Grotesk ${space_Grotesk_init.variable} antialiased bg-white dark:bg-[#020617] transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
