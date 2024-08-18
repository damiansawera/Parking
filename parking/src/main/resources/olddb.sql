-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: parking-system
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_end_date` datetime(6) DEFAULT NULL,
  `booking_start_date` datetime(6) DEFAULT NULL,
  `is_paid` bit(1) NOT NULL,
  `parking_spot_number` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `car_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd9p8qdy5sj4ym0bmksdx7yrwj` (`car_id`),
  KEY `FKkgseyy7t56x7lkjgu3wah5s3t` (`user_id`),
  CONSTRAINT `FKd9p8qdy5sj4ym0bmksdx7yrwj` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`),
  CONSTRAINT `FKkgseyy7t56x7lkjgu3wah5s3t` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,'2024-06-18 14:30:36.591000','2024-06-18 14:30:02.346000',_binary '','A1',5,'ZS672RM',NULL,NULL),(3,'2024-06-18 15:02:29.307000','2024-06-18 14:54:27.987000',_binary '','A5',5,'asd1231',4,NULL),(4,'2024-07-02 22:45:02.497000','2024-06-18 15:02:32.414000',_binary '','A2',1720,'asd1231',4,NULL),(5,'2024-06-26 20:14:50.479000','2024-06-26 20:14:33.113000',_binary '','A1',5,'ZS672RM',1,NULL),(6,'2024-07-02 22:15:57.326000','2024-07-02 22:14:57.295000',_binary '','A6',5,'ZS672RM',1,NULL),(7,'2024-07-18 21:51:25.813000','2024-07-02 22:16:57.867000',_binary '','A6',1920,'ZS672RM',1,NULL),(8,'2024-07-02 22:50:19.913000','2024-07-02 22:49:40.995000',_binary '','A4',5,'ZS123123',10,NULL),(9,'2024-07-02 22:51:53.091000','2024-07-02 22:51:12.609000',_binary '','A4',5,'111111',11,NULL),(10,'2024-07-06 06:53:59.086000','2024-07-06 06:53:49.235000',_binary '','A3',5,'zs643gf',12,NULL),(11,'2024-07-18 11:10:28.370000','2024-07-18 09:21:35.937000',_binary '','A3',10,'zs123pl',15,NULL),(12,'2024-07-19 16:31:13.611000','2024-07-18 09:23:41.470000',_binary '','A7',160,'bbbb',16,NULL),(13,'2024-07-18 10:06:31.136000','2024-07-18 10:06:18.550000',_binary '','A1',5,'zs672bgc',17,NULL),(14,'2024-07-18 11:19:28.844000','2024-07-18 10:49:31.849000',_binary '','A5',5,'423423',18,NULL),(15,'2024-07-18 11:20:17.816000','2024-07-18 11:20:09.931000',_binary '','A3',5,'asdgdd',19,NULL),(16,'2024-07-18 21:51:23.249000','2024-07-18 13:22:55.004000',_binary '','A2',45,'user3',20,NULL),(17,'2024-07-18 21:51:24.451000','2024-07-18 13:23:06.285000',_binary '','A3',45,'user3car',21,NULL),(18,'2024-07-19 16:31:12.432000','2024-07-19 13:14:14.227000',_binary '','A1',20,'zsdas123',23,NULL),(19,'2024-07-19 17:04:25.604000','2024-07-19 16:35:58.044000',_binary '','A2',5,'newcar1',25,NULL),(20,'2024-07-19 17:04:26.799000','2024-07-19 16:46:52.757000',_binary '','A3',5,'newcar2',26,NULL),(21,'2024-07-19 17:04:18.239000','2024-07-19 16:49:29.660000',_binary '','A6',5,'newcar3',27,NULL),(22,'2024-07-19 17:17:51.247000','2024-07-19 17:17:32.793000',_binary '','A4',5,'hkjhij',30,3),(23,'2024-07-19 17:50:45.973000','2024-07-19 17:42:30.187000',_binary '','A3',5,'nowycar1',31,3),(24,'2024-07-19 17:50:56.586000','2024-07-19 17:50:54.824000',_binary '','A3',5,'nowycar1',31,3),(25,'2024-07-19 17:55:05.485000','2024-07-19 17:54:59.816000',_binary '','A4',5,'nowycar1',31,3),(26,'2024-07-21 00:54:13.106000','2024-07-19 17:55:10.928000',_binary '','A4',155,'nowycar1',31,3),(27,'2024-07-21 10:20:41.149000','2024-07-19 21:12:58.426000',_binary '','A5',190,'ZS672RM',1,3),(28,'2024-07-19 23:48:15.133000','2024-07-19 23:48:10.307000',_binary '','A7',5,'usercar100',28,5),(29,'2024-07-20 00:19:25.237000','2024-07-20 00:19:21.881000',_binary '','A7',5,'aaaaaaaa1',35,3),(30,'2024-07-20 11:18:13.838000','2024-07-20 11:18:10.767000',_binary '','A3',5,'zs1111',37,3),(31,'2024-07-20 11:28:20.433000','2024-07-20 11:28:16.396000',_binary '','A3',5,'user3carte',22,3),(32,'2024-07-21 00:52:57.886000','2024-07-20 11:44:02.056000',_binary '','A6',70,'zsdas123',23,3),(33,'2024-07-21 00:49:20.628000','2024-07-20 18:37:45.165000',_binary '','A3',35,'abcd',38,3),(34,'2024-07-21 00:40:10.166000','2024-07-20 22:06:04.794000',_binary '','A1',15,'Z1ESSA',40,8),(35,'2024-07-21 00:50:06.421000','2024-07-20 22:25:25.427000',_binary '','A2',15,'django',41,9),(36,'2024-07-21 00:57:59.236000','2024-07-21 00:57:36.459000',_binary '','A2',5,'zs672rmd',42,11),(37,'2024-07-21 01:05:55.136000','2024-07-21 01:05:22.795000',_binary '','A2',5,'zs672rmd',42,11),(38,'2024-07-21 15:18:52.748000','2024-07-21 11:01:51.149000',_binary '','A1',25,'dupa1',43,11),(39,'2024-07-21 11:30:08.204000','2024-07-21 11:19:09.856000',_binary '','A2',5,'user3carte',22,3),(40,'2024-07-21 11:30:06.560000','2024-07-21 11:19:12.651000',_binary '','A3',5,'zsdas123',23,3),(41,'2024-07-21 11:28:18.402000','2024-07-21 11:19:18.281000',_binary '','A4',5,'aaaaaaaa1',35,3),(42,NULL,'2024-07-21 11:19:20.840000',_binary '\0','A5',0,'fdfsdfs',34,3),(43,NULL,'2024-07-21 11:19:22.862000',_binary '\0','A6',0,'gfgdfgdfgd',47,3),(44,NULL,'2024-07-21 11:19:25.876000',_binary '\0','A7',0,'dsadasdasd',48,3),(45,'2024-08-05 19:21:36.889000','2024-07-21 11:27:41.775000',_binary '','A9',1840,'abcdddd',45,11),(46,'2024-07-21 15:16:15.724000','2024-07-21 15:15:36.171000',_binary '','A4',5,'zs546nm',49,12),(47,NULL,'2024-07-21 15:18:15.382000',_binary '\0','A3',0,'zs546nm',49,12),(48,'2024-08-05 20:04:49.254000','2024-08-05 20:04:46.788000',_binary '','A1',5,'zs672rmd',42,11),(49,'2024-08-05 20:15:27.551000','2024-08-05 20:15:25.769000',_binary '','A1',5,'zs672rmd',42,11),(50,'2024-08-05 20:17:26.023000','2024-08-05 20:16:45.465000',_binary '','A1',5,'xczxczx',46,11),(51,'2024-08-05 20:18:44.133000','2024-08-05 20:18:42.305000',_binary '','A1',5,'xczxczx',46,11),(52,'2024-08-05 20:19:36.524000','2024-08-05 20:19:33.817000',_binary '','A1',5,'xczxczx',46,11),(53,'2024-08-05 20:19:55.553000','2024-08-05 20:19:54.024000',_binary '','A1',5,'xczxczx',46,11),(54,'2024-08-05 20:20:20.710000','2024-08-05 20:20:19.149000',_binary '','A2',5,'abcdddd',45,11),(55,'2024-08-05 20:20:31.739000','2024-08-05 20:20:30.331000',_binary '','A4',5,'dupa1',43,11),(56,'2024-08-05 20:20:49.085000','2024-08-05 20:20:47.510000',_binary '','A1',5,'xczxczx',46,11),(57,'2024-08-05 20:31:35.753000','2024-08-05 20:31:29.199000',_binary '','A1',5,'dupa1',43,11),(58,'2024-08-05 20:36:21.958000','2024-08-05 20:36:19.537000',_binary '','A4',5,'abcdddd',45,11),(59,'2024-08-05 20:46:14.838000','2024-08-05 20:46:09.903000',_binary '','A2',5,'zs672rmd',42,11),(60,'2024-08-05 21:06:28.246000','2024-08-05 21:06:26.029000',_binary '','A2',5,'dupa1',43,11),(61,'2024-08-05 21:13:25.298000','2024-08-05 21:13:20.298000',_binary '','A1',5,'abcdddd',45,11),(62,'2024-08-05 21:53:49.926000','2024-08-05 21:53:48.013000',_binary '','A1',5,'zs672rmd',42,11),(63,'2024-08-06 09:39:33.947000','2024-08-06 09:35:42.513000',_binary '','A4',5,'abcdddd',45,11),(64,'2024-08-06 09:39:42.997000','2024-08-06 09:39:40.197000',_binary '','A2',5,'dupa1',43,11),(65,'2024-08-06 09:47:13.896000','2024-08-06 09:47:11.414000',_binary '','A1',5,'dupa1',43,11),(66,'2024-08-06 09:48:14.912000','2024-08-06 09:48:12.960000',_binary '','A2',5,'abcdddd',45,11),(67,'2024-08-06 09:51:01.543000','2024-08-06 09:50:59.612000',_binary '','A1',5,'xczxczx',46,11),(68,'2024-08-06 10:14:38.169000','2024-08-06 10:13:47.822000',_binary '','A4',5,'zs673rm',50,11),(69,'2024-08-06 15:36:14.668000','2024-08-06 15:35:51.257000',_binary '','A1',5,'abcdddd',45,11),(70,'2024-08-06 15:38:10.756000','2024-08-06 15:38:08.865000',_binary '','A2',5,'xczxczx',46,11),(71,'2024-08-06 15:39:25.816000','2024-08-06 15:39:24.165000',_binary '','A2',5,'dupa1',43,11),(72,'2024-08-06 15:40:33.234000','2024-08-06 15:40:29.890000',_binary '','A9',5,'abcdddd',45,11),(73,NULL,'2024-08-06 17:06:15.346000',_binary '\0','A1',0,'aaaaaaaa1',35,3),(74,'2024-08-12 17:14:55.254000','2024-08-12 17:14:49.489000',_binary '','A2',5,'zs672rmd',42,11);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `color` varchar(255) DEFAULT NULL,
  `parking_spot_number` varchar(255) DEFAULT NULL,
  `production_year` int NOT NULL,
  `registration_number` varchar(255) DEFAULT NULL,
  `vehicle_make` varchar(255) DEFAULT NULL,
  `vehicle_model` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_jndlmfahrigaj6bigscuk3gug` (`parking_spot_number`),
  UNIQUE KEY `UK_41gx8ie1hc8w4eylj60io4pvy` (`registration_number`),
  KEY `FKja1j4mm4rqlv6cnhgp1qqgtuj` (`user_id`),
  CONSTRAINT `FKja1j4mm4rqlv6cnhgp1qqgtuj` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'yellow',NULL,1231,'ZS672RM','Toyota','Corolla',NULL),(2,'Gfedgfg',NULL,3333,'zs6112','Toyota','Camry',NULL),(4,'Fwfw',NULL,1231,'asd1231','Ford','Kuga',NULL),(5,'bia≈Çy',NULL,2024,'ZS672RMmm','Audi','CLA 250',NULL),(6,'bia≈Çy',NULL,2024,'ZS672RMmdm','Audi','CLA 250',NULL),(8,NULL,NULL,0,'ZS672RMfdsfsdfmm','Audi','CLA 250',NULL),(10,'NulL',NULL,1231,'ZS123123','Toyota','Corolla',NULL),(11,'FefwefW',NULL,1212,'111111','Audi','A4',NULL),(12,'Blue',NULL,5555,'zs643gf','Bmw','X3',NULL),(13,'Blue',NULL,2014,'abcdefgh','Bmw','M5',NULL),(14,'White',NULL,1000,'aaaaaa','Honda','Pilot',NULL),(15,'Blue',NULL,2007,'zs123pl','Ford','Focus',NULL),(16,'123',NULL,1234,'bbbb','Toyota','RAV4',NULL),(17,'Bia≈Ça',NULL,2001,'zs672bgc','Audi','A3',NULL),(18,'34',NULL,4234,'423423','Toyota','Corolla',NULL),(19,'Black',NULL,1999,'asdgdd','Toyota','Camry',NULL),(20,'User3',NULL,1234,'user3','Toyota','RAV4',NULL),(21,'Fdfsdf',NULL,3242,'user3car','Honda','Pilot',NULL),(22,'Dsfd',NULL,1234,'user3carte','Honda','Type-R',3),(23,'Fdef',NULL,1233,'zsdas123','Ford','Bronco',3),(24,'123412',NULL,1231,'useertest','Honda','Pilot',3),(25,'Black',NULL,9999,'newcar1','Honda','Pilot',5),(26,'Black',NULL,1234,'newcar2','Honda','Pilot',5),(27,'213123',NULL,1231,'newcar3','Ford','Bronco',5),(28,'Fefsdf',NULL,1234,'usercar100','Honda','Type-R',5),(29,'123',NULL,3333,'user10car','Toyota','RAV4',5),(30,'Sss',NULL,7987,'hkjhij','Honda','CR-V',3),(31,'Black',NULL,1234,'nowycar1','Honda','CR-V',3),(32,'Blue',NULL,2014,'zs123rm','Honda','Type-R',5),(33,'Dsadasd',NULL,3424,'sdasdasd','Toyota','Corolla',3),(34,'312312','A5',3213,'fdfsdfs','Ford','Mustang',3),(35,'Blu','A1',1231,'aaaaaaaa1','Audi','Q3',3),(36,'Fdsf',NULL,3423,'zs672rms','Ford','Focus',3),(37,'Red',NULL,3232,'zs1111','Honda','Pilot',3),(38,'123',NULL,1234,'abcd','Ford','Kuga',3),(39,'2323321',NULL,1231,'dfsdfds','Ford','Bronco',5),(40,'BlacK',NULL,2014,'Z1ESSA','Toyota','Corolla',8),(41,'Black',NULL,2024,'django','Ford','Mustang',9),(42,'Abbb',NULL,2321,'zs672rmd','Ford','Mustang',11),(43,'Abcd',NULL,1234,'dupa1','Ford','Bronco',11),(44,'23121',NULL,1231,'abvc','Honda','CR-V',11),(45,'Sdasda',NULL,1111,'abcdddd','Honda','Civic',11),(46,'Cxzczx',NULL,2312,'xczxczx','Toyota','Corolla',11),(47,'Gdfgfgdg','A6',3123,'gfgdfgdfgd','Ford','Focus',3),(48,'Dsadasdasd','A7',2323,'dsadasdasd','Ford','Mustang',3),(49,'Brown','A3',2001,'zs546nm','Ford','Kuga',12),(50,'Black',NULL,1996,'zs673rm','Ford','Mustang',11),(51,'White',NULL,1996,'zde3223','Honda','CRV',11);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking_spot`
