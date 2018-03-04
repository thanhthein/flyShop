# GRADUATION-PROJECT-FLYSHOP-SERVER
- API-KEY: wx0z34ajQVSm5xdhZa7ygStlAbRVnfNC
- API-SECRET: iP]Y@!_zPnxvKgy;C58#z=}D9YzS(Z
- API-AUTHOR: CHINH_PHAM__FLY_SHOP__APPLICATION__V1.0
--------------------------------------------------------------------------------------------
# Users
--------------------------------------------------------------------------------------------
Method POST: http://localhost:3000/api/v1.0/user/forgot-password
    - Email
--------------------------------------------------------------------------------------------
Method POST: http://localhost:3000/api/v1.0/user/register (Created: AccessToken)
    - FirstName
    - LastName
    - Email
    - Phone
    - DayOfBirth
    - Password
    - AccountType: personal/business
--------------------------------------------------------------------------------------------
Method POST: http://localhost:3000/api/v1.0/user/change-password/?access_token= (GET: ?access_token)
    - _id
    - Password
--------------------------------------------------------------------------------------------
Method POST: http://localhost:3000/api/v1.0/user/login
    - Email
    - Password
--------------------------------------------------------------------------------------------
Method POST: http://localhost:3000/api/v1.0/user/update-infomartion/?access_token= (GET: ?access_token)
    - _id
    - FirstName
    - Email
    - Phone
    - DayOfBirth
    - Address
    - Introduce
    - Company
    - Facebook
--------------------------------------------------------------------------------------------

// Check session user if login success
session_user = (permission) => {
    if(permission != null) {
        console.log(true)
    }else {
        console.log(false)
    }
}
__check_header_access_token(session_user, req.query['access_token'])
// End check session
--------------------------------------------------------------------------------------------