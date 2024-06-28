-- Drop the view if it already exists
DROP VIEW IF EXISTS need_meeting;

-- Create the view
CREATE VIEW need_meeting AS
    SELECT name
    FROM students
    WHERE score < 80
      AND (last_meeting IS NULL OR last_meeting < SUBDATE(CURRENT_DATE(), INTERVAL 1 MONTH));