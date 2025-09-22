SELECT 
    r.id AS room_id,
    r.name AS room_name,
    cs.day_of_week,
    cs.start_time,
    cs.end_time
FROM room r
JOIN class_schedule cs ON cs.room_id = r.id
ORDER BY r.name, cs.day_of_week, cs.start_time;