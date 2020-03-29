from django.shortcuts import render
from .models import Product
from django.core.paginator import Paginator

def index(request):
	products = Product.objects.all()

	paginator = Paginator(products, 9)

	page = request.GET.get('page')

	paged_products = paginator.get_page(page)

	context = {
		'products': paged_products
	}
	return render(request, 'products/products.html', context)

def product(request, product_id):
	return render(request, 'products/product.html')


