from django.conf.urls import patterns, include, url

import settings

from vivo.views import index

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    ######################################################
    # VIEWS
    ######################################################
    url(r'^$', index),

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
