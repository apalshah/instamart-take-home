from django.db import models

class Employee(models.Model):
    # Define the fields for the Employee model
    id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('regular', 'Regular'),
    )
    role = models.CharField(max_length=7, choices=ROLE_CHOICES)

    def __str__(self):
        # This defines what will be shown when the model instance is printed
        return f"{self.firstName} {self.lastName} ({self.role})"

# Optional: Adding verbose names to fields
    class Meta:
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'
