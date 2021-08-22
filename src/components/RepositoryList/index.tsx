import { useEffect, useState } from "react";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

interface User {
  login: string;
  name: string;
  bio: string;
  blog: string;
  company: string;
  followers: number;
  following: number;
  location: string;
  url: string;
  avatar_url: string;
  html_url: string;
}

interface ProfileProps {
  profile: User;
}

export function RepositoryList(props: ProfileProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {      
    api.get(`${props.profile.login}/repos`)  
      .then(response => setRepositories(response.data)) 
  }, [props.profile]); 

  return(
    <div className={styles.container}>
      <ul>
        {repositories.map(repository => (
          <li key={repository.id}>
              <strong>{repository.name}</strong> 
              <p>{repository.description}</p>

              <a href={repository.html_url}>
                Acessar repositório
              </a>
            </li>
        ))}
      </ul>
    </div>
  );
}