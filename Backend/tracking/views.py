from django.db import transaction
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from tracking.permissions import IsProprietaire
from tracking.models import Client, Destination, Livraison, Proprietaire, Livreur
from tracking.serializers import DestinationSerializer, DetailLivraisonSerializer, LivraisonListSerializer, LivraisonSerializer, LivreurSerializer, ProprietaireInscriptionSerializer, ProprietaireSerializer, UserSerializer, ClientSerializer
# Create your views here.
User = get_user_model()


class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except User.DoesNotExist:
            raise InvalidToken("L'utilisateur associé à ce token n'existe plus.")

class ProprietaireList(generics.ListAPIView):
    queryset = Proprietaire.objects.all()
    serializer_class = ProprietaireSerializer
    permission_classes = [IsAuthenticated, IsProprietaire]

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user)


class ProprietaireCreateAPIView(generics.CreateAPIView):
    Model = User
    serializer_class = ProprietaireInscriptionSerializer
    permission_classes = [AllowAny]


# @api_view(["GET"])
# def livreur_list(request):
#     livreur = Livreur.objects.all()
#     serializer = LivreurSerializer(livreur, many=True)

#     return Response(serializer.data)

class LivreurAPIViewSet(ModelViewSet):
    queryset = Livreur.objects.all()
    serializer_class = LivreurSerializer
    permission_classes = [IsAuthenticated, IsProprietaire]

    def get_queryset(self):
        return super().get_queryset().filter(proprietaire__user = self.request.user).order_by('-created_at')

    def perform_destroy(self, instance):
        with transaction.atomic():
            super().perform_destroy(instance.user)
        return Response(status=status.HTTP_204_NO_CONTENT)


# class LivreurListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Livreur.objects.all()
#     serializer_class = LivreurSerializer
#     permission_classes = [IsAuthenticated, IsProprietaire]

#     def get_queryset(self):
#         return super().get_queryset().filter(proprietaire__user = self.request.user)


class ClientAPIViewSet(ModelViewSet):
    queryset = Client.objects.select_related('proprietaire').prefetch_related('livraisons')
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated, IsProprietaire]

    def get_queryset(self):
        return super().get_queryset().filter(proprietaire__user = self.request.user).order_by('-created_at')

class DestinationAPIView(generics.CreateAPIView):
    model = Destination
    serializer_class = DestinationSerializer

class LivraisonAPIViewSet(ModelViewSet):
    queryset = Livraison.objects.select_related('client','proprietaire', 'destination', 'proprietaire')
    serializer_class = LivraisonSerializer
    permission_classes = [IsAuthenticated, IsProprietaire]

    def get_permissions(self):
        actions = ['create', 'update', 'destroy']
        if self.action in actions:
            return [IsAuthenticated(), IsProprietaire()]
        return [IsAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset().filter(proprietaire__user = self.request.user).order_by('-created_at')
        return qs

    def perform_create(self, serializer):
        proprietaire = getattr(self.request.user, 'proprietaire')
        serializer.save(proprietaire=proprietaire)

class LivraisonListAPIView(generics.ListAPIView):
    queryset = (Livraison.objects
                .select_related('client','proprietaire', 'destination', 'proprietaire')
                .prefetch_related('photos')
                .all().reverse()
                )
    serializer_class = LivraisonListSerializer
    permission_classes = [IsAuthenticated, IsProprietaire]
    def get_queryset(self):
        return super().get_queryset().filter(proprietaire__user = self.request.user)
    
class OneLivraisonAPIView(generics.RetrieveAPIView):
    queryset = (Livraison.objects
                .select_related('client','proprietaire', 'destination', 'proprietaire')
                .prefetch_related('photos')
                .all()
                )
    serializer_class = LivraisonSerializer
    permission_classes = [AllowAny]
    # def get_queryset(self):
    #     return super().get_queryset().filter(proprietaire__user = self.request.user)

class AddDetailLivraisonAPIView(generics.RetrieveUpdateAPIView):
    queryset = Livraison.objects.all()
    serializer_class = DetailLivraisonSerializer
    permission_classes = [AllowAny]

    # def get_queryset(self):
    #     return super().get_queryset().filter(proprietaire__user = self.request.user)

# --------------------- COTE LIVREUR

class LivraisonLivreurListAPIVIew(generics.ListAPIView):
    queryset = (Livraison.objects
                .select_related('client','proprietaire', 'destination', 'proprietaire')
                .prefetch_related('photos')
                .all().reverse()
                )
    serializer_class = LivraisonListSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return super().get_queryset().filter(client__isnull = False, livreur__user = self.request.user)

