# Generated by Django 3.2 on 2021-05-22 04:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='name',
            new_name='firstname',
        ),
        migrations.AddField(
            model_name='user',
            name='lastname',
            field=models.CharField(blank=True, default='이름을 설정하지 않았습니다', max_length=15, null=True),
        ),
    ]
