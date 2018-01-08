from rest_framework import serializers

from . import models


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ToDo
        fields = ('id', 'complete', 'description')
