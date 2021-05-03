from django.utils import timezone

import os
import requests
import json

def geoCoding(location):
    geocoding_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + os.getenv('GOOGLE_APIKEY')
    geo_response = requests.get(geocoding_url)
    res = geo_response.json()
    lat = str(res['results'][0]['geometry']['location']['lat'])
    lng = str(res['results'][0]['geometry']['location']['lng'])
    print("lat : ",lat)
    print("lng : ",lng)
    return lat, lng

def openWeather(lat, lng):
    openweathermap_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +lng +"&appid=" + os.getenv('OPENWEATHER_APIKEY')
    weather_response = requests.get(openweathermap_url)
    res = weather_response.json()
    description = res['weather'][0]['main']
    temp = round(res['main']['temp'] - 273.15,2)

    print("메인",description)
    print("온도",temp)

    weather = ""
    if temp > 24:
        weather = "더움"
    elif temp > 10:
        weather = "적정"
    else :
        weather = "추움"
    weatherGroup = description + "," + weather
    return description, temp, weatherGroup

def setTimeSlot():
    currentTime = timezone.localtime().time().hour
    timeSlot = ""
    if currentTime >= 6 and currentTime < 11:
        timeSlot = "morning"
    elif currentTime >= 11 and currentTime <15:
        timeSlot = "lunch"
    elif currentTime >= 15 and currentTime < 18:
        timeSlot = "latelunch"
    elif currentTime >= 18 and currentTime < 21:
        timeSlot = "dinner"
    elif currentTime >= 21 or currentTime < 6:
        timeSlot = "midnignsnack"
    else :
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={
                'message': '시간 형식이 맞지 않습니다.',
                'time' : currentTime
                }
        )
    return timeSlot
    
