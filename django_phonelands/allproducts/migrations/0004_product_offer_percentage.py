# Generated by Django 3.0.4 on 2020-03-30 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allproducts', '0003_product_recent'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='offer_percentage',
            field=models.IntegerField(blank=True, default=0),
            preserve_default=False,
        ),
    ]
