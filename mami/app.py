import sys
import requests
from flask import Flask, request, render_template, redirect

app = Flask('__name__')


def get_weather(states):

    url = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={states}&units=metric&appid=b21a2633ddaac750a77524f91fe104e7')
    val = url.json()

    return val


def re_formated(s, type):
    '''
    Replace all spaces by '&' or by '+'
    '''
    if type == 'api':
        return s.replace(' ', '&')

    return s.replace(' ', '+')


@app.route('/')
def index():

    states = 'new york'
    h = get_weather(re_formated(states, 'api'))

    google_search = f"https://www.google.com/search?q={re_formated(h['weather'][0]['description'], 'google')}"

    return redirect(google_search)


