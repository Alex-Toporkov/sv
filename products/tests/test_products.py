# products/tests/test_products.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from products.models import Product, TypeProduct, CartProduct
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import tempfile
import os


class ProductModelTest(APITestCase):
    def setUp(self):
        self.type_product = TypeProduct.objects.create(id=1, TypeName='Electronics')
        self.product = Product.objects.create(
            name='Laptop',
            image=self.create_temp_image(),
            price=999.99,
            rest=10,
            type_product=self.type_product
        )

    def create_temp_image(self):
        image = Image.new('RGB', (100, 100), color='red')  # Создаём 100x100 красный квадрат
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')  # Закройте кавычки
        image.save(temp_file.name)
        return SimpleUploadedFile(name=os.path.basename(temp_file.name), 
                                   content=open(temp_file.name, 'rb').read(), 
                                   content_type='image/jpeg')

    def test_product_creation(self):
        self.assertEqual(self.product.name, 'Laptop')
        self.assertEqual(self.product.price, 999.99)
        self.assertEqual(self.product.type_product.TypeName, 'Electronics')

    def test_str_method(self):
        self.assertEqual(str(self.product), 'Laptop - Electronics')


class ProductApiTest(APITestCase):
    def setUp(self):
        self.url = reverse('product-list')
        self.type_product = TypeProduct.objects.create(id=1, TypeName='Electronics')
        self.product = Product.objects.create(
            name='Laptop',
            image=self.create_temp_image(),
            price=999.99,
            rest=10,
            type_product=self.type_product
        )

    def create_temp_image(self):
        image = Image.new('RGB', (100, 100), color='red')  # Создаем 100x100 красный квадрат
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')  # Создаем временный файл
        image.save(temp_file.name)
        return SimpleUploadedFile(name=os.path.basename(temp_file.name), 
                                   content=open(temp_file.name, 'rb').read(), 
                                   content_type='image/jpeg')

    def test_create_product(self):
        data = {
            'name': 'Smartphone',
            'image': self.create_temp_image(),
            'price': 499.99,
            'rest': 20,
            'type_product': self.type_product.id  
        }
        response = self.client.post(self.url, data, format='multipart')
        if response.status_code != status.HTTP_201_CREATED:
            print(f"Response content: {response.content}")  # Выводим ответ на случай ошибки
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_product_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  

    def test_get_product_detail(self):
        url = reverse('product-detail', args=[self.product.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Laptop')


class CartProductApiTest(APITestCase):
    def setUp(self):
        self.url = reverse('cartproduct-list')
        self.product_type = TypeProduct.objects.create(id=1, TypeName='Electronics')
        self.product = Product.objects.create(
            name='Laptop',
            image=self.create_temp_image(),
            price=999.99,
            rest=10,
            type_product=self.product_type
        )
        self.cart_product = CartProduct.objects.create(
            product=self.product,
            description='This is a laptop',
            cost='950'
        )

    def create_temp_image(self):
        image = Image.new('RGB', (100, 100), color='red')  # Создаем 100x100 красный квадрат
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')  # Создаем временный файл
        image.save(temp_file.name)
        return SimpleUploadedFile(name=os.path.basename(temp_file.name), 
                                   content=open(temp_file.name, 'rb').read(), 
                                   content_type='image/jpeg')

    def test_create_cart_product(self):
        data = {
            'product': self.product.id,
            'description': 'New Cart Product',
            'cost': '500'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_cart_product_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
