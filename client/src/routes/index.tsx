import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { useRoutes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

export const AppRoutes = () => { 

    const element = useRoutes([...publicRoutes, ...protectedRoutes]);

    return <MainLayout>{element}</MainLayout>
}