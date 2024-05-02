from rest_framework import permissions

class CanDeleteIfRegularRole(permissions.BasePermission):
    """
    Custom permission to only allow deletion of employees if their role is 'regular'.
    `admin` role can't be deleted
    """

    def has_object_permission(self, request, view, obj):
        # Safe methods are always allowed
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Allow updates for all roles
        if request.method == 'PUT':
            return True

        # Check if the role of the employee object is 'regular'
        return obj.role == 'regular'
