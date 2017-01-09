-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2017 at 10:30 AM
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
  `avata_link` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `level` int(11) NOT NULL COMMENT '0: admin, 1:user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tr_account`
--

INSERT INTO `tr_account` (`id`, `username`, `password`, `name`, `email`, `description`, `avata_link`, `birth`, `level`) VALUES
('fb.864422863694475', 'Hi?u Thanh', '', 'Hi?u Thanh', '', '', 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15873237_863333280470100_194497653299636377_n.jpg?oh=fd8b213b654f289ed02fa1b44426b2db&oe=58E6CF8B', '0000-00-00', 1),
('r16ZyCeUl', 'handang', '123', 'Hân Ð?ng', '', '123', 'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/p160x160/15822571_1419031641464659_5540641489783627097_n.jpg?oh=ca7281dc8a9542bb362c1c101403ddcb&oe=59188BFF', NULL, 1);

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
(139, 24, 'r16ZyCeUl', '2017-01-09 15:53:04', '?nh nhòe'),
(140, 24, 'fb.864422863694475', '2017-01-09 15:53:09', 'uh'),
(141, 26, 'fb.864422863694475', '2017-01-09 15:59:08', ':3'),
(142, 27, 'fb.864422863694475', '2017-01-09 16:02:29', 'Background d?p ~'),
(143, 27, 'r16ZyCeUl', '2017-01-09 16:02:47', 'T?t nhiên :v'),
(144, 28, 'fb.864422863694475', '2017-01-09 16:14:26', 'quá d?p');

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
(47, 'r16ZyCeUl', 'fb.864422863694475', 0, 'bình lu?n "?nh nhòe" trong post Ng?c trinh v?i áo dài'),
(48, 'fb.864422863694475', 'fb.864422863694475', 0, 'bình lu?n "uh" trong post Ng?c trinh v?i áo dài'),
(49, 'fb.864422863694475', 'r16ZyCeUl', 0, 'bình lu?n ":3" trong post lang mang'),
(50, 'fb.864422863694475', 'r16ZyCeUl', 0, 'bình lu?n "Background d?p ~" trong post Ng?c trinh v?i bong bóng'),
(51, 'r16ZyCeUl', 'r16ZyCeUl', 0, 'bình lu?n "T?t nhiên :v" trong post Ng?c trinh v?i bong bóng'),
(52, 'fb.864422863694475', 'fb.864422863694475', 0, 'bình lu?n "quá d?p" trong post "Xinh tuoi"');

-- --------------------------------------------------------

--
-- Table structure for table `tr_post`
--

CREATE TABLE `tr_post` (
  `id` int(11) NOT NULL,
  `describe` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `post_by` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `date_post` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tr_post`
--

INSERT INTO `tr_post` (`id`, `describe`, `image`, `post_by`, `date_post`) VALUES
(21, 'vòng eo 56', 'http://res.cloudinary.com/trum/image/upload/v1483951670/y7wrjtlpuncdbenxyzib.jpg', 'fb.864422863694475', '2017-01-09 15:47:49'),
(22, 'Vòng eo 56', 'http://res.cloudinary.com/trum/image/upload/v1483951703/uowsm7qui3peff4phkks.jpg', 'fb.864422863694475', '2017-01-09 15:48:22'),
(23, 'Vòng eo 56 v3', 'http://res.cloudinary.com/trum/image/upload/v1483951732/qbwrevhxtbpjndeqm2ys.jpg', 'fb.864422863694475', '2017-01-09 15:48:51'),
(24, 'Ng?c trinh v?i áo dài', 'http://res.cloudinary.com/trum/image/upload/v1483953130/bo-anh-ngoc-trinh-hoa-cong-chua-xinh-dep-3_wn0s8q.jpg', 'fb.864422863694475', '2017-01-09 15:50:33'),
(25, 'water', 'http://res.cloudinary.com/trum/image/upload/v1483952196/e768d4djat2vavgtgvo1.jpg', 'fb.864422863694475', '2017-01-09 15:56:35'),
(26, 'lang mang', 'http://res.cloudinary.com/trum/image/upload/v1483952216/lcb2znvnmqi0zgkqjusk.jpg', 'r16ZyCeUl', '2017-01-09 15:56:55'),
(27, 'Ng?c trinh v?i bong bóng', 'http://res.cloudinary.com/trum/image/upload/v1483952312/nw9spwee3npp27netnrq.jpg', 'r16ZyCeUl', '2017-01-09 15:58:32'),
(28, '"Xinh tuoi"', 'http://res.cloudinary.com/trum/image/upload/v1483953027/kgzb1j9a3zmj985oocc6.jpg', 'fb.864422863694475', '2017-01-09 16:10:26');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;
--
-- AUTO_INCREMENT for table `tr_notification`
--
ALTER TABLE `tr_notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `tr_post`
--
ALTER TABLE `tr_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
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
