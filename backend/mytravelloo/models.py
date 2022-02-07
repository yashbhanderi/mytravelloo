from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE

# Models


class User(AbstractUser):
    username = models.CharField(
        max_length=50, blank=False, null=False, unique=True)
    email = models.EmailField(
        ('email address'), blank=False, null=False, unique=True)
    phone_no = models.CharField(max_length=10)
    isAgent = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'phone_no']

    def __str__(self):
        return self.username


class Customer(User):
    pass


class Agent(User):
    company_name = models.CharField(
        max_length=150, default="", null=False, blank=False)
    company_desc = models.CharField(max_length=1000, default="")


class Destination(models.Model):
    name = models.CharField(max_length=150, null=False,
                            blank=False, default="")
    state = models.CharField(
        max_length=150, null=False, blank=False, default="")
    state_desc = models.CharField(max_length=10000)
    details = models.CharField(max_length=10000)
    agent = models.ForeignKey(Agent, on_delete=CASCADE)
    agent_company_name = models.CharField(max_length=150, default="")
    agent_company_desc = models.CharField(max_length=1000, default="")
    # upload_to = Creates folder images
    # img1 = models.ImageField(
    #     upload_to='images', default="", blank=False, null=False)
    img1 = models.CharField(max_length=10000, default="",
                            blank=False, null=False)
    img2 = models.CharField(max_length=10000)
    img3 = models.CharField(max_length=10000)
    img4 = models.CharField(max_length=10000)
    price = models.IntegerField(default=0)
    seat = models.IntegerField(default=50)


class Trip(models.Model):
    trip_id = models.CharField(max_length=500)
    agent = models.ForeignKey(Agent, on_delete=CASCADE)
    customer = models.ForeignKey(Customer, on_delete=CASCADE)
    destination = models.ForeignKey(Destination, on_delete=CASCADE)
    name = models.CharField(max_length=150, default="",
                            blank=False, null=False)
    age = models.IntegerField(default=18, blank=False, null=False)
    email = models.EmailField()
    phone_no = models.BigIntegerField()
    address = models.CharField(max_length=500, default="")
    city = models.CharField(max_length=150)
    state = models.CharField(max_length=150)
    pincode = models.IntegerField(default=000000)
    date = models.DateField()
    time_of_booking = models.DateTimeField(auto_now_add=True)

    # Count Passangers
    # user_trip = Trip.objects.filter(
    # date__range=["2021-09-15", "2021-09-15"])
    # print(user_trip.count())


class Payment(models.Model):
    card_no = models.BigIntegerField(null=False, blank=False)
    cvv_no = models.IntegerField(null=False, blank=False)
    expiry_date = models.DateField(null=False, blank=False)
    name = models.CharField(max_length=150, default="")
