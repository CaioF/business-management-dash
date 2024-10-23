UPDATE businesses SET contacted_at = NULL, contacted_by = NULL;

UPDATE businesses SET contacted_at = '2024-01-01 00:00:00'::TIMESTAMP, contacted_by = 1 WHERE id = 1;