# Creating a fullstack webapp with Django Framework

A guide for creating a fullstack webapp using Django framework and PostreSQL.

## Getting Started

Create a folder. Open the terminal and change directory to our folder.
For creating a virtual enviroment, type this in the terminal(Using Ubuntu)

```
python3 -m venv venv
```

Then, activate envirmoment

```
source venv/bin/activate
```

Install Django

```
pip install django
```

Create a django project

```
django-admin startproject name_of_project
```

Run django server

```
python manage.py runserver
```

Create an app within our django project

```
python manage.py startapp appname
```

Note: Always remember to add any app you create to your `settings.py` file.

```python
# Application definition

INSTALLED_APPS = [
    'appname.apps.AppnameConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

`AppnameConfig` is the module name given to the app in `apps.py` file which is within the app folder.
Open the new folder created for the app and add a method to the `views.py` file.

```python
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
	return HttpResponse('<h1>My Django App</h1>')
```

Create a `urls.py` file and create a route for the view method we just created

```python
from django.urls import path

from . import views

urlpatterns = [
	path('', views.index, name='index')
]
```

Back to the main `ulrs.py` file, which is in the same directory as `setting.py`, and edit it

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
	path('', include('pages.urls')),
    path('admin/', admin.site.urls),
]
```

Note: `include` has to be imported

## Adding templates

Go to `setting.py` and in the `TEMPLATES`, edit `DIRS`

```python
'DIRS': [os.path.join(BASE_DIR, 'templates')]
```

`os.path.join` here takes in two arguments, the location/directory of the templates folder and it's name.
Now create the templates folder and add `index.html` file.

```
<h1>Home Page</h1>
```

Then edit `views.py` file

```python
from django.shortcuts import render

def index(request):
	return render(request, 'index.html')
```

And that's it.

## Extending a base layout

In the temlates folder, create `base.html` file

```xml
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>My Title</title>
	</head>
	<body>
		{% block content %} {% endblock %}
	</body>
</html>

```

Back in the `index.html` file

```xml
{% extends 'base.html' %}

{% block content%}
	<h1>Home page</h1>
{% endblock %}

```

## Adding static files

First, create a static folder and paste/create your static files(i.e images, css, js)
Edit `setting.py` file

```python
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'name_of_project/static')
]
```

Note: `STATICFILES_DIRS` setting should not contain the `STATIC_ROOT` setting

Save and type this in the terminal

```
python manage.py collectstatic
```

In `base.html`, load your static files

```xml
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Base</title>
	<link rel="stylesheet" href="{% static 'css/style.css' %}" />
</head>
<body>

</body>
</html>
```

same thing for images

```xml
<img src="{% static 'logo.jpg' %}" alt="logo">

```

