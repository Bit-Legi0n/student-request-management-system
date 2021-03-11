CREATE DATABASE `srms`;
USE `srms`;


-- Table: users
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- Table: requests
DROP TABLE IF EXISTS `requests`;

CREATE TABLE `requests` (
  `id` varchar(36) NOT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `staff_id` varchar(20) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `body` text,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`)
);


-- Table: replies
DROP TABLE IF EXISTS `replies`;

CREATE TABLE `replies` (
  `id` varchar(36) NOT NULL,
  `req_id` varchar(36) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `body` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `replies_ibfk_2_idx` (`req_id`),
  CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`req_id`) REFERENCES `requests` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- Table: files
DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `id` bigint NOT NULL,
  `req_id` varchar(36) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `req_id` (`req_id`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`req_id`) REFERENCES `requests` (`id`)
);
