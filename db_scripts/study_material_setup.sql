CREATE SCHEMA IF NOT EXISTS `study_app`;
USE `study_app`;
-- Table to store study materials 
CREATE TABLE IF NOT EXISTS `study_material` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `name` VARCHAR(50),
    `description` VARCHAR(250),
    PRIMARY KEY (`id`)
);
-- Table to store tags without duplication
CREATE TABLE IF NOT EXISTS `study_material_tags` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(50) UNIQUE, 
    PRIMARY KEY (`id`)
);
-- Table to map tags to study materials 
CREATE TABLE IF NOT EXISTS `study_material_tag_mapping` (
    `study_material_id` INT, 
    `tag_id` INT,
    PRIMARY KEY (study_material_id, tag_id), -- Composite primary key of the tag id and study material id
    FOREIGN KEY (study_material_id) REFERENCES `study_material`(`id`),
    FOREIGN KEY (tag_id) REFERENCES `study_material_tags`(`id`)
);
-- Join table for the M:M relationship between users and study materials
CREATE TABLE IF NOT EXISTS `user_study_material_join` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `study_material_id` INT NOT NULL, 
	PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES `users`(`id`),
    FOREIGN KEY (study_material_id) REFERENCES `study_material`(`id`)
);
-- Table to store flashcard information
CREATE TABLE IF NOT EXISTS `flashcards` ( 
	`id` INT NOT NULL AUTO_INCREMENT, 
    `question` VARCHAR(50) NOT NULL,
    `answer` VARCHAR(250) NOT NULL,
    PRIMARY KEY(id)
);
-- Joint table between flashcards and study material
CREATE TABLE IF NOT EXISTS `study_material_flashcards_join` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `flashcard_id` INT NOT NULL, 
    `study_material_id` INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (flashcard_id) REFERENCES `flashcards`(`id`),
    FOREIGN KEY (study_material_id) REFERENCES `study_material`(`id`)
);

-- stored procedure to insert a study material with tags, does not use a join table to avoid duplicate tags
DELIMITER $$
CREATE PROCEDURE insert_study_material(
    IN user_id INT, -- id of the user from the user table
    IN sm_name VARCHAR(50), -- the study material name
    IN sm_description VARCHAR(250), -- study material description
    IN sm_tags JSON -- JSON of study material tags
)
BEGIN
    DECLARE study_material_id INT;
    DECLARE tag_id INT;
    DECLARE tag_name VARCHAR(50);
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR 
        SELECT json_unquote(json_extract(sm_tags, CONCAT('$[', idx - 1, ']')))
        FROM json_table(sm_tags, "$[*]" COLUMNS (idx FOR ORDINALITY)) AS jt;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Insert the study material
    INSERT INTO study_material (user_id, name, description) 
    VALUES (user_id, sm_name, sm_description);

    -- Get the last inserted study material ID
    SET study_material_id = LAST_INSERT_ID();

    -- Open the cursor to process tags
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO tag_name;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Ensure the tag_name is not NULL or empty
        IF tag_name IS NOT NULL AND LENGTH(tag_name) > 0 THEN
            -- Check if the tag exists and get its ID
            SET tag_id = (SELECT id FROM study_material_tags WHERE tag = tag_name LIMIT 1);

            -- If the tag does not exist, insert it and get the new ID
            IF tag_id IS NULL THEN
                INSERT INTO study_material_tags (tag)
                VALUES (tag_name);
                SET tag_id = LAST_INSERT_ID();
            END IF;

            -- Insert the mapping
            INSERT IGNORE INTO study_material_tag_mapping (study_material_id, tag_id)
            VALUES (study_material_id, tag_id);
        END IF;
    END LOOP;
    
    CLOSE cur;
END $$
DELIMITER ;