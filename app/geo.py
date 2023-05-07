import requests

def process(url,params):
    response = requests.get(url,params)
    response = response.json()
    return response

def get_key():
    with open ("keys/geo.txt","r") as key:
        key = key.read()
    return key

params = {
    'access_key': get_key(),
    'query': '345 Chambers Street',
    'region': 'New York',
    'limit': 1,
}

#esponse = process('http://api.positionstack.com/v1/forward', params=params)

#print(response)

params ={
    'access_key': get_key(),
    'query': '51.507822,-0.076702',
    }

#response = process('http://api.positionstack.com/v1/reverse', params=params)

#print(response)

