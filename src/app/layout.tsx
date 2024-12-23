"use client"
import { ReactNode } from "react";
import "./globals.css";
import dynamic from "next/dynamic";

const DynamicContextProvider = dynamic(() => import('@/features/appointments/contexts/AppointmentContext').then(mod => mod.AppointmentProvider), {
  ssr: false
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <DynamicContextProvider>
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
