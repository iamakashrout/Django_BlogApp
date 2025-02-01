from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post

# coversion between Django models and JSON formats

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
