from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid


class DecisionInfo(models.Model):
    decision_id = models.UUIDField(primary_key=True)
    z_array = ArrayField(ArrayField(models.DecimalField(max_digits=5, decimal_places=3)))
    req_time = models.TimeField(auto_created=True)
    left_function = models.CharField(max_length=255, blank=False)
    up_function = models.CharField(max_length=255, blank=False)
    right_function = models.CharField(max_length=255, blank=False)
    down_function = models.CharField(max_length=255, blank=False)



