-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2021 at 12:45 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pettahpharma`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_ID` int(255) NOT NULL,
  `display_photo` varchar(255) DEFAULT NULL,
  `name` varchar(25) NOT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_ID`, `display_photo`, `name`, `contact_no`, `email`, `password`) VALUES
(1, NULL, 'Madhusha', NULL, 'madhusha@gmail.com', 'madhu123');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_details`
--

CREATE TABLE `doctor_details` (
  `doctor_id` int(11) NOT NULL,
  `display_photo` varchar(255) DEFAULT NULL,
  `slmc_no` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `clinic` varchar(255) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `citation` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_details`
--

INSERT INTO `doctor_details` (`doctor_id`, `display_photo`, `slmc_no`, `name`, `clinic`, `contact_no`, `email`, `area`, `dob`, `citation`, `qualification`, `note`) VALUES
(1, 'aamir.jpeg', 'colombo', 'Aamir', 'Delta Clinic', '0768921288', 'aamirdoc@gmail.com', 'Kalmunai', '1997-12-19', 'MBBS', 'Eye Spacial', 'Nothing to say'),
(10, '', '@cuve', 'Madhu', 'AlphaClinic', '0769131669', 'madhu@gmail.com', 'Kallaru', '1998-02-06', NULL, 'Dental Sur', 'Nothing to say');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `rep_ID` int(25) NOT NULL,
  `expense_ID` int(255) NOT NULL,
  `expense_Type` varchar(255) NOT NULL,
  `location` point NOT NULL,
  `bills` blob DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `salesmanager_comment` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`rep_ID`, `expense_ID`, `expense_Type`, `location`, `bills`, `amount`, `description`, `salesmanager_comment`) VALUES
(124, 1, 'Fuel Allowance', 0x, NULL, '1000.00', 'For fuel', 'okey'),
(125, 2, 'Overnight Stay Allowance', 0x, NULL, '2500.00', 'night stay at kandy', 'okey');

-- --------------------------------------------------------

--
-- Table structure for table `leaves`
--

CREATE TABLE `leaves` (
  `leave_ID` int(255) NOT NULL,
  `rep_ID` int(25) NOT NULL,
  `leave_Type` varchar(255) NOT NULL,
  `start_Date` date NOT NULL,
  `end_Date` date NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `salesmanager_comment` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medicalrep`
--

CREATE TABLE `medicalrep` (
  `rep_ID` int(25) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `display_photo` varchar(255) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `phone_no` varchar(10) DEFAULT NULL,
  `area` varchar(25) DEFAULT NULL,
  `rating` varchar(25) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `manager_ID` int(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicalrep`
--

INSERT INTO `medicalrep` (`rep_ID`, `name`, `display_photo`, `email`, `phone_no`, `area`, `rating`, `password`, `manager_ID`) VALUES
(124, 'Dhiga', NULL, 'dhiga@gmail.com', '0778844556', 'Dehiwala', 'A', 'dhiga', 1),
(125, 'Aamir', NULL, 'aamir@gmail.com', '0768921288', 'Dehiwala', 'A', 'aamir@123', 1),
(146, 'Madhu', NULL, 'madhu@gamil.com', '0758677094', 'Kallaru', '3.5', 'madhu@123', 2),
(175, 'Mathy', NULL, 'mathy12@gmail.com', '0771452365', 'Kalmunai', '3', 'mathy12', 2);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_ID` varchar(25) NOT NULL,
  `display_photo` varchar(255) DEFAULT NULL,
  `name` varchar(40) NOT NULL,
  `volume` varchar(25) DEFAULT NULL,
  `price` int(25) NOT NULL,
  `description` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_ID`, `display_photo`, `name`, `volume`, `price`, `description`) VALUES
('1', NULL, 'Panadol', '150', 10, 'Used for Fever, Headache'),
('2', NULL, 'Amoxicillin', '100', 25, 'Used as antibiotic'),
('3', NULL, 'Metformin', '150', 20, 'Used for type 2 diabetes'),
('4', NULL, 'Piriton', '100', 25, 'For Allergic'),
('5', NULL, 'Paracetamol', '120', 25, 'Used for Fever, Headache'),
('7', NULL, 'Rizatripton', '5 mg', 50, 'Used for migraine headaches'),
('8', NULL, 'Rizatriptan', '10 mg', 100, 'Used for Migraine Headaches'),
('9', NULL, 'Aspirin', '75 mg', 20, 'Used as painkiller. Used for headache and toothaches');

-- --------------------------------------------------------

--
-- Table structure for table `salesmanager`
--

CREATE TABLE `salesmanager` (
  `manager_ID` int(25) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `display_photo` varchar(255) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `phone_no` varchar(10) DEFAULT NULL,
  `area` varchar(25) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salesmanager`
--

INSERT INTO `salesmanager` (`manager_ID`, `name`, `display_photo`, `email`, `phone_no`, `area`, `password`) VALUES
(1, 'Aamir', NULL, 'aamir@gmail.com', '0761234567', 'Colombo', 'Dhiga'),
(2, 'Madhu', NULL, 'madhu@gmail.com', '0769131669', 'Kalmunai', 'madhu'),
(3, 'Thulasiii', NULL, 'thulasi@gmail.com', '0761122334', 'Jaffna', 'thulasi123'),
(5, 'Juz', NULL, 'juz@gmail.com', '0778844521', 'Kattankudy', 'Juz'),
(9, 'Salman', NULL, 'sal123@gmail.com', '0771122336', 'Gampaha', 'sal123'),
(11, 'Thusha', NULL, 'thusha@gmail.com', '0771122389', 'Kandy', 'thu123'),
(445, 'maaaa', NULL, 'maa@gmail.com', '6565569898', 'kallar', 'ka123'),
(448, 'lala', NULL, 'lala@gmail.com', '0778955444', 'blabla', 'lala12'),
(477, 'thusha', NULL, 'thu23@gmail.com', '0778954666', 'kallar', 'thu123'),
(4555, 'david', NULL, 'da@gmail.com', '0778145558', 'kandy', '1233jjj');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `session` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `rep_note` varchar(255) DEFAULT NULL,
  `manager_ID` int(255) DEFAULT NULL,
  `rep_ID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `location`, `date`, `session`, `description`, `status`, `type`, `rep_note`, `manager_ID`, `rep_ID`) VALUES
(1, 'Appoinment', 'Colombo', '2021-08-15', 'Evening', 'POda dai', 'complete', 'shedule', NULL, NULL, 125),
(2, 'Arrange', 'colombo', '2012-02-26', 'Morning', 'Nothing', 'complete', 'task', 'reject', 2, 125),
(4, 'Kallar', 'Kallaru', '2021-08-04', 'Full-day', 'Discussion', 'Complete', 'task', 'reject', 2, 125);

-- --------------------------------------------------------

--
-- Table structure for table `visit_summary_report`
--

CREATE TABLE `visit_summary_report` (
  `report_ID` int(255) NOT NULL,
  `visit_type` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `avg_duration` varchar(255) DEFAULT NULL,
  `no_of_sample` int(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `doctor_id` int(255) DEFAULT NULL,
  `product_ID` int(255) DEFAULT NULL,
  `rep_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visit_summary_report`
--

INSERT INTO `visit_summary_report` (`report_ID`, `visit_type`, `date`, `avg_duration`, `no_of_sample`, `description`, `doctor_id`, `product_ID`, `rep_ID`) VALUES
(1, 'Promotion', '2021-08-15', '1', 50, 'Gave some sample to promote', 1, 2, 125),
(3, 'Genaral Visit', '2021-06-15', '0.5', NULL, 'Get Feedback', 1, NULL, 125);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_ID`);

--
-- Indexes for table `doctor_details`
--
ALTER TABLE `doctor_details`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expense_ID`),
  ADD KEY `rep_ID` (`rep_ID`);

--
-- Indexes for table `leaves`
--
ALTER TABLE `leaves`
  ADD PRIMARY KEY (`leave_ID`),
  ADD KEY `rep_ID` (`rep_ID`);

--
-- Indexes for table `medicalrep`
--
ALTER TABLE `medicalrep`
  ADD PRIMARY KEY (`rep_ID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `f.key1` (`manager_ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_ID`);

--
-- Indexes for table `salesmanager`
--
ALTER TABLE `salesmanager`
  ADD PRIMARY KEY (`manager_ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `manager_ID` (`manager_ID`),
  ADD KEY `rep_ID` (`rep_ID`);

--
-- Indexes for table `visit_summary_report`
--
ALTER TABLE `visit_summary_report`
  ADD PRIMARY KEY (`report_ID`),
  ADD KEY `rep_ID` (`rep_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctor_details`
--
ALTER TABLE `doctor_details`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `visit_summary_report`
--
ALTER TABLE `visit_summary_report`
  MODIFY `report_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicalrep`
--
ALTER TABLE `medicalrep`
  ADD CONSTRAINT `f.key1` FOREIGN KEY (`manager_ID`) REFERENCES `salesmanager` (`manager_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`manager_ID`) REFERENCES `salesmanager` (`manager_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`rep_ID`) REFERENCES `medicalrep` (`rep_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `visit_summary_report`
--
ALTER TABLE `visit_summary_report`
  ADD CONSTRAINT `visit_summary_report_ibfk_3` FOREIGN KEY (`rep_ID`) REFERENCES `medicalrep` (`rep_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
