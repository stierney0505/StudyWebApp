    package com.example.server.data.dto.studymaterials;

    import com.example.server.data.entities.Flashcard;
    import com.example.server.data.entities.StudyMaterial;
    import com.example.server.data.entities.User;
    import com.fasterxml.jackson.annotation.JsonIgnore;

    import java.util.*;

    public class StudyMaterialDTO {
        Integer id;
        int owner_id;
        String name;
        String description;
        FlashcardDTO[] flashcards;

        public StudyMaterialDTO(StudyMaterial studyMaterial) {
            this.id = studyMaterial.getId();
            this.name = studyMaterial.getName();
            this.description = studyMaterial.getDescription();
            this.owner_id = studyMaterial.getUserId();

            if(studyMaterial.getFlashcards() != null && !studyMaterial.getFlashcards().isEmpty()) {
                List<Flashcard> studyMaterials = new ArrayList<>(studyMaterial.getFlashcards());
                this.flashcards = new FlashcardDTO[studyMaterials.size()];
                for (int i = 0; i < studyMaterials.size(); i++) {
                    this.flashcards[i] = new FlashcardDTO(studyMaterials.get(i));
                }
            }
        }

        public StudyMaterialDTO() {}

        // Creates a set of StudyMaterialDTOs from a user.
        public static Set<StudyMaterialDTO> createSetStudyMaterialDTO(User user) {
            Set<StudyMaterialDTO> studyMaterialDTOS = new HashSet<StudyMaterialDTO>();
            for (StudyMaterial studyMaterial : user.getStudyMaterials()) { studyMaterialDTOS.add(new StudyMaterialDTO(studyMaterial)); }
            return studyMaterialDTOS;
        }

        // Create a set of StudyMaterialDTOs that only contain title and id (for when the flashcard data is not required)
        public static Set<StudyMaterialInfoDTO> createBriefStudyMaterialInfoDTO(User user) {
            Set<StudyMaterialInfoDTO> studyMaterialDTOS = new HashSet<StudyMaterialInfoDTO>();
            for (StudyMaterial studyMaterial : user.getStudyMaterials()) { studyMaterialDTOS.add(new StudyMaterialInfoDTO(studyMaterial)); }
            return studyMaterialDTOS;
        }

        public int getId() {return id;}

        public void setId(int id) {this.id = id;}

        public int getOwner_id() {return owner_id;}

        public void setOwner_id(int owner_id) {this.owner_id = owner_id;}

        public String getName() {return name;}

        public void setName(String name) {this.name = name;}

        public void setId(Integer id) {this.id = id;}

        public String getDescription() {return description;}

        public void setDescription(String description) {this.description = description;}

        public FlashcardDTO[] getFlashcards() {return flashcards;}

        public void setFlashcards(FlashcardDTO[] flashcards) {this.flashcards = flashcards;}

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof StudyMaterialDTO studyMaterialDTO)) return false;
            return Objects.equals(this.id, studyMaterialDTO.id);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id);
        }
    }
