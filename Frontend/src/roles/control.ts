import type { ComponentType } from "react"
import { HeadDashboardAdmin } from "./admin/headDashboar";
import { HeadDashboardDelivery } from "./delivery/headDashboard";
import { InfoSuppAdmin } from "./admin/cardLivraison";
import { InfoSuppDelivery } from "./delivery/cardLivraison";
import type { CardLivraisonProps } from "./interface";
import { LivraisonActionAdmin } from "./admin/livraisonAction";
import { LivraisonActionDelivery } from "./delivery/livraisonAction";

type Role = "proprietaire" | "livreur"

export const HEADER_DASHBOARD: Record<Role, React.ComponentType> = {
    proprietaire: HeadDashboardAdmin,
    livreur: HeadDashboardDelivery
}

export const CARD_LIVRAISON: Record<Role, ComponentType<CardLivraisonProps>> = {
    proprietaire: InfoSuppAdmin,
    livreur: InfoSuppDelivery
}

export const ACTION_LIVRAISON: Record<Role, ComponentType<CardLivraisonProps>> = {
    proprietaire: LivraisonActionAdmin,
    livreur: LivraisonActionDelivery
}