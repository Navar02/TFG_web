from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    alias = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True, primary_key=True)
    password = models.CharField(max_length=100)
    securityQuestion = models.ForeignKey('SecurityQuestion', on_delete=models.CASCADE)
    answer = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",
        blank=True
    )
    
    def __str__(self):
        return self.username

class SecurityQuestion(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True)
    question = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.question

class Categories(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True)
    type = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.type

class Poll(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True)
    question = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

class Option(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True)
    poll = models.ManyToManyField(Poll, related_name="options")
    option = models.CharField(max_length=100)

    def __str__(self):
        return self.option

class Vote(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    optionSelected = models.ForeignKey(Option, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.poll.question} - {self.optionSelected.option}"
