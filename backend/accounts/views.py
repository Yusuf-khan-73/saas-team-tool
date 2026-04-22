from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    print(f"=== LOGIN ATTEMPT ===")
    print(f"Email: {email}")
    print(f"Password: {password}")
    
    # Try to authenticate
    user = authenticate(request, username=email, password=password)
    
    if user:
        print(f"✅ Authentication successful for {user.email}")
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
            }
        })
    
    print(f"❌ Authentication failed for {email}")
    
    # Check if user exists
    if User.objects.filter(email=email).exists():
        print("User exists but password is wrong")
    else:
        print("User does not exist")
    
    return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def test_view(request):
    return Response({'message': 'API is working!'})

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')
    
    if User.objects.filter(email=email).exists():
        return Response({'error': 'User already exists'}, status=400)
    
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    
    return Response({'message': 'User created successfully', 'email': user.email})

@api_view(['GET'])
@permission_classes([AllowAny])
def profile_view(request):
    return Response({'message': 'Profile API - Coming soon'})

# Dummy API responses for dashboard
@api_view(['GET'])
@permission_classes([AllowAny])
def projects_list(request):
    return Response({
        'results': [
            {
                'id': 1,
                'name': 'Demo Project 1',
                'client': 'Client A',
                'status': 'active',
                'budget': 50000
            },
            {
                'id': 2,
                'name': 'Demo Project 2',
                'client': 'Client B',
                'status': 'completed',
                'budget': 75000
            }
        ]
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def tasks_list(request):
    return Response({
        'results': [
            {
                'id': 1,
                'title': 'Setup Project',
                'status': 'completed',
                'priority': 'high',
                'deadline': '2026-05-01'
            },
            {
                'id': 2,
                'title': 'Develop Features',
                'status': 'in_progress',
                'priority': 'medium',
                'deadline': '2026-05-15'
            },
            {
                'id': 3,
                'title': 'Testing',
                'status': 'todo',
                'priority': 'low',
                'deadline': '2026-05-20'
            }
        ]
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def timelog_list(request):
    return Response({
        'results': [
            {'duration_minutes': 120},
            {'duration_minutes': 180},
            {'duration_minutes': 90}
        ]
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def profile_view(request):
    if request.user.is_authenticated:
        return Response({
            'id': request.user.id,
            'email': request.user.email,
            'username': request.user.username,
            'role': getattr(request.user, 'role', 'employee')
        })
    return Response({'error': 'Not authenticated'}, status=401)