export type User = {
    id: string,
    prenom: string,
    nom: string, 
    telephone: string,
    photo: string | null,
    role: "proprietaire" | "livreur"
    is_proprietaire: boolean
}


export type Livraisons = {
    id: string | null
    designation: string
    date_livraison: string
    heure_livraison: string
    livreur: string
    livreur_photo: string
    livreur_nom: string
    livreur_prenom: string
    livreur_telephone: string
    client: string | null
    client_nom: string
    client_prenom: string
    client_telephone: string
    destination_lat: string | null
    destination_long: string | null
    destination_repere: string
    destination_lieu: string
    destination: DestinationType | null
    status: string
    photos: PhotoType[] | null
}

export type DestinationType = {
    latitude: string
    longitude: string
    repere: string
    lieu: string
}

export type PhotoType = {
    id: number
    lien: string
}

export type Livreur = {
    id: string,
    nom: string,
    prenom: string,
    telephone: string,
    username: string,
    optimized_photo: string,
    photo: string,
    status: string
    livraison_count: number
} 

export type UserLocation = {
  latitude: number
  longitude: number
  accuracy: number
}