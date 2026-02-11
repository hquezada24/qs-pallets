import "../../styles/globals.css";

export const metadata = {
  title: "QS Pallets Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="bg-yellow-200">{children}</main>
      </body>
    </html>
  );
}
