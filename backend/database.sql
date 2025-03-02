CREATE TABLE user_data (
	challenge_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	active_challenge BOOLEAN DEFAULT FALSE,
	title VARCHAR(100) NOT NULL, 
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);