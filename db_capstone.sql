/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comments` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `imageId` int DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`commentId`),
  KEY `userId` (`userId`),
  KEY `imageId` (`imageId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`imageId`) REFERENCES `images` (`imageId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`imageId`),
  KEY `userId` (`userId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `imagesSaved` (
  `saveId` int NOT NULL AUTO_INCREMENT,
  `imageId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`saveId`),
  KEY `imageId` (`imageId`),
  KEY `userId` (`userId`),
  CONSTRAINT `imagesSaved_ibfk_1` FOREIGN KEY (`imageId`) REFERENCES `images` (`imageId`),
  CONSTRAINT `imagesSaved_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`commentId`, `userId`, `imageId`, `comment`) VALUES
(1, 1, 1, 'Comment 1 for Image 1');
INSERT INTO `comments` (`commentId`, `userId`, `imageId`, `comment`) VALUES
(2, 1, 2, 'Comment 1 for Image 2');
INSERT INTO `comments` (`commentId`, `userId`, `imageId`, `comment`) VALUES
(3, 2, 2, 'Comment 1 for Image 3');
INSERT INTO `comments` (`commentId`, `userId`, `imageId`, `comment`) VALUES
(4, 2, 4, 'Comment 1 for Image 4'),
(5, 3, 5, 'Comment 1 for Image 5'),
(6, 3, 6, 'Comment 1 for Image 6'),
(7, 4, 7, 'Comment 1 for Image 7'),
(8, 4, 8, 'Comment 1 for Image 8'),
(9, 5, 9, 'Comment 1 for Image 9'),
(10, 5, 10, 'Comment 1 for Image 10'),
(13, 1, 2, 'Hinh anh'),
(14, 1, 2, 'Hinh anh'),
(15, 1, 2, 'Hinh anh'),
(16, 1, 2, 'Hinh anh'),
(17, 4, 3, 'Hinh anh');

INSERT INTO `images` (`imageId`, `name`, `url`, `userId`, `active`) VALUES
(1, 'Image 1', 'https://th.bing.com/th/id/R.b3a030417a1229d2427d967208251bb6?rik=6Z9xwSlMOiL7ag&riu=http%3a%2f%2fwww.youramazingplaces.com%2fwp-content%2fuploads%2f2013%2f04%2fsony-world-photography-awards-2013-11.jpg&ehk=4IjHSJzmIRF3it1jXQUQlxJ%2fR2uew2YXem6H9uw2mT0%3d&risl=&pid=ImgRaw&r=0', 1, 1);
INSERT INTO `images` (`imageId`, `name`, `url`, `userId`, `active`) VALUES
(2, 'Image 2', 'https://th.bing.com/th/id/OIP.nNk0OcB8NvuMmzC2aBuinAHaFj?w=600&h=450&rs=1&pid=ImgDetMain', 1, 0);
INSERT INTO `images` (`imageId`, `name`, `url`, `userId`, `active`) VALUES
(3, 'Image 3', 'https://i.pinimg.com/originals/f3/fe/b1/f3feb12e48627363baf6e3e23825512d.png', 2, 0);
INSERT INTO `images` (`imageId`, `name`, `url`, `userId`, `active`) VALUES
(4, 'Image 4', 'https://th.bing.com/th/id/OIP.O0aBfzHS6EZ3YP6SC0HBMQEsDI?w=900&h=600&rs=1&pid=ImgDetMain', 2, 1),
(5, 'Image 5', 'https://th.bing.com/th/id/OIP.a_TbeksU54ZfOSlEi0UCcwHaFj?w=900&h=675&rs=1&pid=ImgDetMain', 3, 1),
(6, 'Image 6', 'https://live.staticflickr.com/65535/52250710768_b357134fe5_b.jpg', 3, 1),
(7, 'Image 7', 'https://i.pinimg.com/originals/02/d9/90/02d990c4e742e16125fd52ddbd0e0c2f.jpg', 4, 0),
(8, 'Image 8', 'https://i.pinimg.com/originals/27/dd/6b/27dd6b025a8f44e445e85b4dcebe8991.jpg', 4, 1),
(9, 'Image 9', 'https://i.pinimg.com/originals/2f/c3/e7/2fc3e7f615d53d9ec0eb5b984f3a6dd7.jpg', 5, 0),
(10, 'Image 10', 'https://i.pinimg.com/originals/ab/c9/60/abc96001e504c60248d2649041442807.png', 5, 1);

INSERT INTO `imagesSaved` (`saveId`, `imageId`, `userId`) VALUES
(1, 1, 1);
INSERT INTO `imagesSaved` (`saveId`, `imageId`, `userId`) VALUES
(2, 2, 1);
INSERT INTO `imagesSaved` (`saveId`, `imageId`, `userId`) VALUES
(3, 3, 2);
INSERT INTO `imagesSaved` (`saveId`, `imageId`, `userId`) VALUES
(4, 4, 2),
(5, 5, 3),
(6, 6, 3),
(7, 7, 4),
(8, 8, 4),
(9, 9, 5),
(10, 10, 5),
(11, 3, 1),
(18, 1, 2);

INSERT INTO `users` (`userId`, `username`, `password`) VALUES
(1, 'user1', 'pass1');
INSERT INTO `users` (`userId`, `username`, `password`) VALUES
(2, 'user2', 'pass2');
INSERT INTO `users` (`userId`, `username`, `password`) VALUES
(3, 'user3', 'pass3');
INSERT INTO `users` (`userId`, `username`, `password`) VALUES
(4, 'user4', 'pass4'),
(5, 'user5', 'pass5'),
(6, 'user6', 'pass6'),
(7, 'user7', 'pass7'),
(8, 'user8', 'pass8'),
(9, 'user9', 'pass9'),
(24, 'admin', 'admin'),
(25, 'amdin123123', '123'),
(26, 'amdinqkwjheqkwe', '123'),
(27, 'qweqwe123', '123'),
(28, 'qwe098123', '$2b$10$l0grrBAMnf9HS6USzpGReeJXSYFDMsT4L/.b6zqGVbYTatkRwjjAC'),
(29, 'admin123', '$2b$10$B9D5yslVKimKV6Js8Qxw/eJSEChy3rVqtclX5VPA5d/GT5se/zlfa');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;