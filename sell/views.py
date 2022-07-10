from django.shortcuts import render, redirect
import requests
from decouple import config
from sell_nft import process


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
        process(request.POST)
        return redirect('/buy/')

    # if a GET (or any other method) pass to return index
    else:
        pass

    url = 'https://api.opensea.io/api/v1/asset/{}/{}/?include_orders=false'.format(contract, id)
    headers = {"X-API-KEY": config('OPENSEA')}
    response = requests.get(url, headers=headers).json()

    image_url = response['image_url']
    title = response['name']
    description = response['description']

    return render(request, 'sell_nft.html', {'api': config('OPENSEA'), 'image_url': image_url, 'title': title,
                                             'description': description, 'contract': contract, 'id': id})
