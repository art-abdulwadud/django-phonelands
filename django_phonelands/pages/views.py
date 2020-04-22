from django.shortcuts import render
from django.http import HttpResponse
from allproducts.models import Product
from retailers.models import Retailer

def index(request):
	products = Product.objects.order_by('-date_uploaded')[:6]

	context = {
		'products': products
	}
	return render(request, 'pages/index.html', context)

def about(request):
	retailers = Retailer.objects.all()
	products = Product.objects.order_by('-date_uploaded')[:6]

	context = {
		'retailers': retailers,
		'products': products
	}
	return render(request, 'pages/about.html', context)
