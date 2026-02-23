import DashboardShell from "./DashboardShell";
import "../../styles/globals.css";

export const metadata = {
  title: "QS Pallets Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
