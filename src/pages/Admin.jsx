import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { user } = useAuth();

  if (user?.role !== "admin") return <h3>Access Denied</h3>;

  return <h2>Admin Panel</h2>;
}
