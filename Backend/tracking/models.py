from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
import uuid
# Create your models here.

class User(AbstractUser):
    is_proprietaire = models.BooleanField(default=True)
    telephone = models.CharField(max_length=20, null=False)

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
    proprietaire = models.ForeignKey(Proprietaire, on_delete=models.CASCADE, related_name="livreurs")
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


