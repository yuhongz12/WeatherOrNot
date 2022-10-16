from crypt import methods
import sys
import json
import requests, random
from flask import Flask, request, render_template, redirect, jsonify
import country

app = Flask('__name__')


def get_weather(states):

    '''
    get the weathers like by states/city/country
    '''

    url = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={states}&units=metric&appid=552ca6c9da65ef5c52f9661ce82312bd')
    val = url.json()

    return val


def re_formated(s):
    '''
    Replace all spaces by '+'
    '''

    return s.replace(' ', '+')



@app.route('/')
def index():

    return render_template('index.html')


@app.route('/locate')
def locate():

    states = request.args.get('states')
    if not states:
        return jsonify([])

    data = get_weather(re_formated(states))

    other_countries = []

    # link
    # https://en.wikipedia.org/wiki/{country_name}

    # flag
    # https://countryflagsapi.com/png/{country_name}

    # give only
    for i in range(5):
        w = get_weather(re_formated(country.all_country[random.randint(0,194)]['country']))

        other_countries.append(w)


    # FECTCH
    # data['name']
    # data['main']['temp']

    to_render = list()


    for items in data:
        for city in other_countries:
            if city['main']['temp'] > items['temperature']:
                weather = {
                    'country_name': city['name'],
                    'message': 'It is much more warm',
                    'flag_img': f"https://countryflagsapi.com/png/{re_formated(city['name'])}",
                    'details_link': f"https://en.wikipedia.org/wiki/{re_formated(city['name'])}"
                }
                to_render.append(weather)

            else:
                weather = {
                    'country_name': city['name'],
                    'message': 'It is much more fresher',
                    'flag_img': f"https://countryflagsapi.com/png/{re_formated(city['name'])}",
                    'details_link': f"https://en.wikipedia.org/wiki/{re_formated(city['name'])}"
                }
                to_render.append(weather)
                


    return jsonify(to_render)


