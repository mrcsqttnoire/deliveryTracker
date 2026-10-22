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
from tracking.permissions import IsProprietaire
from tracking.models import Client, Destination, Livraison, Proprietaire, Livreur
from tracking.serializers import DestinationSerializer, DetailLivraisonSerializer, LivraisonSerializer, LivreurSerializer, ProprietaireInscriptionSerializer, ProprietaireSerializer, UserSerializer, ClientSerializer
# Create your views here.
User = get_user_model()

# @api_view(["GET"])
# def user_list(request):
#     user = User.objects.select_related('proprietaire', 'livreur')
#     serializer = UserSerializer(user, many=True)
    
#     return Response(serializer.data)

# class ProprietaireList(APIView):
#     permission_classes = [IsAuthenticated, IsAdminUser]

#     def get(self, request):
#         props = Proprietaire.objects.all()
#         serializer = ProprietaireSerializer(props, many=True)

#         return Response(serializer.data)

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
        return super().get_queryset().filter(proprietaire__user = self.request.user)

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


class ClientListAPIView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated, IsProprietaire]

    def get_queryset(self):
        return super().get_queryset().filter(proprietaire__user = self.request.user)

class DestinationAPIView(generics.CreateAPIView):
    model = Destination
    serializer_class = DestinationSerializer

class LivraisonAPIViewSet(ModelViewSet):
    queryset = Livraison.objects.all()
    serializer_class = LivraisonSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        actions = ['create', 'update', 'destroy']
        if self.action in actions:
            return [IsAuthenticated(), IsProprietaire()]
        return [IsAuthenticated()]

    def get_queryset(self):
        return super().get_queryset().filter(proprietaire__user = self.request.user)

    def perform_create(self, serializer):
        proprietaire = getattr(self.request.user, 'proprietaire')
        serializer.save(proprietaire=proprietaire)


class AddDetailLivraisonAPIView(generics.UpdateAPIView):
    queryset = Livraison.objects.all()
    serializer_class = DetailLivraisonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(proprietaire__user = self.request.user)

