import { useState } from "react";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const { name, lastname, username, email, password } = form;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, lastname, username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al registrar usuario");
        return;
      }

      navigate("/login");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <h1 className="">Register</h1>
      <form className="flex flex-col gap-1.5 mt-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border"
          placeholder="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="border"
          placeholder="lastname"
          name="lastname"
          value={lastname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="border"
          placeholder="username"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="border"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="border"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-700 font-bold">{error}</p>}

        <button className="bg-blue-400 rounded-2xl p-1" type="submit">
          {loading ? "cargando..." : "Register"}
        </button>
      </form>
    </>
  );
};
