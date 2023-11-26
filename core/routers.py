from rest_framework import routers

from core.post.viewsets import PostViewSet
from core.user.viewsets import UserViewSet
from core.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from core.worksheet.viewsets import WorksheetViewSet


router = routers.SimpleRouter()

# ##################################################################### #
# ################### AUTH                       ###################### #
# ##################################################################### #

router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')


# ##################################################################### #
# ################### USER                       ###################### #
# ##################################################################### #

router.register(r'user', UserViewSet, basename='user')

# ##################################################################### #
# ################### POST                       ###################### #
# ##################################################################### #

router.register(r'post', PostViewSet, basename='post')

urlpatterns = [
    *router.urls,
]

# ##################################################################### #
# ################### WORKSHEET                  ###################### #
# ##################################################################### #

router.register(r'worksheet', WorksheetViewSet, basename='worksheet')

urlpatterns = [
    *router.urls,
]

# ##################################################################### #
# ###################   ORC                      ###################### #
# ##################################################################### #

router.register(r'orc', OrcViewSet, basename='orc')