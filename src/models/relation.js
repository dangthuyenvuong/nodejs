import { Order } from "./Order.model.js";
import { User } from "./User.model.js";
import { Tag } from './Tag.model.js'
import { Product } from "./Product.model.js";
import { Category } from "./Category.model.js";
import { OrderItem } from "./Orderitem.model.js";
import { Wishlist } from "./Wishlist.model.js";
import { UserAddress } from "./UserAddress.model.js";
import { ChatGroup } from "./ChatGroup.model.js";
import { Message } from "./Message.model.js";

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




ChatGroup.belongsToMany(User, { as: 'users', through: 'chat_group_user' })
// ChatGroup.hasMany(User, { as: 'users' })
User.belongsToMany(ChatGroup, { as: 'chatgroup', through: 'chat_group_user' })



Message.belongsTo(User, { as: 'sender' })
Message.belongsTo(ChatGroup)
ChatGroup.hasMany(Message)