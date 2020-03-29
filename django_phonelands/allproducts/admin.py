from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
	list_display = ('id', 'title', 'retailer', 'price', 'date_uploaded', 'recent', 'offer')
	list_display_links = ('id', 'title')
	list_filter = ('retailer', 'date_uploaded')
	search_fields = ('title','price')
	list_per_page = 30

admin.site.register(Product, ProductAdmin)
