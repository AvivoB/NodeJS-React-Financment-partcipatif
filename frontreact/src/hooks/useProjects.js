import { useEffect, useState } from "react"
import { apiGet } from "../utils/someFunctions"


export const useProjects = () => {
    const [projects, setProjects] = useState();
    useEffect(() => {
        const getProjects = async () => {
            const projectAPI = await fetch(process.env.REACT_APP_SERVER_URI + 'cagnotte/all');
            const projects = await projectAPI.json();
            console.log(projects.data);
            setProjects(projects.data); 
        }

        getProjects()
    }, [projects])

    return { projects }; // retourne un objet qui contient projects comme propriété
}