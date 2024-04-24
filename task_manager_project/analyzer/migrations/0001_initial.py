# Generated by Django 5.0.4 on 2024-04-24 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('node', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Analyzer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('type', models.IntegerField(choices=[(0, 'pe'), (1, 'doc'), (2, 'script')])),
                ('nodes', models.ManyToManyField(related_name='analyzers', to='node.node')),
            ],
        ),
    ]