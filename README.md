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
djangi-admin startproject name_of_project
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

```
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

Note: `AppnameConfig` is the module name given to the app in `apps.py` file which is within the app folder.
Open the new folder created for the app and add a method to the `views.py` file.

```
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
	return HttpResponse('<h1>My Django App</h1>')
```

Create a `urls.py` file and create a route for the view method we just created

```
from django.urls import path

from . import views

urlpatterns = [
	path('', views.index, name='index')
]
```

Back to the main `ulrs.py` file, which is in the same directory as `setting.py`, and edit it

```
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

```
'DIRS': [os.path.join(BASE_DIR, 'templates')]
```

`os.path.join` here takes in two arguments, the location/directory of the templates folder and it's name.
Now create the templates folder and add `index.html` file.

```
<h1>Home Page</h1>
```

Then edit `views.py` file

```
from django.shortcuts import render

def index(request):
	return render(request, 'index.html')
```

And that's it.

## Extending a base layout

In the temlates folder, create `base.html` file

```
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

```
{% extends 'base.html' %}

{% block content%}
	<h1>Home page</h1>
{% endblock %}

```

## Adding static files

First, create a static folder and paste/create your static files(i.e images, css, js)
Edit `setting.py` file

```
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

```
{load static}
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

```
<img src="{% static 'logo.jpg' %}" alt="logo">

<img src="{% static 'img/about.jpg' %}" alt="about">
```

Finally, if you are going to push project to github, you should go to [Gitignore](https://www.gitignore.io/), search for django and download that file to your project folder. Add the names of folders that you want to ingore when pushing(i.e venv, static). This will help you not to push two static folders to github and instead push only one of them.

## Linking to route

This is pretty straight forward. In our app `urls.py` file, we gave each path a name and that's the name we use to link to e.g

```
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

```
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

and you'll enter the postgres shell. Now create a new user

```
\password newuser
```

As soon as you enter this, it will prompt you to create a new password for this new user.
Create a database and reference it this user

```
CREATE DATABASE newdb OWNER newuser;
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

```
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

```
from django.db import models
from datetime import datetime

class Product (models.Model):
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
```

If you want to import a field from another model, it's pretty easy. Let's import

```
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
```

Note: Here, we've specified that if the `retailer` for this `product` is deleted, it should not delete the product and instead do nothing. [But there a few more options you can specify with `on_delete`](https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.ForeignKey.on_delete)
