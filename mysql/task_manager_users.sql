-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: task_manager
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser','test@example.com','$2b$10$CHKfn7/kjznWYSCl4zCrpeoKUFenMY.jLY/USXGYuNCAM6enBqCYq','user','2025-09-03 17:04:42'),(2,'admin1','admin@example.com','$2b$10$5V9uXFHPdO9Y.TmKZd3O5.0THjQh2TU37VBvzlGdt4ibHpeNEThYi','admin','2025-09-03 18:17:20'),(3,'john_doe','john@example.com','$2b$10$Lm2b7SvZqYeXm6nfGIMnxuo.zt7UgvHwrtzCTYTUp0wVWII8aok.y','user','2025-09-04 20:44:06'),(4,'user2','user2@example.com','$2b$10$au9AcgWDasBo9adlq5pq/.gLcptkpTxEK3GO9kfQobdf99JM3IXnS','user','2025-09-04 20:56:08'),(5,'admin2','admin2@example.com','$2b$10$4NTCZ0KzXn7jppnvejmOmenaj8VoCqblp134Ndwr8MsQznvuPrPVa','admin','2025-09-04 20:56:36'),(6,'user3','user3@example.com','$2b$10$18oCOlaOTbG.3jfQ.BM3v.lXfjiLCT0EnH6dntCOSQcS.b1xmyDP.','user','2025-09-04 21:08:51'),(7,'admin3','admin3@example.com','$2b$10$4zRkWMW3ZAU/whWJstd0T.jNEOsfO5F.XaLNobgIt6dmVIqeCglVW','admin','2025-09-04 21:14:31'),(8,'user4','user4@example.com','$2b$10$Qe6wkScMji6aiRREcKnBdu13qfN8LcQoCT3ZBLgQZJEoET9VBl7Ne','user','2025-09-04 21:39:50'),(9,'admin4','admin4@example.com','$2b$10$hrfWK447iuf8QBI6WX3f/eMwTE5qQZesZbIgBuxw.pioeeHaNUioC','admin','2025-09-04 21:41:20'),(10,'admin5','admin5@example.com','$2b$10$HP14GG.cvO6n1rPQVZyTled1ImXngVhQ0Ed9xd5hCVhI.eTtdnvDu','admin','2025-09-04 21:47:32'),(11,'maria','maria@example.com','$2b$10$X.aEIYCShdzIXNEa5dkP/OvZYlTwdUy/nDH0Ol5uENleY9S0C12pi','user','2025-09-07 13:24:53'),(12,'admin9','admin9@example.com','$2b$10$nXt3FS2ZZVfItQpw7YkhkuKYghGHv/9jsJMX9pbGbNmALIKekdqye','admin','2025-09-07 13:26:11'),(13,'tasnia2','tasnia@example.com','$2b$10$XE.UWSUkb/lwEBgsNNOFo.2vt/SWh23IgKzXWVx70jhH5NQM/Q4c2','user','2025-09-08 14:43:47'),(14,'admin8','admin8@example.com','$2b$10$gW4xlbpHRloKcfTc/OmC8uZ5rtvPQM4i9M1y735K7yg4LYuBBVbz6','admin','2025-09-08 14:53:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-09 21:49:33
