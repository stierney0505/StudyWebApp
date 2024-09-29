package com.example.server.data.dto.studymaterials;

import com.example.server.data.entities.StudyMaterial;

public class StudyMaterialInfoDTO {
    String title;
    int id;

    public StudyMaterialInfoDTO(StudyMaterial studyMaterial) {
        this.title = studyMaterial.getName();
        this.id = studyMaterial.getId();
    }

    public String getTitle() {return title;}

    public void setTitle(String title) {this.title = title;}

    public int getId() {return id;}

    public void setId(int id) {this.id = id;}
}
