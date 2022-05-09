import { Order } from "./Order.model.js";
import { User } from "./User.model.js";
import { Tag } from './Tag.model.js'
import { Product } from "./Product.model.js";
import { Category } from "./Category.model.js";
import { OrderItem } from "./Orderitem.model.js";
import { Wishlist } from "./Wishlist.model.js";
import { UserAddress } from "./UserAddress.model.js";

Order.belongsTo(User)
User.hasMany(Order)
User.hasMany(Wishlist)
User.hasMany(UserAddress)

Order.hasMany(OrderItem, { as: 'products' })


Tag.belongsToMany(Product, { through: 'product_tag' })
Product.belongsToMany(Tag, { through: 'product_tag' })


Product.belongsTo(Category)
Category.hasMany(Product)


OrderItem.belongsTo(Product)
OrderItem.belongsTo(Order)


Wishlist.belongsTo(Product)
Wishlist.belongsTo(User)


