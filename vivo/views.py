from django.contrib.auth.decorators import login_required

from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render_to_response
import urllib
import httplib
import json

#@login_required
def index(request):
    #tmp=programs(request)
    #print tmp
    #return render(request, 'index.html', tmp)
    content = {
        'versionApp' : 'liveScannerApp',
        'reference1' : '',
        'reference2' : '',
    }
    return render(request, 'index.html', content)
    #return render_to_response('index.html', content)

#@login_required
def indexDev(request):
    #tmp=programs(request)
    #print tmp
    #return render(request, 'index.html', tmp)
    content = {
        'versionApp' : 'liveScannerDev',
        'reference1' : '../static/js/liveScannerDev.js',
        'reference2' : '../static/js/data.js',
    }
    return render_to_response('index.html', content)


def programs(request):
   
    json1 = urllib.urlopen(settings.ENDPOINT)
    #json_dumped = json.dumps(json.loads(json1.read()))

    #t=loader.get_template('index.html')
    #c = Context(json1)
    #return render_to_response('index.html', json1, content_type="application/json")
    return HttpResponse(json1, mimetype="application/json", status=200)

@csrf_exempt
def suggestions(request):
       #print request
       # return HttpResponse(data, mimetype="application/json", status=200)
    params = request.body
    headers = {"Content-type" : "application/json", "Accept": "application/json"}
    conn = httplib.HTTPConnection("livescanner.pdi.tid.es")
    conn.request("POST", "/livesc/epgcontents/suggestions", params, headers)
    response = conn.getresponse()
    print response.status, response.reason
    data = response.read()
    conn.close()
    print data
    return HttpResponse(data, mimetype="application/json", status=200)
