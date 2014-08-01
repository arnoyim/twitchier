from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.datetime_safe import datetime



# Create your models here.



class User(AbstractUser):
    phone = models.CharField(max_length=12, help_text="Format should be: 650-111-2222")

class Tweet(models.Model):
    tweeted = models.CharField(max_length=200)
    created = models.DateTimeField(default=datetime.now, blank=True)

    def __unicode__(self):
        return u'{}'.format(self.tweeted)




