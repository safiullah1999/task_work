from django.shortcuts import render

# Create your views here.
from django.http.response import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view
import re, ipaddress
import json
@api_view(['GET','POST'])
def PostIP(request):
    if request.method == 'GET':
        return HttpResponse("data recieved", content_type="text/plain")
    elif request.method == 'POST':    
        data=json.loads(request.body)
        data = json.dumps(data).replace("'", '"')
        data=json.loads(data)
        forth_octet = str(data.get('ip'))
        
        result_data={"ip":"","subnet_mask":"","full_ip":""}
        result=""
        if re.search("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", data.get('ip')):
            if re.search("^([1][2][8-9]|[1][3-8][0-9]|[1][9][0-2])\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[1-9][0-9]|[0-9]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[1-9][0-9]|[0-9]?[0-9][0-9]?)$", data.get('ip')):
                char_index = len(forth_octet) - 1
                while char_index >= 0:
                    if forth_octet[char_index] == '.':
                        result = forth_octet[0:char_index+1]
                        result += '1'
                        print("result:",result)
                        break; 
                    char_index -= 1
                
                ipi = ipaddress.ip_interface(data.get('ip')+'/'+data.get('custom_value'))
                result_data["ip"]=result
                result_data["subnet_mask"]=str(ipi.netmask)
                if int(data.get('custom_value')) in range(16,25):
                    print("check", int(data.get('custom_value')) in range(16,24))
                    result_data["full_ip"]=str(result+'/'+data.get('custom_value'))
                else:
                    return HttpResponse("Subnet ID not in range.", content_type="text/plain")
                return Response(result_data)
                # return HttpResponse(result_data, content_type="application/json")
            else:
                return HttpResponse("invalid IP", content_type="text/plain")    
        else:
            return HttpResponse("invalid IP", content_type="text/plain")