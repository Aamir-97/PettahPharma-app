-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2021 at 07:32 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `name` varchar(25) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_ID`, `display_photo`, `name`, `contact_no`, `email`, `password`) VALUES
(1, '', 'Madhusha', '', 'madhusha@gmail.com', 'madhu123');

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
  `note` varchar(255) DEFAULT NULL,
  `rep_ID` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_details`
--

INSERT INTO `doctor_details` (`doctor_id`, `display_photo`, `slmc_no`, `name`, `clinic`, `contact_no`, `email`, `area`, `dob`, `citation`, `qualification`, `note`, `rep_ID`) VALUES
(1, 'aamir.jpeg', 'colombo', 'Dr.Kumaran', 'Delta Clinic', '0768921288', 'aamirdoc@gmail.com', 'Kalmunai', '1997-12-19', 'MBBS', 'Eye Spacial', 'Nothing to say', 125),
(10, '', '@cuve', 'Dr.Vihwasena', 'AlphaClinic', '0769131669', 'madhu@gmail.com', 'Kallaru', '1998-02-06', NULL, 'Dental Sur', 'Nothing to say', 125);

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `rep_ID` int(25) NOT NULL,
  `expense_ID` int(255) NOT NULL,
  `expense_Type` varchar(255) DEFAULT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `location` point DEFAULT NULL,
  `bills` blob DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `status` int(1) DEFAULT 0,
  `salesmanager_comment` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`rep_ID`, `expense_ID`, `expense_Type`, `date`, `location`, `bills`, `amount`, `description`, `status`, `salesmanager_comment`) VALUES
(125, 3, 'Daily Expenses', '2021-08-24', NULL, NULL, '1250.00', NULL, 1, 'It will send it by monday'),
(125, 4, 'Daily batta', '2021-08-24', NULL, NULL, '1330.00', NULL, 0, 'Cannot settle the full amount'),
(125, 5, 'Fuel expenses', '2021-08-24', NULL, NULL, '2650.00', NULL, 1, 'Cash sent to your account');

-- --------------------------------------------------------

--
-- Table structure for table `leaves`
--

CREATE TABLE `leaves` (
  `leave_ID` int(255) NOT NULL,
  `rep_ID` int(25) NOT NULL,
  `leave_Type` varchar(255) NOT NULL,
  `start_Date` date NOT NULL,
  `end_Date` date DEFAULT NULL,
  `no_of_days` int(5) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `status` int(1) DEFAULT 0,
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
  `email` varchar(40) NOT NULL,
  `phone_no` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `working_area` varchar(25) NOT NULL,
  `rating` varchar(25) DEFAULT NULL,
  `password` varchar(25) NOT NULL,
  `manager_ID` int(25) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicalrep`
--

INSERT INTO `medicalrep` (`rep_ID`, `name`, `display_photo`, `email`, `phone_no`, `address`, `working_area`, `rating`, `password`, `manager_ID`, `created_at`) VALUES
(124, 'Dhiga', NULL, 'dhiga@gmail.com', '0778844556', NULL, 'Dehiwala', 'A', 'dhiga', 1, '2021-08-24'),
(125, 'M.S.Aamir Ali', NULL, 'aamir@gmail.com', '0758677094', '184, Library Road, Maruthamunai-03.', 'Dehiwala', '4.5', 'Aamir@123', 1, '2021-08-24'),
(146, 'Madhu', NULL, 'madhu@gamil.com', '0758677094', NULL, 'Kallaru', '3.5', 'madhu@123', 2, '2021-08-24'),
(164, 'Nimni', NULL, 'nimni@gmail.com', '0778844556', NULL, 'Dehiwala', 'A', 'nimni', 2, '2021-08-24');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(25) NOT NULL,
  `display_photo` varchar(255) DEFAULT NULL,
  `name` varchar(40) NOT NULL,
  `volume` varchar(25) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `display_photo`, `name`, `volume`, `price`, `description`) VALUES
(1, '', 'Panadol', '150 Cap.', '10.00', 'Used for Fever, Headache'),
(2, '', 'Amoxicillin', '100 ml', '25.00', 'Used as antibiotic'),
(3, '', 'Metformin', ' 1 Bot.', '20.00', 'Used for type 2 diabetes');

-- --------------------------------------------------------

--
-- Table structure for table `salesmanager`
--

CREATE TABLE `salesmanager` (
  `manager_ID` int(25) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `display_photo` varchar(255) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `phone_no` varchar(10) DEFAULT NULL,
  `area` varchar(25) DEFAULT NULL,
  `password` varchar(25) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salesmanager`
--

INSERT INTO `salesmanager` (`manager_ID`, `name`, `display_photo`, `email`, `phone_no`, `area`, `password`, `created_at`) VALUES
(1, 'Aamir', NULL, 'msaaamirali123@gmail.com', '0768921288', 'Maruthamunai', 'Dhiga', '2021-08-24'),
(2, 'Madhu', NULL, 'madhu@gmail.com', '0769131669', 'Kalmunai', 'madhu', '2021-08-24'),
(3, 'Thulasi', NULL, 'thulasi@gmail.com', '0761122334', 'Jaffna', 'thulasi123', '2021-08-24'),
(4, 'Dini', NULL, 'dini@gmail.com', '0769131119', 'Colombo', 'dini', '2021-08-24'),
(5, 'Juz', NULL, 'juz@gmail.com', '0778844521', 'Kattankudy', 'Juz', '2021-08-24'),
(6, 'Nimni', NULL, 'nimni@gmail.com', '0774411256', 'Galle', 'nimni', '2021-08-24');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `session` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'Pending..',
  `type` varchar(255) NOT NULL DEFAULT 'schedule',
  `rep_note` varchar(255) DEFAULT NULL,
  `manager_ID` int(255) DEFAULT NULL,
  `rep_ID` int(255) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `location`, `date`, `session`, `description`, `status`, `type`, `rep_note`, `manager_ID`, `rep_ID`, `created_at`) VALUES
