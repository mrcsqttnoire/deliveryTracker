from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction
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
        fields = [
            'id', 
            'nom', 
            'prenom', 
            'username', 
            'role', 
            'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

class ProprietaireSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    email = serializers.CharField(source='user.username', read_only=True)
    # is_proprietaire = serializers.BooleanField(source='user.is_proprietaire')
    role = serializers.SerializerMethodField()

    def get_role(self, obj):
        return 'Propriétaire' if obj.user.is_proprietaire else 'Livreur'

    class Meta:
        model = Proprietaire
        fields = [
            'nom', 
            'prenom', 
            'email', 
            'role'
        ]

class ProprietaireInscriptionSerializer(serializers.ModelSerializer):
    nom = serializers.CharField(source='proprietaire.nom')
    prenom = serializers.CharField(source='proprietaire.prenom')

    class Meta:
        model = User
        fields = [
            'nom',
            'prenom',
            'telephone',
            'username',
            'password',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        proprietaire_data = validated_data.pop('proprietaire')

        with transaction.atomic():
            user = User.objects.create_user(is_proprietaire=True, **validated_data)
            Proprietaire.objects.create(user=user, **proprietaire_data)

        return user


class LivreurSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.username')
    telephone = serializers.CharField(source='user.telephone')
    password = serializers.CharField(source='user.password', write_only=True, required=False)
    # role = serializers.SerializerMethodField()

    # def get_role(self, obj):
    #     return 'Propriétaire' if obj.user.is_proprietaire else 'Livreur'

    class Meta:
        model = Livreur
        fields = [
            'id',
            'nom',
            'prenom',
            'telephone', 
            'email', 
            'password'
        ]
        read_only_fields = ["id"]

    def create(self, validated_data):
        user_data = validated_data.pop('user', {})

        with transaction.atomic():
            request = self.context['request']  
            current_user = request.user if request else None
            proprietaire = getattr(current_user, 'proprietaire')

            user = User.objects.create_user(**user_data)
            livreur = Livreur.objects.create(user=user, proprietaire=proprietaire, **validated_data)

        return livreur

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')

        with transaction.atomic():
            request = self.context['request']  
            current_user = request.user if request else None
            # proprietaire = getattr(current_user, 'proprietaire')

            instance = super().update(instance, validated_data)

            if user_data:
                user = instance.user
                password_data = user_data.pop('password', None)

                for attr, value in user_data.items():
                    setattr(user, attr, value)

                if password_data :
                    user.set_password(password_data)

                user.save()

        return instance

class ClientSerializer(serializers.ModelSerializer):
    # proprietaire = ProprietaireSerializer()
    # proprietaire = serializers.CharField(source='proprietaire.nom')
    class Meta:
        model = Client
        fields = [
            'id', 
            'nom', 
            'prenom', 
            'telephone', 
            'proprietaire'
        ]