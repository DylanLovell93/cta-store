\c cta_dev;

INSERT INTO test (name) VALUES
('Monday'),
('Tuesday'),
('Wednesday'),
('Thursday'),
('Friday'),
('Saturday'),
('Sunday');

INSERT INTO users (username, password, admin) VALUES
(
    'admin',
    '$2b$10$cBoLw2Z4vqlDkbsigZapKu8X.KhcV/onZdkuj9rZEGrguoyCSGSl.',
    true
);

INSERT INTO products (name, image, description, price, rating, featured) VALUES
(
    'Test Item 1',
    '',
    'Test Description 1',
    100,
    5,
    true
),
(
    'Test Item 2',
    '',
    'Test Description 2',
    33,
    2,
    false
),
(
    'Test Item 3',
    '',
    'Test Description 3',
    200,
    1,
    true
),
(
    'Test Item 4',
    '',
    'Test Description 4',
    300,
    3,
    false
),
(
    'Test Item 5',
    '',
    'Test Description 5',
    1000,
    4,
    true
);
