from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers
from .models import Destination, Livraison, Photo, Proprietaire, Livreur, Client

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
            'password'
            'role', 
            'photo',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

def get_photo_url(user, request=None):
    if not user.photo:
        return None

    url = user.photo.url

    if "res.cloudinary.com" in url and "/upload/" in url:
        url = url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,c_fill,g_face,w_200,h_200/",
            1,
        )

    if request is not None:
        # print("ok")
        url = request.build_absolute_uri(url)
    
    return url

class ProprietaireSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    email = serializers.CharField(source='user.username', read_only=True)
    # is_proprietaire = serializers.BooleanField(source='user.is_proprietaire')
    role = serializers.SerializerMethodField()
    optimized_photo = serializers.SerializerMethodField()

    def get_role(self, obj):
        return 'Propriétaire' if obj.user.is_proprietaire else 'Livreur'

    
    def get_optimized_photo(self, obj):
        return get_photo_url(obj.user, self.context.get('request') )

    class Meta:
        model = Proprietaire
        fields = [
            'nom', 
            'prenom', 
            'email', 
            'role',
            'optimized_photo',
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
            'photo',
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
    username = serializers.CharField(source='user.username')
    telephone = serializers.CharField(source='user.telephone')
    password = serializers.CharField(source='user.password', write_only=True, required=False)
    photo = serializers.ImageField(source='user.photo')
    optimized_photo = serializers.SerializerMethodField(read_only=True)

    def get_optimized_photo(self, obj):
        return get_photo_url(obj.user, self.context.get('request'))
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
            'username', 
            'password',
            'photo',
            'optimized_photo',
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
        read_only_fields = ['id', 'proprietaire']

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = [
            'id',
            'latitude',
            'longitude',
            'repere',
        ]
        # extra_kwargs = {
        #     'latitude': {'required':False},
        #     'longitude': {'required':False},
        # }
        read_only_fields = [
            'id',
        ]

class PhotoSerialize(serializers.ModelField):
    class Meta:
        model = Photo
        fields = [
            'id',
            'lien',
        ]
        read_only_fields = [
            'id',
        ]

class LivraisonSerializer(serializers.ModelSerializer):
    class LivreurProprietaireField(serializers.PrimaryKeyRelatedField):
        def get_queryset(self):
            request = self.context['request']
            qs = Livreur.objects.all()
            return qs.filter(proprietaire__user = request.user)
        
    class ClientProprietaireField(serializers.PrimaryKeyRelatedField):
        def get_queryset(self):
            request = self.context['request']
            qs = Client.objects.all()
            return qs.filter(proprietaire__user = request.user)


    proprietaire = serializers.CharField(source='proprietaire.nom', read_only=True)
    livreur = LivreurProprietaireField(required=False)
    client = ClientProprietaireField(required=False, read_only=True)
    destination = DestinationSerializer(read_only=True)

    # destination = DestinationSerializer()

    class Meta:
        model = Livraison
        fields = [
            'id',
            'designation',
            'status',
            'date_livraison',
            'heure_livraison',
            'proprietaire',
            'livreur',
            'client',
            'destination',
        ]
        extra_kwargs = {
            'status': {'read_only': True}
        }

class DetailLivraisonSerializer(serializers.ModelSerializer):
    destination = DestinationSerializer()
    client = ClientSerializer()

    class Meta:
        model = Livraison
        fields = [
            'id',
            'destination',
            'client',
        ]
        read_only_fields = [
            'id',
        ]

    def update(self, instance, validated_data):
        destination_data = validated_data.pop('destination', {})
        client_data = validated_data.pop('client', {})

        with transaction.atomic():
            proprietaire = getattr(instance, 'proprietaire')

            if destination_data:
                if not instance.destination :
                    destination = Destination.objects.create(**destination_data)
                    instance.destination = destination

            if client_data:
                telephone = client_data.get('telephone')
                client = Client.objects.all().filter(proprietaire=proprietaire, telephone=telephone).first()

                if not client: 
                    client = Client.objects.create(proprietaire=proprietaire, **client_data)

                instance.client = client

            for attr, value in validated_data.items():
                setattr(instance, attr, value)

            instance.save()

        return instance