Finally, if you are going to push project to github, you should go to [Gitignore](https://www.gitignore.io/), search for django and download that file to your project folder. Add the names of folders that you want to ingore when pushing(i.e venv, static). This will help you not to push two static folders to github and instead push only one of them.

## Setting Background Image in CSS

Change directory to '/static/'

```
background-image: url(/static/img/backgrounds/bg4.jpg);
```

## Linking to route

This is pretty straight forward. In our app `urls.py` file, we gave each path a name and that's the name we use to link to e.g

```python
from django.urls import path

from . import views

urlpatterns = [
	path('', views.index, name='index')
]
```

```
<a href="{% url 'index' %}"></a>
```

## Using conditions to interchange classes

For example, let's say you want to give the class `active` to a html element depending on the page you are on, you can use an if statement within the `class` attribute. e.g

```xml
<ul class="navlist" id="nav">
	<li class="navitem">
		<a
			href="{% url 'index' %}"
			class="navlink link medium-text {% if '/' == request.path %} active {% endif %}"
			>Home</a
		>
	</li>
	<li class="navitem">
		<a
			href="{% url 'about' %}"
			class="navlink link medium-text {% if '/about' == request.path %} active {% endif %}"
			>About</a
		>
	</li>
</ul>
```

## Getting started with Posgresql Database on Linux(Ubuntu)

First, install through terminal

```
sudo apt-get install postgresql postgresql-contrib
```

Then type

```
sudo -u postgres psql
```

and you'll enter the postgres shell. Now create a new password

```
\password postgres
```

As soon as you enter this, it will prompt you to create a new password.
Create a database

```
CREATE DATABASE newdb;
```

Note: Remember to end this statement with a semi-colon

To quit postgres shell, type

```
\q
```

Preferably, you can create a new user and create databases refenced to it

```
CREATE USER myusername WITH PASSWORD 'mypassword';
```

And then create database

```
CREATE DATABASE mydatabase OWNER myusername;
```

Grant all privileges

```
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myusername;
```

## Setting up pgAdmin III

Go to `Ubuntu Software` app and search for pgadmin and install it.

![pgadmin1](https://user-images.githubusercontent.com/60689731/77547272-0a11c600-6ebe-11ea-92fa-e7a7e595e1c2.png)

Add server

![pgadmin2](https://user-images.githubusercontent.com/60689731/77548505-b1dbc380-6ebf-11ea-93fb-1a570980cf61.png)

Fill in the details of the user you just created

![pgadmin3](https://user-images.githubusercontent.com/60689731/77550130-c4ef9300-6ec1-11ea-9f56-9776da98d772.png)

You should now be able to see the database you created and more. In my case:

![pgadmin4](https://user-images.githubusercontent.com/60689731/77549469-edc35880-6ec0-11ea-8d28-c9e5d8999d48.png)

## Setting up postgres in Django

Note: Install this package if it's not already installed. You can find out if it's installed by typing `pip list`

```
pip install psycopg2-binary
```

Edit `settings.py` file in the `DATABASES` section

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',
        'USER': 'myusername',
        'PASSWORD': 'mypassword',
        'HOST': 'localhost'
    }
}
```

So far, whenever you run the server, there's always an error message warning you that you have unapplied migrations right? To fix that, quit the server and run this

```
python manage.py migrate
```

Migrations in Django generate changes you make to your models (adding a field, deleting a model, etc.) into your database schema.

## Setting up schemas

The word `schema` here basically means a skeleton structure that represents the logical view of the entire database. Whenever you create an app, within that app's folder is a `models.py` file and that's where our database schema for that app should be created.
e.g

```python
from django.db import models
from datetime import datetime
from django.contrib.postgres.fields import ArrayField

class Product (models.Model):
	title = models.CharField(max_length=255)
	screen_size = models.CharField(max_length=150)
	operating_system = models.CharField(max_length=150)
	model_number = models.CharField(max_length=150)
	price = models.DecimalField(decimal_places=2)
	batteries = models.CharField(max_length=255)
	main_photo = models.ImageField(upload_to='images/%Y/%m/%d')
	arrays_if_any = ArrayField(models.ImageField(upload_to='images/%Y/%m/%d'))
	description = models.TextField(blank=True)
	offer = models.BooleanField(default=False)
	date_uploaded = models.DateTimeField(default=datetime.now, blank=True)

	def __str__(self):
		return self.title
```

If you want to import a field from another model, it's pretty easy. Let's import

```python
from django.db import models
from retailer.models import Retailer
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
	arrays_if_any = ArrayField(models.CharField(max_length=150))
	description = models.TextField(blank=True)
	offer = models.BooleanField(default=False)
	date_uploaded = models.DateTimeField(default=datetime.now, blank=True)

	def __str__(self):
		return self.title
```

Note: Here, we've specified that if the `retailer` for this `product` is deleted, it should not delete the product and instead do nothing. But there are a few more options you can specify with `on_delete` [here](https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.ForeignKey.on_delete)

Note: The ArrayField has been import from `django.contrib.postgres.fields`

After creating them, now make migrations

```
python manage.py makemigrations
```

Note: Before making migrations, if you have used `ImageField`, like in this case then you have to instal `Pillow` otherwise you'll get an error

```
pip install Pillow
```

After running `makemigrations`, a new file is created within the migrations folder in the app folder. Now that the migrations are ready, migrate

```
python manage.py migrate
```

This will now add this table/tables to the database.

To set up the folder where the images are to be uploaded, set up root and url in `settings.py` file

```python
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
```

And then edit `urls.py` file in the same folder as `settings.py` file

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	path('', include('pages.urls')),
	path('products/', include('allproducts.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

## Setting up Admin

In the url section, type admin

![url](https://user-images.githubusercontent.com/60689731/77644793-b01f0800-6f72-11ea-9e68-2684621d712b.png)

you'll be directed to the admin login page

![admin login](https://user-images.githubusercontent.com/60689731/77645065-291e5f80-6f73-11ea-9359-2e770099ea20.png)

To log in, first create a super user using the terminal

```
python manage.py createsuperuser
```

Now use your new username and password to login back at the admin page

## Register your apps

After loggin in, you'll see something like this

![site administration(1)](https://user-images.githubusercontent.com/60689731/77647887-44d83480-6f78-11ea-8f1f-19021d3e684c.png)

To register your app/s, edit `admin.py` file in the app folder.
e.g Assuming the name of the model created in `model.py` file in the folder of that app is `Product`

```python
from django.contrib import admin
from .models import Product

admin.site.register(Product)

```

Back at the admin page, refresh and you should see your app/s

![site administration](https://user-images.githubusercontent.com/60689731/77647675-e3b06100-6f77-11ea-85bf-56f599a0eb7b.png)

## Adding Data

In this project, i have created products and retailers models. Now am going add data to the database through
`admin` page. Click the registered apps and add new data. I started with the retailer since every product must belong to a retailer.

![adding retailer(1)](https://user-images.githubusercontent.com/60689731/77662161-9094d900-6f8c-11ea-8886-91226adf3fca.png)

When done filling the details, click save.

![added retailer](https://user-images.githubusercontent.com/60689731/77662461-ef5a5280-6f8c-11ea-8f83-39bf0b496116.png)

Now that the retailers are available, when adding a product, the list of retailers will automatically be generated.

## Customizing Admin Page

Currently, the navbar is not customized

![now navbar](https://user-images.githubusercontent.com/60689731/77842380-0b7f0f00-719a-11ea-904e-df297189ac5b.png)

In the templates folder, create a folder named `admin`. Within it, create a file named `base_site.html`

```xml
{% extend 'admin/base.html' %}
{% load static %}

{% block branding %}
	<h1>Whatever</h1>
{% endblock %}

```

Now...

![navbar after](https://user-images.githubusercontent.com/60689731/77842456-040c3580-719b-11ea-8f2b-d070e0dc8a99.png)

For adding custom css

```
{% block extrastyle %}
<link rel="stylesheet" href="{% static 'css/mystyles.css' %}" />
{% endblock %}
```

You can choose which fields appear for the data which is being displayed. Currently...

![current table](https://user-images.githubusercontent.com/60689731/77842974-302ab500-71a1-11ea-91f4-c5ebea7f1c27.png)

Open `admin.py` file and add...

```python
from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
	list_display = ('id', 'title', 'retailer', 'price', 'date_uploaded')
	list_display_links = ('id', 'title')

admin.site.register(Product, ProductAdmin)
```

In `list_display`, I just selected all the fields I want to see. After I save this, I get...

![customized table](https://user-images.githubusercontent.com/60689731/77843065-176ecf00-71a2-11ea-8f17-c955193e79ce.png)

for filtering, use `list_filter`

```python
from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
	list_display = ('id', 'title', 'retailer', 'price', 'date_uploaded')
	list_display_links = ('id', 'title')
	list_filter = ('retailer', 'date_uploaded')

admin.site.register(Product, ProductAdmin)
```

There are more things you can do to customize your admin page [here](https://docs.djangoproject.com/en/3.0/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display)

## Fetch and display data

In `view.py` file, import models from `models.py` file and store all its objects into a variable. Add that varibale to the context dictionary

```python
from django.shortcuts import render

from .models import Product

def index(request):
	products = Product.objects.all()

	context = {
		'products': products
	}
	return render(request, 'products/products.html', context)

def product(request):
	return render(request, 'products/product.html')
```

In HTML

```xml
<section class="product-list">
	{% if products %}
	<h1 class="heading center pt-3 pb-3" id="products">All Products</h1>
	<div class="card-wrapper">
		{% for product in products %}

		<div class="card">
			<div class="card-img-wrapper">
				<img src="{{ product.main_pic.url }}" alt="" class="card-img" />
			</div>
			<div class="card-info ml-2 pb-2">
				<h1 class="medium-text">{{ product.title }}</h1>
				<p class="small-text">$ {{ product.price }}</p>
				<a href="{% url 'product' product.id %}" class="link btns btns-light medium-text">More</a>
			</div>
		</div>

		{% endfor %}
	</div>
	{% else %}
	<span class="medium-text">0 Products</span>
	{% endif %}
</section>
```

## Pagination

Paginator basically helps us to split the displaying data into different pages depending on how many they are.

```python
from django.shortcuts import render
from django.core.paginator import Paginator
from .models import Product

def index(request):
	products = Product.objects.all()

	paginator = Paginator(products, 5)

	page = request.GET.get('page')

	paged_products = paginator.get_page(page)

	context = {
		'products': paged_products
	}
	return render(request, 'products/products.html', context)

def product(request):
	return render(request, 'products/product.html')
```

In this case, only 5 products will be displayed in every page.

To link to the previous page, in my case,

```xml
{% if products.has_other_pages %}
	<ul class="product-page-list">
		{% if products.has_previous %}
		<li class="product-page-items prev-page">
			<a href="?page={{products.previous_page_number}}" class="link"
				><i class="material-icons">chevron_left</i></a
			>
		</li>
		{% endif %}
	</ul>
{% endif %}
```

To link to the next page,

```xml
{% if products.has_next %}
	<li class="product-page-items prev-page">
		<a href="?page={{products.next_page_number}}" class="link"
			><i class="material-icons">chevron_right</i></a
		>
	</li>
{% endif %}
```

To create links for each page that's available

```xml
{% for page_index in products.paginator.page_range %}
	{% if products.number == page_index %}
		<li class="product-page-items active-page"><a class="link">{{ page_index }}</a></li>
	{% else %}
		<li class="product-page-items"><a href="?page={{ page_index }}" class="link">{{ page_index }}</a></li>
	{% endif %}
{% endfor %}
```

Find more on pagination [here](https://docs.djangoproject.com/en/3.0/topics/pagination/)

## Sort displaying data

This is pretty simple

Instead of

```python
products = Product.objects.all()
```

Use `order_by()`

```python
products = Product.objects.order_by('date_uploaded')
```

For more information on `order_by()`, [click here](https://docs.djangoproject.com/en/3.0/ref/models/querysets/#order-by)

## Importing a model from another app

Am importing the `Product` model from `allproducts` app to `pages` app. Remember, the `Prodcut` model is in `models.py` file in `allproducts` folder

```python
from allproducts.models import Product
```
