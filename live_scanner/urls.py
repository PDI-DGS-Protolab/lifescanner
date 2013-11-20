from django.conf.urls import patterns, include, url
from django.contrib.auth.views import login, logout

from vivo.views import index, indexDev, programs, suggestions

import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    ######################################################
    # VIEWS
    ######################################################
    url(r'^$', index),

    url(r'^dev/$', indexDev),

    ######################################################
    # SERVICES
    ######################################################
    url(r'^programs/$', programs),
    url(r'^suggestions/$', suggestions),

    ######################################################
    # ACCOUNTS
    ######################################################
    (r'^accounts/login/$',  login),
    (r'^accounts/logout/$', logout),

    ######################################################
    # ADMIN
    ######################################################

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    ######################################################
    # STATIC CONTENT
    ######################################################

    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT, 'show_indexes':True}),
)
