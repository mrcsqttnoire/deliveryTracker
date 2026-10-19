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


if __name__ == "__main__":
    run_populate()