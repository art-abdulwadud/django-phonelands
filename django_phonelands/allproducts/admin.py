from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
	list_display = ('id', 'title', 'retailer', 'price', 'date_uploaded')

admin.site.register(Product, ProductAdmin)
