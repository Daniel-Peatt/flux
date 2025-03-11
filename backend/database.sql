CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    intentions TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE challenge_tasks (
    id SERIAL PRIMARY KEY,
    challenge_id INT NOT NULL,
    task TEXT NOT NULL,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);