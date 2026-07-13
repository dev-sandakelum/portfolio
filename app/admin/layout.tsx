import "./admin.css";

export const metadata = {
  title: "Portfolio Admin Dashboard",
  description: "Manage your portfolio content, links, and skills.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-body">
      {children}
    </div>
  );
}
