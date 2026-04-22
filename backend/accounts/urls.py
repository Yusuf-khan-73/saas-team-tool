from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('test/', views.test_view, name='test'),
    path('profile/', views.profile_view, name='profile'),
    path('projects/', views.projects_list, name='projects'),
    path('tasks/', views.tasks_list, name='tasks'),
    path('timelog/', views.timelog_list, name='timelog'),
]