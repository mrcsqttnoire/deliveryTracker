export type User = {
    id: string,
    prenom: string,
    nom: string, 
    telephone: string,
    photo: string | null,
    role: "proprietaire" | "livreur"
    is_proprietaire: boolean
}

export const DefaultUser: User = {
    id: '',
    prenom: '',
    nom: '', 
    telephone: '',
    photo: '',
    role: "proprietaire",
    is_proprietaire: false
}