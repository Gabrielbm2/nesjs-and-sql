SELECT 
    p.id AS professor_id,
    p.name AS professor_name,
    SUM(EXTRACT(EPOCH FROM (cs.end_time - cs.start_time)) / 3600) AS total_hours
FROM professor p
JOIN subject s ON s.id = p.id
JOIN class c ON c.subject_id = s.id
JOIN class_schedule cs ON cs.class_id = c.id
GROUP BY p.id, p.name
ORDER BY total_hours DESC;