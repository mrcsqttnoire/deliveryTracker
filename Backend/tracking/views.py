from django.shortcuts import render
from django.http import JsonResponse
from tracking.models import Proprietaire, Livreur
from tracking.serializers import LivreurSerializer, ProprietaireSerializer, UserSerializer
from django.contrib.auth import get_user_model
# Create your views here.
User = get_user_model()
# @api_view()
def user_list(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    
    return JsonResponse({
        'data': serializer.data
    })

def proprietaire_list(request):
    props = Proprietaire.objects.all()
    serializer = ProprietaireSerializer(props, many=True)

    return JsonResponse({
        'data': serializer.data
    })

def livreur_list(request):
    livreur = Livreur.objects.all()
    serializer = LivreurSerializer(livreur, many=True)

    return JsonResponse({
        'data': serializer.data
    })