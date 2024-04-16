const CategoryRoute= require('./CategoryRoute')
const SubCategoryRoute= require('./subCategoryRoute')
const BrandsRoute= require('./BrandRoute')
const ProductRoute= require('./ProductRoute')
const UserRoute= require('./UserRoute')
const AuthRoute= require('./AuthRoute')
const ReviewRoute= require('./ReviewRoute')
const WishlistRoute= require('./wishlistRoute')
const AddressRoute= require('./AddressesRoute')
const CouponRoute = require('./couponRoute')
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const CartRoute = require('./cartRoute')
const OrderRoute = require('./orderRoute')





const mountRoutes = (app) => {
    app.use('/api/v1/categories' , CategoryRoute)
    app.use('/api/v1/subcategories' , SubCategoryRoute)
    app.use('/api/v1/brands' , BrandsRoute)
    app.use('/api/v1/products' , ProductRoute)
    app.use('/api/v1/user' , UserRoute)
    app.use('/api/v1/auth' , AuthRoute)
    app.use('/api/v1/reviews' , ReviewRoute)
    app.use('/api/v1/wishlist' , WishlistRoute)
    app.use('/api/v1/addresses' , AddressRoute)
    app.use('/api/v1/coupon' , CouponRoute )
    app.use('/api/v1/cart' , CartRoute )
    app.use('/api/v1/order' , OrderRoute )
}

module.exports = mountRoutes