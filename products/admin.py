from django.contrib import admin
from .models import Product, CartProduct, Trading, Opers, TypeProduct

admin.site.register(Product)
admin.site.register(CartProduct)
admin.site.register(Trading)
admin.site.register(Opers)
admin.site.register(TypeProduct)
