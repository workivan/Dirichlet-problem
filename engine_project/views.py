from rest_framework.response import Response
from rest_framework import views, generics
from rest_framework import status
from django.shortcuts import get_object_or_404

from engine_project.serializers import InputDataSerializer, RetrieveDecisionInfoSerializer, OutputDataSerializer
from engine_project.tasks import create_result, swap_data
from engine_project.models import DecisionInfo

import pandas as pd


class InputDataView(views.APIView):

    def post(self, request):
        serializer = InputDataSerializer(data=request.data)
        if serializer.is_valid():
            z = create_result(serializer.validated_data)
            inst = serializer.create({"z": z})
            return Response(inst.decision_id, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InputFileData(views.APIView):

    def post(self, request):
        file = pd.ExcelFile(request.data.get('file'))


class RetrieveDecisionInfo(generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        decision = get_object_or_404(DecisionInfo, decision_id=self.request.data)
        serializer = OutputDataSerializer(decision, many=True)
        return Response(serializer, status=status.HTTP_200_OK)


class ListDecisionInfo(generics.ListAPIView):
    queryset = DecisionInfo.objects.all()
    serializer_class = OutputDataSerializer

    def get_queryset(self):
        return self.queryset.order_by('-req_time')[:4]
