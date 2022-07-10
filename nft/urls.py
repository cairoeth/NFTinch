"""simulations URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from home.views import index
from sell.views import sell, sell_nft


urlpatterns = [
    path('admin/', admin.site.urls),
    path('buy/', index),
    path('sell/', sell),
    path('orders/', TemplateView.as_view(template_name='orders.html'), name='orders'),
    path('activity/', TemplateView.as_view(template_name='activity.html'), name='activity'),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('sell/<str:contract>/<int:id>/', sell_nft),
]