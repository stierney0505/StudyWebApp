SELECT smt.tag
FROM study_material_tags smt
JOIN study_material_tag_mapping smtm
ON smt.id = smtm.tag_id
WHERE smtm.study_material_id = <ID>;
