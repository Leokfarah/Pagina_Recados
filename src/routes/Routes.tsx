import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageArquivados } from "../pages/arquivados/Arquivados";
import { Cadastro } from "../pages/cadastro/Cadastro";
import { Login } from "../pages/login/Login";
import { PageRecados } from "../pages/recados/Recados";


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/recados' element={<PageRecados />} />
                <Route path='/arquivados' element={<PageArquivados />} />
                <Route path='*' element={<div><h1>404</h1> <h3>pagina não encontrada</h3></div>} />
            </Routes>
        </BrowserRouter>
    );
}