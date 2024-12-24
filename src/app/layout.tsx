"use client"
import { ReactNode } from "react";
import "./globals.css";

import {AppointmentProvider}  from '@/features/appointments/contexts/AppointmentContext'

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {

    return (
        <html lang="en">
        <body className="antialiased">
            <AppointmentProvider>
                {children}
            </AppointmentProvider>
        </body>
        </html>
    );
}
