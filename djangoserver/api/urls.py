from django.urls import path, include
from .views import PostIP

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('postip', PostIP),
    
]