-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2017 at 05:54 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.5.37

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
-- Table structure for table `tr_account`
--

CREATE TABLE `tr_account` (
  `id` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avata_link` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `level` int(11) NOT NULL COMMENT '0: admin, 1:user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tr_account`
--

INSERT INTO `tr_account` (`id`, `username`, `password`, `name`, `email`, `description`, `avata_link`, `birth`, `level`) VALUES
('123456789000', 'hieuthanh', '123', 'MEMBER', 'member@gmail.com', 'member', '', '0000-00-00', 1),
('123456789012', 'admin', '123456', 'ADMIN', 'trumpstagram.lthd@gmail.com', 'admin', '', '0000-00-00', 0),
('HyXXn7Trx', 'hieuthanh12', '123', '', '', '', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tr_comment`
--

CREATE TABLE `tr_comment` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment_by` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `date_comment` datetime NOT NULL,
  `content` varchar(90) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tr_comment`
--

INSERT INTO `tr_comment` (`id`, `post_id`, `comment_by`, `date_comment`, `content`) VALUES
(15, 1, 'fb.856641977805897', '2017-01-07 13:26:30', 'demo'),
(16, 1, 'fb.856641977805897', '2017-01-07 13:27:10', 'demo'),
(17, 1, 'fb.856641977805897', '2017-01-12 00:00:00', 'demo'),
(18, 1, 'fb.856641977805897', '2017-01-12 00:00:00', 'demo'),
(19, 1, 'fb.856641977805897', '2017-01-12 00:00:00', 'demo'),
(20, 1, 'fb.856641977805897', '2017-01-12 00:00:00', 'demo');

-- --------------------------------------------------------

--
-- Table structure for table `tr_follow`
--

CREATE TABLE `tr_follow` (
  `user_id` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `user_follow` varchar(24) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_like`
--

CREATE TABLE `tr_like` (
  `post_id` int(11) NOT NULL,
  `like_by` varchar(24) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_notification`
--

CREATE TABLE `tr_notification` (
  `id` int(11) NOT NULL,
  `sender` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `receiver` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0: chua xem. 1 dã xem',
  `content` varchar(90) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tr_notification`
--

INSERT INTO `tr_notification` (`id`, `sender`, `receiver`, `status`, `content`) VALUES
(1, '123456789000', 'fb.856641977805897', 0, 'hieuthanh v?a like post c?a b?n');

-- --------------------------------------------------------

--
-- Table structure for table `tr_post`
--

CREATE TABLE `tr_post` (
  `id` int(11) NOT NULL,
  `describe` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `post_by` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `date_post` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tr_post`
--

INSERT INTO `tr_post` (`id`, `describe`, `image`, `post_by`, `date_post`) VALUES
(1, 'An chè quân 1', 'yz994r8skz6euhfhydpk.jpg', 'fb.856641977805897', '2017-01-06 00:00:00'),
(2, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(3, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(4, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(5, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(6, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(7, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(8, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(9, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(10, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00'),
(11, 'demo', 'yz994r8skz6euhfhydpk', 'fb.856641977805897', '2017-01-08 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tr_account`
--
ALTER TABLE `tr_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tr_comment`
--
ALTER TABLE `tr_comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tr_follow`
--
ALTER TABLE `tr_follow`
  ADD PRIMARY KEY (`user_id`,`user_follow`);

--
-- Indexes for table `tr_like`
--
ALTER TABLE `tr_like`
  ADD PRIMARY KEY (`post_id`,`like_by`);

--
-- Indexes for table `tr_notification`
--
ALTER TABLE `tr_notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tr_post`
--
ALTER TABLE `tr_post`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tr_comment`
--
ALTER TABLE `tr_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `tr_notification`
--
ALTER TABLE `tr_notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tr_post`
--
ALTER TABLE `tr_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tr_like`
--
ALTER TABLE `tr_like`
  ADD CONSTRAINT `tr_like_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `tr_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
