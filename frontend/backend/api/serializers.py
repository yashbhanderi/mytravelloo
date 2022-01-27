from django.db.models import fields
from rest_framework import serializers
from mytravelloo.models import Customer, Agent, User, Destination, Trip
from django.contrib.auth.hashers import make_password

# -----------------------------------------------------------------------


class CustomerRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = ('email', 'username', 'first_name',
                  'last_name', 'phone_no', 'password', 'isAgent')

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Customer.objects.create(**validated_data)


class AgentRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Agent
        fields = ('email', 'username', 'first_name', 'last_name',
                  'company_name', 'company_desc', 'phone_no', 'password', 'isAgent')

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Agent.objects.create(**validated_data)


class DestinationListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Destination
        fields = "__all__"


class DestinationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Destination
        fields = "__all__"


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = "__all__"
