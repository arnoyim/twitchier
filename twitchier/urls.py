from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'twitchier.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'graph.views.home', name='home'),
    url(r'^register/$', 'graph.views.register', name='register'),
    url(r'tweet/$','graph.views.tweet', name='tweet'),
    url(r'top_tweet/$','graph.views.top_tweet', name='top_tweet'),
)