(1, 'Appoinment', 'Colombo', '2021-08-15', '', 'Poda dai', 'Pending', 'shedule', NULL, 2, 125, '2021-08-24'),
(2, 'Arrange', 'colombo', '2012-02-26', '', 'Nothing', 'Pending', 'task', NULL, 2, 125, '2021-08-24'),
(3, 'Programme', 'Genaral Hospital- Kalubowila', '2021-06-09', '', 'arrange the meeting', 'Reject', 'task', 'I have another work', 2, 125, '2021-08-24'),
(4, 'Meet Dr.Madhu', 'Kallaru', '2021-08-08', '', 'Discussion', 'Complete', 'task', 'Project Complete', 2, 125, '2021-08-24');

-- --------------------------------------------------------

--
-- Table structure for table `visit_summary_report`
--

CREATE TABLE `visit_summary_report` (
  `report_id` int(255) NOT NULL,
  `visit_type` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `avg_duration` varchar(255) DEFAULT NULL,
  `no_of_sample` int(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `rep_ID` int(10) NOT NULL,
  `manager_ID` int(25) NOT NULL,
  `manager_comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visit_summary_report`
--

INSERT INTO `visit_summary_report` (`report_id`, `visit_type`, `location`, `date`, `avg_duration`, `no_of_sample`, `description`, `doctor_name`, `product_name`, `rep_ID`, `manager_ID`, `manager_comment`) VALUES
(1, 'Promotion', '', '2021-08-15', '1', 50, 'Gave some sample to promote', 'Dr.Kumaran', 'Panadol', 125, 2, NULL),
(3, 'Genaral Visit', '', '2021-06-15', '0.5', 6, 'Get Feedback', 'Dr.Vihwasena', 'Amoxicillin', 125, 2, NULL),
(4, 'Ragular', 'Alpha Clinic', '2021-08-24', '1.5', 3, '', '10', NULL, 125, 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `doctor_details`
--
ALTER TABLE `doctor_details`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `rep_ID` (`rep_ID`);

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
  ADD UNIQUE KEY `rep_ID` (`rep_ID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `f.key1` (`manager_ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `salesmanager`
--
ALTER TABLE `salesmanager`
  ADD PRIMARY KEY (`manager_ID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `manager_ID` (`manager_ID`);

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
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `rep_ID` (`rep_ID`),
  ADD KEY `manager_ID` (`manager_ID`);

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
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expense_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `visit_summary_report`
--
ALTER TABLE `visit_summary_report`
  MODIFY `report_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_details`
--
ALTER TABLE `doctor_details`
  ADD CONSTRAINT `doctor_details_ibfk_1` FOREIGN KEY (`rep_ID`) REFERENCES `medicalrep` (`rep_ID`);

--
-- Constraints for table `medicalrep`
--
ALTER TABLE `medicalrep`
  ADD CONSTRAINT `f.key1` FOREIGN KEY (`manager_ID`) REFERENCES `salesmanager` (`manager_ID`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`manager_ID`) REFERENCES `salesmanager` (`manager_ID`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`rep_ID`) REFERENCES `medicalrep` (`rep_ID`);

--
-- Constraints for table `visit_summary_report`
--
ALTER TABLE `visit_summary_report`
  ADD CONSTRAINT `visit_summary_report_ibfk_3` FOREIGN KEY (`rep_ID`) REFERENCES `medicalrep` (`rep_ID`),
  ADD CONSTRAINT `visit_summary_report_ibfk_4` FOREIGN KEY (`manager_ID`) REFERENCES `salesmanager` (`manager_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
