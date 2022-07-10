from django.shortcuts import render, redirect
import requests
from buy_nft import process
from 1inch_orders import parse


def index(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        process(request.POST)
        return redirect('/buy')

    # if a GET (or any other method) pass to return index
    else:
        pass

    # Fetches the first 100 limit orders from the 1inch API and passes the request to the process script
    # to select only the nft based orders and filter them. create a list parameters for html front end
    response = requests.get('https://limit-orders.1inch.io/v2.0/1/limit-order/all?page=1&limit=100&statuses=%5B1%2C2%2C3%5D')
    parameters = parse(response)

    return render(request, 'home.html', {'parameters': parameters})
