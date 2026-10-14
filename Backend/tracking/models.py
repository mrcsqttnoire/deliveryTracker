from django.db import models
import uuid
# Create your models here.

class Proprietaire(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

class Livreur(models.Model):
    class Status(models.TextChoices):
        LIBRE = "Libre"
        OCCUPE = "Occupé"

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    proprietaire = models.ForeignKey(Proprietaire, on_delete=models.CASCADE)
    nom =models.CharField(max_length=50)
    prenom = models.CharField(max_length=100)
    status = models.CharField(choices=Status.choices, default=Status.LIBRE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

class Client(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4)
    proprietaire = models.ForeignKey(Proprietaire, on_delete=models.CASCADE)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom


