import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Buldex - Building New World | Construction & Engineering Experts",
  description: "Buldex is a premier construction and engineering firm offering quality services in structural design, architecture, project planning, and general contracting.",
  keywords: "construction, engineering, architecture, planning, general contracting, Buldex",
  authors: [{ name: "Buldex Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
