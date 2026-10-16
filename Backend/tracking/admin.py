from django.contrib import admin
from .models import User, Proprietaire, Livreur ,Client
# Register your models here.

# class ClientProprietaire(admin.TabularInline):
#     model = Client

admin.site.register([User, Proprietaire, Livreur, Client])
