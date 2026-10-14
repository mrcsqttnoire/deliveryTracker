from django.conf import settings
from rest_framework import serializers

from Backend.tracking.models import Proprietaire

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class ProprietaireSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Proprietaire
        fields = ['id', 'nom', 'prenom', 'user']