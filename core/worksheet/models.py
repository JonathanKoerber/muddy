from django.db import models

from core.abstract.models import AbstractModel, AbstractManager

class WorksheetManager(AbstractManager):
    pass

class Worksheet(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    # TODO Add description field
    # TODO Add list of Questions
    body = models.TextField()
    edited = models.BooleanField(default=False)

    objects = WorksheetManager()

    def __str__(self):
        return f"{self.author.name}"

# Create your models here.
