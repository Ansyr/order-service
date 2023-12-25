CREATE SCHEMA IF NOT EXISTS "user";
CREATE SCHEMA IF NOT EXISTS restaurant;
CREATE SCHEMA IF NOT EXISTS review;
CREATE SCHEMA IF NOT EXISTS "order";
CREATE SCHEMA IF NOT EXISTS order_detail;
CREATE SCHEMA IF NOT EXISTS product;
CREATE SCHEMA IF NOT EXISTS product_category;
CREATE SCHEMA IF NOT EXISTS product_category_mapping;
CREATE SCHEMA IF NOT EXISTS delivery;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создание таблицы Users
CREATE TABLE IF NOT EXISTS "user".users
(
    user_id       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name    VARCHAR(255)        NOT NULL,
    last_name     VARCHAR(255)        NOT NULL,
    sur_name      VARCHAR(255),
    email         VARCHAR(255) UNIQUE NOT NULL,
    phone         VARCHAR(255),
    address       VARCHAR(255),
    password_hash VARCHAR(255)        NOT NULL,
    role          VARCHAR(50)
);

-- Создание таблицы Restaurants
CREATE TABLE IF NOT EXISTS restaurant.restaurant
(
    restaurant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name          VARCHAR(255) NOT NULL,
    address       VARCHAR(255) NOT NULL,
    cuisine_type  VARCHAR(100)
);

-- Создание таблицы Reviews
CREATE TABLE IF NOT EXISTS review.review
(
    review_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id       UUID REFERENCES "user".users (user_id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES restaurant.restaurant (restaurant_id) ON DELETE CASCADE,
    title         VARCHAR(255),
    review_text   TEXT,
    rating        INT NOT NULL
);

-- Создание таблицы Orders
CREATE TABLE IF NOT EXISTS "order".order
(
    order_id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id          UUID REFERENCES "user".users (user_id) ON DELETE CASCADE,
    date_time        TIMESTAMP      NOT NULL,
    total_amount     DECIMAL(10, 2) NOT NULL,
    status           VARCHAR(100),
    delivery_address VARCHAR(255),
    restaurant_id    UUID REFERENCES restaurant.restaurant (restaurant_id)
);

-- Создание таблицы Products
CREATE TABLE IF NOT EXISTS product.product
(
    product_id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name          VARCHAR(255)   NOT NULL,
    description   TEXT,
    price         DECIMAL(10, 2) NOT NULL,
    restaurant_id UUID REFERENCES restaurant.restaurant (restaurant_id)
);

-- Создание таблицы OrderDetails
CREATE TABLE IF NOT EXISTS order_detail.order_detail
(
    order_detail_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id        UUID REFERENCES "order".order (order_id) ON DELETE CASCADE,
    product_id      UUID REFERENCES product.product (product_id) ON DELETE CASCADE,
    total_price     DECIMAL(10, 2) NOT NULL
);

-- Создание таблицы ProductCategories
CREATE TABLE IF NOT EXISTS product_category.product_category
(
    category_id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_name VARCHAR(255) NOT NULL
);

-- Создание таблицы ProductCategoryMapping
CREATE TABLE IF NOT EXISTS product_category_mapping.product_category_mapping
(
    product_id  UUID REFERENCES product.product (product_id) ON DELETE CASCADE,
    category_id UUID REFERENCES product_category.product_category (category_id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

-- Создание таблицы Delivery
CREATE TABLE IF NOT EXISTS delivery.delivery
(
    delivery_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id        UUID REFERENCES "order".order (order_id) ON DELETE SET NULL,
    courier_name    VARCHAR(255),
    courier_phone   VARCHAR(50),
    delivery_status VARCHAR(100)
);
