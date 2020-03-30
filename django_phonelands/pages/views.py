from django.shortcuts import render
from django.http import HttpResponse
from allproducts.models import Product

def index(request):
	products = Product.objects.order_by('-date_uploaded').filter(offer=True)[:8]

	context = {
		'products': products
	}
	return render(request, 'pages/index.html', context)

def about(request):
	return render(request, 'pages/about.html')
