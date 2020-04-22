from django.shortcuts import render, get_object_or_404
from .models import Product
from django.core.paginator import Paginator

def index(request):
	products = Product.objects.order_by('-date_uploaded')

	paginator = Paginator(products, 6)

	page = request.GET.get('page')

	paged_products = paginator.get_page(page)

	context = {
		'products': paged_products
	}
	return render(request, 'products/products.html', context)

def product(request, product_id):
	product = get_object_or_404(Product, pk=product_id)

	context = {
		'product': product
	}

	return render(request, 'products/product.html', context)


def search(request):
	products = Product.objects.order_by('-date_uploaded')

	context = {
		'products': products
	}

	return render(request, 'products/search.html', context)