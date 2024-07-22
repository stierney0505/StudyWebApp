drop schema if exists `study_app`;
create SCHEMA `study_app`;
use `study_app`;

create table `security` ( 
	`id` int NOT NULL AUTO_INCREMENT,
	`email_expiry` timestamp(0) DEFAULT NULL,
    `password_expiry` timestamp(0) DEFAULT NULL,
    `email_key` varchar(36) DEFAULT NULL,
    `password_key` varchar(36) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB auto_increment=1 default charset=latin1;

create table `users` (
	`id` int NOT NULL AUTO_INCREMENT,
    `first_name` varchar(30) NOT NULL,
    `last_name` varchar(30) NOT NULL,
    `email` varchar(70) NOT NULL,
    `password` varchar(68) NOT NULL,
    `security_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_SECURITY_idx` (`security_id`),
    UNIQUE KEY `unique_email` (`email`),
    CONSTRAINT `FK_SECURITY` FOREIGN KEY (`security_id`) REFERENCES `security` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB auto_increment=1 default charset=latin1;


