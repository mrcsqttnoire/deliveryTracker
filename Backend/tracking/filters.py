import django_filters

from .models import Livraison

class LivraisonFilter(django_filters.FilterSet):
    class Meta:
        model = Livraison
        fields = {
            "status": ["iexact"]
        }