import { useState } from "react";
import { useNavigate } from "react-router-dom"; // se vc usa react-router
import ImgLogin from "../assets/icons/ImgLogin.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // impede reload da página
  setError("");

  try {
    const response = await fetch("http://localhost:3333/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });

    if (!response.ok) {
      const err = await response.json();
      setError(err.error || "Erro no login");
      return;
    }

    const data = await response.json();
    // salva token no localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario)); // 👈 salva infos também

    // redireciona pro dashboard
    navigate("/");
  } catch (err) {
    console.error(err);
    setError("Erro ao conectar ao servidor");
  }
};

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-[#F8FAFC] px-16">
      <div>
        <h2 className=" text-2xl font-bold text-[#1169B0] mb-2">
          Entre na sua conta
        </h2>
        <p className="text-gray-600 mb-6 w-90">
          Boas-vindas! Por favor, insira suas credenciais para acessar os
          sistemas da Comigo.
        </p>

        <form className="text-black w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1169B0]"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1169B0]"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Mantenha-me conectado.
            </label>
            <a
              href="#"
              className="linkEsqueciSenha text-[#1169B0] hover:text-white hover:underline"
            >
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1169B0] text-white py-2 rounded-md hover:bg-[#0e568e] transition"
          >
            Entrar
          </button>
        </form>
        </div>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 bg-[#1169B0] flex items-center justify-center">
        <div className="text-white text-xl font-semibold">
          <img src={ImgLogin} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;