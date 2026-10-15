import os
import sys
import django

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

# Configuration de l'environnement Django (en se basant sur ton module config.settings)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model
from tracking.models import Proprietaire, Livreur, Client

User = get_user_model()

def run_populate():
    print(" nettoyage de la base de données (données de test)...")
    Client.objects.all().delete()
    Livreur.objects.all().delete()
    Proprietaire.objects.all().delete()
    # Supprime les utilisateurs non superusers pour repartir sur du propre
    User.objects.filter(is_superuser=False).delete()

    print(" Création des propriétaires...")
    # Propriétaire 1
    user_prop1 = User.objects.create_user(username="jean@gmail.com", password="password123")
    prop1 = Proprietaire.objects.create(
        user=user_prop1,
        nom="Dupont",
        prenom="Jean"
    )

    # Propriétaire 2
    user_prop2 = User.objects.create_user(username="sophie@gmail.com", password="password123")
    prop2 = Proprietaire.objects.create(
        user=user_prop2,
        nom="Martin",
        prenom="Sophie"
    )

    print(" Création des livreurs...")
    # Livreur 1 (Libre) rattaché à prop1
    user_liv1 = User.objects.create_user(username="lucas@gmail.com", password="password123", is_proprietaire=False)
    Livreur.objects.create(
        user=user_liv1,
        proprietaire=prop1,
        nom="Bernard",
        prenom="Lucas",
        status=Livreur.Status.LIBRE
    )

    # Livreur 2 (Occupé) rattaché à prop2
    user_liv2 = User.objects.create_user(username="chloe@gmail.com", password="password123", is_proprietaire=False)
    Livreur.objects.create(
        user=user_liv2,
        proprietaire=prop2,
        nom="Thomas",
        prenom="Chloé",
        status=Livreur.Status.OCCUPE
    )

    print(" Création des clients...")
    # Clients rattachés à prop1
    Client.objects.create(
        proprietaire=prop1,
        nom="Durand",
        prenom="Alice",
        telephone="0341234567"
    )
    Client.objects.create(
        proprietaire=prop1,
        nom="Moreau",
        prenom="David",
        telephone="0329876543"
    )

    # Clients rattachés à prop2
    Client.objects.create(
        proprietaire=prop2,
        nom="Rousseau",
        prenom="Emma",
        telephone="0331122334"
    )

    print(" Données de test injectées avec succès !")

if __name__ == "__main__":
    run_populate()