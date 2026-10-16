from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.http import JsonResponse
from tracking.models import Client, Proprietaire, Livreur
from tracking.serializers import LivreurSerializer, ProprietaireSerializer, UserSerializer, ClientSerializer
# Create your views here.
User = get_user_model()

@api_view(["GET"])
def user_list(request):
    user = User.objects.select_related('proprietaire', 'livreur')
    serializer = UserSerializer(user, many=True)
    
    return Response(serializer.data)

@api_view(["GET"])
def proprietaire_list(request):
    props = Proprietaire.objects.all()
    serializer = ProprietaireSerializer(props, many=True)

    return Response(serializer.data)

@api_view(["GET"])
def livreur_list(request):
    livreur = Livreur.objects.all()
    serializer = LivreurSerializer(livreur, many=True)

    return Response(serializer.data)

class ClientListAPIView(generics.ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(proprietaire__user = self.request.user)
    