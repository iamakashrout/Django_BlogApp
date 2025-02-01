from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .models import Post
from rest_framework.authtoken.models import Token

# Create your views here.

# REGISTER USER
@api_view(['POST'])
def register(request):
    username=request.data.get('username')
    email=request.data.get('email')
    password=request.data.get('password')

    # if user with same email exists
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

# LOGIN USER
@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


# CREATE AND VIEW POSTS
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def posts(request):
    # post
    if request.method=='POST':
        serializer=PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    # get
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

# UPDATE AND DELETE POSTS
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def post_detail(request, post_id):
    # fetch post
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    # user authentication
    if request.user != post.author:
        return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

    # update
    if request.method == "PUT":
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete
    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)