from crypt import methods
import sys, json, csv, requests, random
from flask import Flask, request, render_template, jsonify
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


def get_message(type):
    '''
    get random message depending on the type of weather we have
    '''
    a = list()
    b = list()
    with open(f'./pretentious/{type}.csv') as file:
        for item in file:
            a.append(item.strip())


    with open(f'./slang/{type}.csv') as file:
        for item in file:
            b.append(item.strip())

    return {'pretentious': a[random.randint(0, len(a) - 1)], 'slang':b[random.randint(0, len(b) - 1)]}


def compare_message(country, case):

    hot_messages = [f"It is so much warmer in {country}, why don't you Go there?", f"The weather so nice in {country}!", f"If the word perfect was a place it would be {country}", f"Weather in {country} is actually better."]
    cold_messages = [f"It is much more fresher in {country}, Book a flight now!", f"I'd rather be in {country} if I were You.", f"You wishe you were in {country}, don't you?", f"You could have been in {country} tho, having nice time"]
    
    if case == 'hot':
        return hot_messages[random.randint(0, len(hot_messages) - 1)] 

    return cold_messages[random.randint(0, len(cold_messages) - 1)]


def w_type(temp):
    if 23 < temp:
        return 'hot'

    elif 18 <= temp <= 23:
        return 'nice'

    elif temp < 18:
        return 'cold'


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

    # give only
    for i in range(5):
        w = get_weather(re_formated(country.all_country[random.randint(0,194)]['country']))

        other_countries.append(w)


    to_render = list()


    for city in other_countries:

        type = w_type(city['main']['temp'])

        if city['main']['temp'] > data['main']['temp']:
            weather = {
                'country_name': city['name'],
                'message': compare_message(city['name'], 'hot'),
                'flag_img': f"https://countryflagsapi.com/png/{re_formated(city['name'])}",
                'details_link': f"https://en.wikipedia.org/wiki/{re_formated(city['name'])}"
            }
            to_render.append(weather)

        else:
            weather = {
                'country_name': city['name'],
                'message': compare_message(city['name'], 'cold'),
                'flag_img': f"https://countryflagsapi.com/png/{re_formated(city['name'])}",
                'details_link': f"https://en.wikipedia.org/wiki/{re_formated(city['name'])}"
            }
            to_render.append(weather)


    final_render = list()

    data_details = {
        'country_name': data['name'],
        'message': get_message(type),
        'weather': data['weather'][0]['description']
    }

    all_details = {
        'actual_location': data_details,
        'other_countries': to_render
    }           

    final_render.append(all_details)

    return jsonify(final_render)