--

DROP TABLE IF EXISTS `parking_spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parking_spot` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_start_date` datetime(6) DEFAULT NULL,
  `floor` int NOT NULL,
  `number` varchar(255) DEFAULT NULL,
  `registration_number` varchar(255) DEFAULT NULL,
  `taken` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ddkcoasv7qswat6xi9gqutyx3` (`number`),
  UNIQUE KEY `UK_214gd5sg91og3q62bmg4kg694` (`registration_number`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_spot`
--

LOCK TABLES `parking_spot` WRITE;
/*!40000 ALTER TABLE `parking_spot` DISABLE KEYS */;
INSERT INTO `parking_spot` VALUES (1,'2024-08-06 17:06:15.346000',1,'A1','aaaaaaaa1',_binary ''),(2,NULL,1,'A2',NULL,_binary '\0'),(3,'2024-07-21 15:18:15.382000',1,'A3','zs546nm',_binary ''),(4,NULL,1,'A4',NULL,_binary '\0'),(5,'2024-07-21 11:19:20.840000',1,'A5','fdfsdfs',_binary ''),(6,'2024-07-21 11:19:22.862000',1,'A6','gfgdfgdfgd',_binary ''),(7,'2024-07-21 11:19:25.876000',1,'A7','dsadasdasd',_binary ''),(8,NULL,1,'A8',NULL,_binary '\0'),(9,NULL,1,'A9',NULL,_binary '\0'),(10,NULL,1,'A10',NULL,_binary '\0'),(11,NULL,2,'B1',NULL,_binary '\0'),(12,NULL,2,'B2',NULL,_binary '\0'),(13,NULL,2,'B3',NULL,_binary '\0'),(14,NULL,2,'B4',NULL,_binary '\0'),(15,NULL,2,'B5',NULL,_binary '\0'),(16,NULL,2,'B6',NULL,_binary '\0'),(17,NULL,2,'B7',NULL,_binary '\0'),(18,NULL,2,'B8',NULL,_binary '\0'),(19,NULL,2,'B9',NULL,_binary '\0'),(20,NULL,2,'B10',NULL,_binary '\0'),(21,NULL,3,'C1',NULL,_binary '\0'),(22,NULL,3,'C2',NULL,_binary '\0'),(23,NULL,3,'C3',NULL,_binary '\0'),(24,NULL,3,'C4',NULL,_binary '\0'),(25,NULL,3,'C5',NULL,_binary '\0'),(26,NULL,3,'C6',NULL,_binary '\0'),(27,NULL,3,'C7',NULL,_binary '\0'),(28,NULL,3,'C8',NULL,_binary '\0'),(29,NULL,3,'C9',NULL,_binary '\0'),(30,NULL,3,'C10',NULL,_binary '\0');
/*!40000 ALTER TABLE `parking_spot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `roles` varbinary(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `member_since` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'$2a$10$9KtNGkgqDJn.P6ErP4ZXt.VHjqGjzZfmGh59GNquxXlhCNiXf5n4O','user1',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx',NULL,NULL),(2,'user@gmail.com','$2a$10$mcaq.FasJgoQJxjc9sECh.EZb.YIotCiq0uKG2cZzsrypbXsPikZ2','user2',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx',NULL,NULL),(3,'user3@gmail.com','$2a$10$Arx0wVgPRpZcB/G4vdlbYeZfxTCg6CIlzGSTPQvLjKmJ/Xmw7N5Tu','user3',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx',NULL,NULL),(4,'user0@gmail.com','$2a$10$kQX20F8yGFU0a.2my8rQx.WphYJshmRtlThgyDbua.oekgFEP0XWO','user0',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx',NULL,NULL),(5,'user10@gmail.com','$2a$10$x3kQKjwY9FjseaQ2DTcttumCrHeSjVtCwVwfy4DBpw.R.yttn4bZ2','user10',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx',NULL,NULL),(6,'user12@gmail.com','$2a$10$ltD0lL4R8a0XGFiXdSrPQeA2MxeA6cyQS9aDm1tn2rfr92gaJWBCK','user12',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx','Damian Saweraaa',NULL),(7,'fdsfsdf@wp.pl','$2a$10$JA5MjzZ/sFuDB0Hi53RFnunpm55RVO0lmG1HLY.UqSLwTFHaBlOrC','user12312312',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx','Liwia Zygmunt',NULL),(8,'liwiaz1@wp.pl','$2a$10$S/n0imFnjGoZZnxl4bgJ3uPaDAJ6t6llAnsM7Ai7cXXHGJsf6eDx6','liwiaz1',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx','Liwia Zygmunt',NULL),(9,'damian.sawera@g.com','$2a$10$BNnOBd2fcq0zzGtlwD6MPO/RqJU2r.DTK/ZZG0ogslbCYl.biv/aK','dsawera',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx','Damian Sawera','2024-07-20 21:15:41.791000'),(10,'dupa@gmail.com','$2a$10$QRvL2u1pKNDcRozBoEehD.4PtSLi0bLhYTBq1pqwvebfqeO2Mj3gO','dupa',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx','Damian Stonoga','2024-07-20 23:42:34.517000'),(11,'dupa1@gmail.com','$2a$10$ECDHgttK3pm3MF/1b9iOGOO.uQaVfZ/.DcvVm1Y5VYjXUvR3MGJku','dupa1',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx','Damian Stonoga','2024-07-20 23:57:07.001000'),(12,'liwiaz1@o2.pl','$2a$10$SK/RBzebKsGeyq3jqoxdQOjELnAPFOqbd4ykdR52hd8DBL1ESA.9e','liwiaa538',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx','Liwia Zygmunt','2024-07-21 15:13:53.192000'),(13,'gowienko123@gmail.com','$2a$10$Lr8GrUyWNe/vJf4Pa6NIoeHMsK/X3FLBCH0zd.2Zjd2Qz9G0xfA1C','gowienko123',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0~r\0\Zproject.parking.enums.Role\0\0\0\0\0\0\0\0\0\0xr\0java.lang.Enum\0\0\0\0\0\0\0\0\0\0xpt\0USERx','Liwia Zygmunt','2024-07-31 13:58:12.520000');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `balance` float NOT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_hgee4p1hiwadqinr0avxlq4eb` (`user_id`),
  CONSTRAINT `FKbs4ogwiknsup4rpw8d47qw9dx` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (1,0,'PLN',NULL),(2,101.01,'PLN',11),(3,78.53,'PLN',12),(4,0,'PLN',13);
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-12 18:45:14
