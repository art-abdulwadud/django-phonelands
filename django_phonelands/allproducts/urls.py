from django.urls import path

from . import views

urlpatterns = [
	path('', views.index, name='prodocts'),
	path('<int:product_id>', views.product, name='product')
]

