from django.db import models

class TypeProduct(models.Model):
    id = models.IntegerField(primary_key=True)  # Поле для id, не автоинкрементное
    TypeName = models.CharField(max_length=100)  # Поле для хранения названия типа продукта

    def __str__(self):
        return self.TypeName  # Возвращаем название типа продукта

class Product(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='products/images/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rest = models.IntegerField()
    type_product = models.ForeignKey('TypeProduct', on_delete=models.CASCADE, null=True)  # Связь с TypeProduct

    def __str__(self):
        return f"{self.name} - {self.type_product}"  # Возвращаем название продукта и его тип

class CartProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_products')  # Установите связь с Product
    description = models.TextField()  # Описание товара
    cost = models.TextField(blank=True, null=True) # Себестоимость
    

    def __str__(self):
        return f"CartProduct {self.id} - Product: {self.product.name}"  # Возвращаем id и название связанного продукта

class Trading(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    oper = models.IntegerField()
    amount = models.IntegerField()

class Opers(models.Model):
    oper_name = models.CharField(max_length=100)
