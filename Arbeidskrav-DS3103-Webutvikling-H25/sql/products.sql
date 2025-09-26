-- Create a database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `ProductDB`;

-- Select it for use
USE `ProductDB`;

-- Now you can drop or create tables
DROP TABLE IF EXISTS `Products`;

-- Create Products table
CREATE TABLE `Products` (
  `ProductID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NOT NULL DEFAULT '',
  `Description` TEXT NOT NULL,  -- remove DEFAULT
  `Price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `ImageURL` VARCHAR(255) NOT NULL DEFAULT '',
  `StockQuantity` INT NOT NULL DEFAULT 0,
  `CreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Insert 12 example meat products
INSERT INTO `Products` (`Name`, `Description`, `Price`, `ImageURL`, `StockQuantity`)
VALUES
-- Cow products
('Beef Steak', 'Premium beef steak, perfect for grilling', 25.00, 'https://example.com/img/beef_steak.jpg', 50),
('Ground Beef', 'Freshly ground beef, 500g pack', 10.00, 'https://example.com/img/ground_beef.jpg', 80),
('Ribeye Roast', 'Juicy ribeye roast, ideal for roasting', 30.00, 'https://example.com/img/ribeye_roast.jpg', 20),
('Beef Jerky', 'Spicy beef jerky, high protein snack', 8.00, 'https://example.com/img/beef_jerky.jpg', 100),

-- Exclusive items
('Wagyu Beef', 'Premium Japanese Wagyu beef, very tender', 120.00, 'https://example.com/img/wagyu.jpg', 10),
('Kobe Beef Steak', 'Exclusive Kobe beef, limited stock', 150.00, 'https://example.com/img/kobe.jpg', 5),
('Smoked Venison', 'Gourmet smoked venison, hand-prepared', 60.00, 'https://example.com/img/smoked_venison.jpg', 15),
('Truffle Pork Sausage', 'Pork sausage infused with truffles', 25.00, 'https://example.com/img/truffle_pork_sausage.jpg', 25),

-- Other random meat products
('Chicken Breast', 'Boneless skinless chicken breast, 1kg', 12.00, 'https://example.com/img/chicken_breast.jpg', 70),
('Pork Chops', 'Fresh pork chops, 2-pack', 15.00, 'https://example.com/img/pork_chops.jpg', 40),
('Lamb Shank', 'Tender lamb shank, great for slow cooking', 18.00, 'https://example.com/img/lamb_shank.jpg', 30),
('Turkey Drumstick', 'Frozen turkey drumstick, 1kg', 14.00, 'https://example.com/img/turkey_drumstick.jpg', 50);
