from django.conf.urls import url

from engine_project import views

urlpatterns = [
    url("post_data/", views.InputDataView.as_view(), name="post_data"),
    url("decision/", views.RetrieveDecisionInfo.as_view(), name="decision"),
    url("decisions/", views.ListDecisionInfo.as_view(), name="decisions"),
]
