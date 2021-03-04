from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager

from django.utils import timezone

class UserManager(BaseUserManager):

    def _create_user(self, phoneNumber, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not phoneNumber:
            raise ValueError('The given phoneNumber must be set')
        phoneNumber = phoneNumber
        user = self.model(phoneNumber=phoneNumber, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, phoneNumber, password, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(phoneNumber, password, **extra_fields)

    def create_superuser(self, phoneNumber, password, **extra_fields):
        """
        주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
        단, 최상위 사용자이므로 권한을 부여한다. 
        """
        user = self.create_user(
            phoneNumber=phoneNumber,
            password=password,
        )

        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):

    SEX = [
    ('남자', '남자'),
    ('여자', '여자'),
    ]

    USERTYPE = [
    ('농인', '농인'),
    ('청인', '청인'),
    ]
    
    phoneNumber = models.CharField(unique=True, max_length=128)
    password = models.CharField(_('password'), max_length=128)
    last_login = models.DateTimeField(_('last login'), blank=True, null=True)
    age = models.IntegerField()
    sex = models.CharField(max_length = 150,choices=SEX)
    userType = models.CharField(max_length = 150,choices=USERTYPE)
    createdAt = models.DateTimeField(default = timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'phoneNumber'

    class Meta:
        verbose_name = '유저'
        verbose_name_plural = '유저'

class PhoneAuth(models.Model):
    phoneNumber = models.CharField(max_length = 150)
    tempNumber = models.IntegerField()
    createdAt = models.DateTimeField(default = timezone.now)
    
