from django.shortcuts import render, redirect
import requests


def index(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
            return redirect('/')

    # if a GET (or any other method) pass to return index
    else:
        pass

    # # Fetches the first 100 limit orders from the 1inch API
    # response = requests.get('https://limit-orders.1inch.io/v2.0/1/limit-order/all?page=1&limit=100&statuses=%5B1%2C2%2C3%5D')
    #
    # # print json content
    # print(response.json())

    return render(request, 'home.html')

