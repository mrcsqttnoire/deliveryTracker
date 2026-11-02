export type User = {
    id: string,
    prenom: string,
    nom: string, 
    telephone: string,
    photo: string | null,
    role: "Propriétaire" | "Livreur"
}