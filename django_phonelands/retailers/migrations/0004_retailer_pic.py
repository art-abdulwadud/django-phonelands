# Generated by Django 3.0.4 on 2020-03-26 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('retailers', '0003_auto_20200326_1249'),
    ]

    operations = [
        migrations.AddField(
            model_name='retailer',
            name='pic',
            field=models.ImageField(blank=True, upload_to='images/%Y/%m/%d'),
        ),
    ]
