from django.db import models
from datetime import datetime

class Retailer(models.Model):
	name = models.CharField(max_length=255)
	category_choices = [('organization', 'organization'), ('enterprenuer', 'enterprenuer')]
	category = models.CharField(max_length=20,choices=category_choices,default='organization')
	pic = models.ImageField(upload_to='images/%Y/%m/%d')
	top_retailer = models.BooleanField(default=False)
	description = models.TextField(blank=True)
	email = models.CharField(max_length=60)
	phone = models.CharField(max_length=20)
	date_joined = models.DateTimeField(default=datetime.now, blank=True)

	def __str__(self):
		return self.name



