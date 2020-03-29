from django.shortcuts import render

from .models import Product

def index(request):
	products = Product.objects.all()

	context = {
		'products': products
	}
	return render(request, 'products/products.html', context)

def product(request, product_id):
	return render(request, 'products/product.html')


