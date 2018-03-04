let API = ['api', 'v1.0'], // Config API: 0 => Base URL, 1 => Version
    CONFIG_API = {
        // API Security
        __API_AUTHOR: 'CHINH_PHAM__FLY_SHOP__APPLICATION__V1.0',
        __API_KEY: 'wx0z34ajQVSm5xdhZa7ygStlAbRVnfNC',
        __API_SECRET: 'iP]Y@!_zPnxvKgy;C58#z=}D9YzS(Z',
        
        // Link API
        __link_user: API[0] + '/' + API[1] + '/user/', // USER
        __link_slide: API[0] + '/' + API[1] + '/shop/get-slide', // SLIDE
        __link_category: API[0] + '/' + API[1] + '/shop/get-category',
        __link_product: API[0] + '/' + API[1] + '/shop/get-product',
        __link_new_bill: API[0] + '/' + API[1] + '/shop/new-bill',
        __link_get_bill: API[0] + '/' + API[1] + '/shop/get-bill',

        // Link Admin
        __link_admin: '/admin-panel',

        // Link reset password
        __link_reset_password: '/auth/reset-password/?access_token=',
        __route_reset_password: '/auth/reset-password',

        // MongoDB Config
        __database_name: 'FlyShop',

        // Port app server
        __port_server: 3000, // 80 if public to IP address

        // IP adress server
        __ip_server: 'http://45.77.43.246', //45.77.43.246

        // Email app config
        __gmail_user: 'flyshopvietnam@gmail.com',
        __gmail_pass: 'Zmx5c2hvcA28',
        __gmail_subject: '[FLY SHOP] KHÔI PHỤC MẬT KHẨU TÀI KHOẢN!',
        __gmail_subject_done: '[FLY SHOP] THAY ĐỔI MẬT KHẨU THÀNH CÔNG!'
    }
    
exports.CONFIG_API = CONFIG_API