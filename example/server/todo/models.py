from django.db import models


class ToDo(models.Model):
    complete = models.BooleanField(default=False)
    description = models.CharField(max_length=255)
