from django.contrib import admin
from graph.models import Tweet, User
# Register your models here.

class TweetAdmin(admin.ModelAdmin):
    list_display = ('tweeted', 'created')

admin.site.register(Tweet, TweetAdmin)
admin.site.register(User)
