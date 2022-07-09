from django.shortcuts import render, redirect
import requests
from decouple import config


def sell(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
            return redirect('/')

    # if a GET (or any other method) pass to return index
    else:
        pass

    return render(request, 'sell.html', {'api': config('OPENSEA')})


def sell_nft(request, contract, id):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
            return redirect('/')

    # if a GET (or any other method) pass to return index
    else:
        pass

    url = 'https://api.opensea.io/api/v1/asset/{}/{}/?include_orders=false'.format(contract, id)
    headers = {"X-API-KEY": config('OPENSEA')}

    response = requests.get(url, headers=headers)

    print(response.text)

    return render(request, 'sell_nft.html', {'api': config('OPENSEA')})
