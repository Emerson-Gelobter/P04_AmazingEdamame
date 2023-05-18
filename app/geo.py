import requests

def process(url,params):
    response = requests.get(url,params)
    response = response.json()
    return response

def get_key():
    with open ("keys/geo.txt","r") as key:
        key = key.read()
    return key

def get_lat_long(name, borough):
    params = {
        'access_key': get_key(),
        'query': "New York Neighborhood" + name, 
        'region': borough + "New York", 
        'limit': 1,
    }
    response = process('http://api.positionstack.com/v1/forward', params=params)
    print(name,borough,response)
    arr = []
    latitude = response['data'][0]['latitude']
    longitude = response['data'][0]['longitude']

    return latitude, longitude

#print(get_lat_long('Pelham Parkway, Morris Park & Laconia','Bronx'))

"""
params ={
    'access_key': get_key(),
    'query': '51.507822,-0.076702',
    }

#response = process('http://api.positionstack.com/v1/reverse', params=params)

#print(response)
"""
