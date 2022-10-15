from crypt import methods
import sys
import json
import requests, random
from flask import Flask, request, render_template, redirect, jsonify
import country

app = Flask('__name__')


def get_weather(states):

    url = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={states}&units=metric&appid=b21a2633ddaac750a77524f91fe104e7')
    val = url.json()

    return val


def re_formated(s):
    '''
    Replace all spaces by '+'
    '''

    return s.replace(' ', '+')


def other_cities():
    ...


@app.route('/')
def index():

    return render_template('index.html')


@app.route('/locate')
def locate():

    states = request.args.get('states')
    if not states:
        return jsonify([])

    data = get_weather(re_formated(states))


    new_arr = []

    for i in range(5):
        # check if the city haas better weather
        w = get_weather(re_formated(country.all_country[random.randint(0,194)]['country']))

        if w['name']:

            new_arr.append(w)

        # if true;
        # -> GIVE NEW array with only better weather
        # then pick randomnly from those


    return render_template('locate.html', w = data, new_arr = new_arr)


