from django.contrib.auth.decorators import login_required

from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

import urllib

@login_required
def index(request):
    return render(request, 'index.html', {})

def programs(request):
    json = urllib.urlopen(settings.ENDPOINT)

    return HttpResponse(json, mimetype="application/json", status=200)