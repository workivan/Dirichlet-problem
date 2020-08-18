from rest_framework import serializers, exceptions
from engine_project.models import DecisionInfo

import ctypes
import os
import numpy as np
import datetime
import uuid

libname = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "./backend/back_validation.so"))

number_steps_validation = ctypes.CDLL(libname).number_steps_validation
number_steps_validation.restype = ctypes.c_int
number_steps_validation.argtypes = (ctypes.c_int,)

function_validation = ctypes.CDLL(libname).function_validation


class RetrieveDecisionInfoSerializer(serializers.Serializer):
    decision_id = serializers.UUIDField(required=True)
    left_function = serializers.CharField(max_length=255, required=True)
    up_function = serializers.CharField(max_length=255, required=True)
    right_function = serializers.CharField(max_length=255, required=True)
    down_function = serializers.CharField(max_length=255, required=True)


class InputDataSerializer(serializers.Serializer):
    left_function = serializers.CharField(max_length=255, required=True)
    up_function = serializers.CharField(max_length=255, required=True)
    right_function = serializers.CharField(max_length=255, required=True)
    down_function = serializers.CharField(max_length=255, required=True)
    number_steps = serializers.IntegerField(required=True)

    def is_valid(self, raise_exception=True):
        super().is_valid(raise_exception=True)
        if "left_function" in self.data:
            result = function_validation(ctypes.c_char_p(self.data.get("left_function").encode('utf-8')))
            if result == 0:
                raise exceptions.ValidationError({"message": "Field left_function is wrong"})
        if "up_function" in self.data:
            result = function_validation(ctypes.c_char_p(self.data.get("up_function").encode('utf-8')))
            if result == 0:
                raise exceptions.ValidationError({"message": "Field up_function is wrong"})
        if "down_function" in self.data:
            result = function_validation(ctypes.c_char_p(self.data.get("down_function").encode('utf-8')))
            if result == 0:
                raise exceptions.ValidationError({"message": "Field down_function is wrong"})
        if "down_function" in self.data:
            result = function_validation(ctypes.c_char_p(self.data.get("down_function").encode('utf-8')))
            if result == 0:
                raise exceptions.ValidationError({"message": "Field down_function is wrong"})
        if "number_steps" in self.data:
            result = number_steps_validation(self.data.get("number_steps"))
            if result == 1:
                raise exceptions.ValidationError({"message": "Field number_steps is wrong"})
        return True

    def create(self, validated_data):
        z_2d = self.make_z_2d_array(validated_data.get('z'), self.validated_data.get("number_steps"))
        return DecisionInfo.objects.create(
            decision_id=uuid.uuid4(),
            z_array=z_2d.tolist(),
            req_time=datetime.datetime.now() + datetime.timedelta(hours=3),
            left_function=self.validated_data.get("left_function"),
            up_function=self.validated_data.get("up_function"),
            right_function=self.validated_data.get("right_function"),
            down_function=self.validated_data.get("down_function")
        )

    @staticmethod
    def make_z_2d_array(z, n):
        z = [round(x, 3) for x in z]
        u = np.reshape(z, (n, n))
        return u


class OutputDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DecisionInfo
        fields = '__all__'
