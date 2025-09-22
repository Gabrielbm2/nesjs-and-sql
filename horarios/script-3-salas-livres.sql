WITH horarios_ocupados AS (
    SELECT 
        r.id AS room_id,
        cs.day_of_week,
        cs.start_time,
        cs.end_time
    FROM room r
    JOIN class_schedule cs ON cs.room_id = r.id
)
SELECT 
    r.id AS room_id,
    r.name AS room_name,
    dow.day_of_week,
    h.start_time,
    h.end_time
FROM room r
CROSS JOIN (
    VALUES 
        (1, '08:00'::time, '18:00'::time),
        (2, '08:00'::time, '18:00'::time),
        (3, '08:00'::time, '18:00'::time),
        (4, '08:00'::time, '18:00'::time),
        (5, '08:00'::time, '18:00'::time)
) AS dow(day_of_week, start_time, end_time)
LEFT JOIN horarios_ocupados h 
    ON h.room_id = r.id AND h.day_of_week = dow.day_of_week
WHERE h.room_id IS NULL
ORDER BY r.name, dow.day_of_week;
