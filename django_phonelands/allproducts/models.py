from django.db import models
from retailers.models import Retailer
from datetime import datetime
from django.contrib.postgres.fields import ArrayField

class Product (models.Model):
	retailer = models.ForeignKey(Retailer, on_delete=models.DO_NOTHING)
	title = models.CharField(max_length=255)
	screen_size = models.CharField(max_length=150)
	operating_system = models.CharField(max_length=150)
	model_number = models.CharField(max_length=150)
	price = models.FloatField()
	batteries = models.CharField(max_length=255)
	main_photo = models.ImageField(upload_to='images/%Y/%m/%d')
	photos = ArrayField(models.ImageField(upload_to='images/%Y/%m/%d'), blank=True)
	description = models.TextField(blank=True)
	offer = models.BooleanField(default=False)
	date_uploaded = models.DateTimeField(default=datetime.now, blank=True)

	def __str__(self):
		return self.title


