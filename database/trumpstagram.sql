-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2016 at 02:49 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trumpstagram`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` varchar(24) NOT NULL,
  `comment_image_id` varchar(24) NOT NULL,
  `comment_user_id` varchar(24) NOT NULL,
  `conntent` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `image_id` varchar(24) NOT NULL,
  `image_user_id` varchar(24) NOT NULL,
  `image_link` varchar(100) NOT NULL,
  `caption` varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `user_id` varchar(24) NOT NULL,
  `username_id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `description` varchar(100),
  `avata_link` varchar(100),
  `birth` date
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
-- --------------------------------------------------------

--
-- Table structure for table `like`
--

CREATE TABLE `like` (
  `like_image_id` varchar(24) NOT NULL,
  `like_user_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `account`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`like_image_id`,`like_user_id`);
  
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_COMMENT_IMAGE` FOREIGN KEY (`comment_image_id`) REFERENCES `image` (`image_id`);

--
-- Constraints for table `user_info`
--
ALTER TABLE `user_info`
  ADD CONSTRAINT `FK_USERINFO_ACCOUNT` FOREIGN KEY (`username_id`) REFERENCES `account` (`username`);
  
--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FK_IMAGE_USER` FOREIGN KEY (`image_user_id`) REFERENCES `user_info` (`user_id`);
  
--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_COMMENT_USERINFO` FOREIGN KEY (`comment_user_id`) REFERENCES `user_info` (`user_id`);

--
-- Constraints for table `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `FK_LIKE_IMAGE` FOREIGN KEY (`like_image_id`) REFERENCES `image` (`image_id`),
  ADD CONSTRAINT `FK_LIKE_USERINFO` FOREIGN KEY (`like_user_id`) REFERENCES `user_info` (`user_id`);
--
-- Insert data for table `account`
--
INSERT INTO `account` (`username`, `password`) VALUES
('admin','123456'),
('member','123456');

--
-- Insert data for table `user_info`
--
INSERT INTO `user_info` (`user_id`, `username_id`,`name`,`email`) VALUES
('123456789012','admin','ADMIN', 'trumpstagram@gmail.com'),
('123456789000','member','MEMBER', 'member@gmail.com');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
