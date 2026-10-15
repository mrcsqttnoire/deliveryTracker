from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Proprietaire, Livreur, Client

User = get_user_model()
# print(User)
class UserSerializer(serializers.ModelSerializer):
    nom = serializers.SerializerMethodField()
    prenom = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    def get_nom(self, obj):
        return obj.proprietaire.nom if obj.is_proprietaire else obj.livreur.nom

    def get_prenom(self, obj):
        return obj.proprietaire.prenom if obj.is_proprietaire else obj.livreur.prenom

    def get_role(self, obj):
        return 'Propriétaire' if obj.is_proprietaire else 'Livreur'
    
    class Meta:
        model = User
        fields = ['id', 'nom', 'prenom', 'username', 'role', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

class ProprietaireSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    email = serializers.CharField(source='user.username')
    # is_proprietaire = serializers.BooleanField(source='user.is_proprietaire')
    role = serializers.SerializerMethodField()

    def get_role(self, obj):
        return 'Propriétaire' if obj.user.is_proprietaire else 'Livreur'

    class Meta:
        model = Proprietaire
        fields = ['id', 'nom', 'prenom', 'email', 'role']

class LivreurSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.username')
    role = serializers.SerializerMethodField()

    def get_role(self, obj):
        return 'Propriétaire' if obj.user.is_proprietaire else 'Livreur'

    class Meta:
        model = Proprietaire
        fields = ['id', 'nom', 'prenom', 'email', 'role']