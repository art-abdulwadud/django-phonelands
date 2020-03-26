from django.db import models
from retailer.models import Retailer
from datetime import datetime

class Product (models.Model):
	retailer = models.ForeignKey(Retailer, on_delete=models.DO_NOTHING)
	title = models.CharField(max_length=255)
	screen_size = models.CharField(max_length=150)
	operating_system = models.CharField(max_length=150)
	model_number = models.CharField(max_length=150)
	price = models.DecimalField(decimal_places=2)
	batteries = models.CharField(max_length=255)
	main_photo = models.ImageField(upload_to='images/%Y/%m/%d')
	photos = models.ArrayField(models.ImageField(upload_to='images/%Y/%m/%d'))
	description = models.TextField(blank=True)
	offer = models.BooleanField(default=False)
	date_uploaded = models.DateTimeField(default=datetime.now, blank=True)

	def __str__(self):
		return self.title


