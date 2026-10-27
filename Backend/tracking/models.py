from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
import uuid
from django.core.exceptions import ValidationError
# Create your models here.

def validate_image_size(photo_obj):
    filesize = photo_obj.size
    limit = 3.0 
    if filesize > limit * 1024 * 1024:
        raise ValidationError(f"La taille maximale de l'image est de {limit}MB")

class User(AbstractUser):
    is_proprietaire = models.BooleanField(default=True)
    telephone = models.CharField(max_length=20, null=False)
    photo = models.ImageField(upload_to="users_profils", null=True, blank=True, validators=[validate_image_size])

class Proprietaire(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='proprietaire')
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

class Livreur(models.Model):
    class Status(models.TextChoices):
        LIBRE = "libre", "Libre"
        OCCUPE = "occupe", "Occupé"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='livreur')
    proprietaire = models.ForeignKey(Proprietaire, on_delete=models.CASCADE, related_name="livreurs", editable=False)
    nom =models.CharField(max_length=50)
    prenom = models.CharField(max_length=100)
    status = models.CharField(choices=Status.choices, default=Status.LIBRE, max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

class Client(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    proprietaire = models.ForeignKey(Proprietaire, on_delete=models.CASCADE, related_name="clients")
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

class Destination(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    repere = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.repere

class Livraison(models.Model):
    class Status(models.TextChoices):
        EN_ATTENTE = "en_attente", "En attente"
        EN_ROUTE = "en_route", "En route"
        LIVRE = "livree", "Livrée"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    proprietaire = models.ForeignKey(Proprietaire, on_delete=models.CASCADE, related_name="livraisons", editable=False) 
    livreur = models.ForeignKey(Livreur, on_delete=models.SET_NULL, null=True, related_name="livraisons")
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, related_name="livraisons")
    destination = models.OneToOneField(Destination, on_delete=models.SET_NULL, null=True, related_name='livraison')
    designation = models.TextField()
    status = models.CharField(choices=Status.choices, default=Status.EN_ATTENTE, max_length=20)
    date_livraison = models.DateField(null=True, blank=True)
    heure_livraison = models.TimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        value = f"Livraison à livré par {self.livreur.nom if self.livreur else None} {self.livreur.prenom if self.livreur else None} le {self.date_livraison} à {self.heure_livraison}"
        return value

class Photo(models.Model):
    livraison = models.ForeignKey(Livraison, on_delete=models.CASCADE, related_name="photos")
    lien = models.ImageField(upload_to="details")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"path: {self.lien}"

class Position(models.Model):
    livraison = models.ForeignKey(Livraison, on_delete=models.CASCADE, related_name="positions")
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(
                fields=['livraison', 'created_at'],
                name="position_livraison_date_idx"
            ),
        ]

    def __str__(self):
        value = f"Position {self.id} (Latitude:  {self.latitude}, Longitude: {self.longitude})"
        return value
