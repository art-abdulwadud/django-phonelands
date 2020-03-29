from django.contrib import admin
from .models import Retailer

class RetailerAdmin(admin.ModelAdmin):
	list_display = ('id', 'name', 'email', 'phone', 'date_joined')
	list_display_links = ('id', 'name')
	list_filter = ('name', 'date_joined')
	search_fields = ('name', 'phone')

admin.site.register(Retailer, RetailerAdmin)
