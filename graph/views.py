import json
from django.core.mail import EmailMultiAlternatives
from django.db.models import Count
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils.datetime_safe import datetime
from django.views.decorators.csrf import csrf_exempt
from graph.models import Tweet
from graph.templatetags.forms import EmailUserCreationForm
from twitchier import settings
from django.core.serializers.json import DjangoJSONEncoder
from datetime import datetime, timedelta
import time
# Create your views here.
minute = datetime.now() - timedelta(seconds= 60)

# Overall you should clean up your formatting on this page, line breaks, returns, etc

@csrf_exempt
def tweet(request):

    tweeter = Tweet.objects.all()
    collection = []

    # Could write a list comprehension here to clean this up
    for tweets in tweeter:
        collection.append({
            'tweeted': tweets.tweeted,
            'created': tweets.created,})


    # I think content_type is supposed to be 'application/json'
    return HttpResponse(
                json.dumps(collection, cls=DjangoJSONEncoder),
                content_type='application.json'
           )
@csrf_exempt
def top_tweet(request):
    # Check out Django queryset's annotate for this one - Winnie also got this working if you want to ask for help
# num_tweet=Count('tweeted')).order_by('num_tweet'
    tweeter = Tweet.objects.all()
    print "what"
    collection = []

    for tweets in tweeter:
        collection.append({
            'tweeted': tweets.tweeted
            })

    return HttpResponse(
                json.dumps(collection),
                content_type='application.json'
           )



def register(request):
    if request.method == 'POST':
        form = EmailUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # user.email_user("Welcome!", "Thank you for signing up for our website.")
            text_content = 'Thank you for signing up for our website, {}'.format(user.username)
            html_content = '<h2>Thanks {} {} for signing up!</h2> <div>I hope you enjoy using our site {}</div>'.format(user.first_name, user.last_name, user.date_joined)
            msg = EmailMultiAlternatives("Welcome!", text_content, settings.DEFAULT_FROM_EMAIL, [user.email])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return redirect("/")
    else:
        form = EmailUserCreationForm()

    return render(request, "register.html", {
        'form': form,
    })
def home(request):
    return render(request, 'landing.html', )
