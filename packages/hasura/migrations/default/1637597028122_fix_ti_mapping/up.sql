UPDATE mesures m SET ti_id = (SELECT COALESCE(t.actual_tribunal_id, t.id) FROM tis t WHERE t.id=m.ti_id);
