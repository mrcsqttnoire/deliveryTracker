from django.contrib import admin
from .models import Livraison, User, Proprietaire, Livreur ,Client
# Register your models here.

# class LivraisonProprietaire(admin.TabularInline):
#     model = Livraison

# class ProprietaireAdmin(admin.ModelAdmin):
#     inlines = [
#         LivraisonProprietaire
#     ]


# admin.site.register(Proprietaire, ProprietaireAdmin)
admin.site.register([User, Proprietaire, Livreur, Client, Livraison])
