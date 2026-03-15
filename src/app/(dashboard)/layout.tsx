import DashboardShell from "./DashboardShell";
import "../../styles/globals.css";
import Providers from "./providers";

export const metadata = {
  title: "QS Pallets Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Providers>
          <DashboardShell>{children}</DashboardShell>
        </Providers>
      </body>
    </html>
  );
}
