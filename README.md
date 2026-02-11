### Cool SQL Stuff


```
-- updates the total_words_written property on projects when wordcount is updated
CREATE OR REPLACE FUNCTION update_total_words_written()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Adding new words
        UPDATE projects
        SET total_words_written = total_words_written + NEW.word_count
        WHERE id = NEW.project_id;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Updating existing words
        UPDATE projects
        SET total_words_written = total_words_written - OLD.word_count + NEW.word_count
        WHERE id = OLD.project_id;
    ELSIF TG_OP = 'DELETE' THEN
        -- Removing words
        UPDATE projects
        SET total_words_written = total_words_written - OLD.word_count
        WHERE id = OLD.project_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

```


```
-- triggers the update_total_words_written function on insert/update/delete
CREATE TRIGGER words_insert_trigger
AFTER INSERT ON words
FOR EACH ROW EXECUTE FUNCTION update_total_words_written();

CREATE TRIGGER words_update_trigger
AFTER UPDATE ON words
FOR EACH ROW EXECUTE FUNCTION update_total_words_written();

CREATE TRIGGER words_delete_trigger
AFTER DELETE ON words
FOR EACH ROW EXECUTE FUNCTION update_total_words_written();
```