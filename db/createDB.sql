CREATE TABLE promotion_categories (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  KEY promotion_categories_id_IDX (id) USING BTREE
); 


CREATE TABLE promotions (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  description text,
  category_id int NOT NULL,
  PRIMARY KEY (id),
  KEY promotion_id_IDX (id) USING BTREE,
  KEY promotions_category_id_IDX (category_id) USING BTREE,
  CONSTRAINT FK_PromotionCategory FOREIGN KEY (category_id) REFERENCES promotion_categories (id)
) ;

CREATE TABLE promotion_images (
  id int NOT NULL AUTO_INCREMENT,
  promotion_id int DEFAULT NULL,
  image_url text NOT NULL,
  PRIMARY KEY (id),
  KEY promotion_image_id_IDX (id) USING BTREE,
  KEY promotion_images_promotion_id_IDX (promotion_id) USING BTREE,
  CONSTRAINT FK_PromotionImage FOREIGN KEY (promotion_id) REFERENCES promotions (id)
) ;

CREATE TABLE promotion_sub_categories (
  category_id int NOT NULL,
  parent_category_id int NOT NULL,
  PRIMARY KEY (category_id,parent_category_id),
  CONSTRAINT sub_category_FK FOREIGN KEY (category_id) REFERENCES promotion_categories (id)
);


INSERT INTO promotion_categories
(id, name)
VALUES(22, 'Top Cosmetics');
INSERT INTO promotion_categories
(id, name)
VALUES(23, 'Editor’s Favorite Housewares');
INSERT INTO promotion_categories
(id, name)
VALUES(24, 'Top 100 in the Supermarket');
INSERT INTO promotion_categories
(id, name)
VALUES(25, 'Today Picks');
INSERT INTO promotion_categories
(id, name)
VALUES(26, 'All Meats');
INSERT INTO promotion_categories
(id, name)
VALUES(27, 'Soft Drinks');
INSERT INTO promotion_categories
(id, name)
VALUES(28, 'Latest Chairs');
INSERT INTO promotion_categories
(id, name)
VALUES(29, 'Colorful Tables');
INSERT INTO promotion_categories
(id, name)
VALUES(30, 'Latest Utensils');
INSERT INTO promotion_categories
(id, name)
VALUES(31, 'Top in Japan');
INSERT INTO promotion_categories
(id, name)
VALUES(32, 'Top in Korea');
INSERT INTO promotion_categories
(id, name)
VALUES(33, 'Top in US');
INSERT INTO promotion_categories
(id, name)
VALUES(34, 'TEST in us');
INSERT INTO promotion_categories
(id, name)
VALUES(35, 'TEST in us');
INSERT INTO promotion_categories
(id, name)
VALUES(36, 'TEST in us');


INSERT INTO promotion_sub_categories
(category_id, parent_category_id)
VALUES(26, 24);
INSERT INTO promotion_sub_categories
(category_id, parent_category_id)
VALUES(27, 24);
INSERT INTO promotion_sub_categories
(category_id, parent_category_id)
VALUES(28, 23);
INSERT INTO promotion_sub_categories
(category_id, parent_category_id)
VALUES(29, 23);
INSERT INTO promotion_sub_categories
(category_id, parent_category_id)
VALUES(30, 23);
INSERT INTO promotion_sub_categories
(category_id, parent_category_id)
VALUES(31, 22);
INSERT INTO promotion_sub_categories
(category_id, parent_category_id)
VALUES(32, 22);
INSERT INTO promotion_sub_categories
(category_id, parent_category_id)
VALUES(33, 22);

INSERT INTO promotions
(id, name, description, category_id)
VALUES(67, 'testPromotion 1', '<div><br>this is test promotion product</div>', 22);
INSERT INTO promotions
(id, name, description, category_id)
VALUES(70, 'testPromotion 1', '<div><br>this is test promotion product</div>', 22);
INSERT INTO promotions
(id, name, description, category_id)
VALUES(71, 'testPromotion 1', '<div><br>this is test promotion product</div>', 22);
INSERT INTO promotions
(id, name, description, category_id)
VALUES(72, 'testPromotion 1', '<div><br>this is test promotion product</div>', 22);
INSERT INTO promotions
(id, name, description, category_id)
VALUES(75, 'testPromotion 1', '<div><br>this is test promotion product</div>', 22);


INSERT INTO promotion_images
(id, promotion_id, image_url)
VALUES(34, 72, 'http://localhost:3000/assets/123.jpg');
INSERT INTO promotion_images
(id, promotion_id, image_url)
VALUES(35, 72, 'http://localhost:3000/assets/456.jpg');
INSERT INTO promotion_images
(id, promotion_id, image_url)
VALUES(36, 75, 'http://localhost:3000/assets/123.jpg');
INSERT INTO promotion_images
(id, promotion_id, image_url)
VALUES(37, 75, 'http://localhost:3000/assets/456.jpg');



ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 
flush privileges;

