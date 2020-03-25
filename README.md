# Phonelands

A fullstack eCommerce webapp for selling cell phones created using Django framework.

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
