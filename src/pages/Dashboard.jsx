import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../services/courses";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar"; // ✅ Corrected import path

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCourses();
        if (mounted) setCourses(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading dashboard…
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
            <p className="text-gray-600">Role: {user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </header>

        {/* Courses Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <article
              key={c._id || c.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{c.title}</h3>
              <p className="text-gray-600 mb-4">{c.description}</p>
              <Link
                to={`/courses/${c._id || c.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                Open Course
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
