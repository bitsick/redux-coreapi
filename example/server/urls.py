from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from rest_framework import routers, schemas

from .todo import views


router = routers.DefaultRouter()
router.register('todos', views.ToDoViewSet)


urlpatterns = [
    path('schema', schemas.get_schema_view(title='Example Server API')),
] + router.urls
