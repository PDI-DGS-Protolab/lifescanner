from django.contrib.auth.decorators import login_required

from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.template import Context, loader
from django.shortcuts import render_to_response
import urllib
import httplib
import json

#@login_required
def index(request):
    #tmp=programs(request)
    #print tmp
    #return render(request, 'index.html', tmp)
    return render(request, 'index.html', {})


def programs(request):
    json1 = urllib.urlopen(settings.ENDPOINT)
    #json_dumped = json.dumps(json.loads(json1.read()))

    #t=loader.get_template('index.html')
    #c = Context(json1)
    #return render_to_response('index.html', json1, content_type="application/json")
    return HttpResponse(json1, mimetype="application/json", status=200)


def suggestions(request):
    #params = '[{"epgContentId":"4369","promotedBy":"operator","suggestion":"New suggestion for 4369"}]'
    #TODO: read content from the client

    body = json.loads(request.raw_post_data)
    #params2 = json.loads(body)

    print body



   # headers = {"Content-type" : "application/json", "Accept": "application/json"}
   # conn = httplib.HTTPConnection("livescanner.pdi.tid.es")
   # conn.request("POST", "/livesc/epgcontents/suggestions", params2, headers)
    #response = conn.getresponse()
    #print response.status, response.reason
   # data = response.read()
   # conn.close()
    return HttpResponse(body, mimetype="application/json", status=200)
