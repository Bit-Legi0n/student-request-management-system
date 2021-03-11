-- table: users
INSERT INTO `srms`.`users` (`id`, `name`, `password`, `type`)
VALUES (
        "190111B",
        "Nimantha Cooray",
        "$2b$10$r4EmR9Mg4jR/PZWvfk8Dw.1amKo9ucE4T812cpMocVTsz6sdkfwVe", -- nimantha123
        "Student"
    ),
    (
        "190349K",
        "Nethum Lamahewage",
        "$2b$10$y86P9aVfyWlg4UB8gcy1Q.VHVbG00O.D82BBpKD23SoH7BBN31foi", -- nethum123
        "Staff"
    ),
    (
        "190093T",
        "Bimsara Bodaragama",
        "$2b$10$Pgaq/qIordM1i7GQZPLasenuaEKJcO4DdioTd8fXnHIaphc/aGig.", -- bimsara123
        "Staff"
    ),
    (
        "190478E",
        "Dilusha Madushan",
        "$2b$10$gHB.xIMVEJ9tBo8RFSfd7eIy6CoeQWJ6EJ/7YpkrgKpbQyLkt/1ga", -- dilusha123
        "Student"
    ),
    (
        "190564N",
        "Nirmal Sankalana",
        "$2b$10$lDEh6keI4Wca2t7WRn.bmusfO7VmoDdQsU6e3w1toNrVvpMO5MeDi", -- nirmal123
        "Student"
    );


-- table: requests
INSERT INTO `srms`.`requests` (
        `id`,
        `student_id`,
        `staff_id`,
        `datetime`,
        `status`,
        `type`,
        `body`
    )
VALUES (
        "43105633-0002-47f9-b8b9-1310ee4c5c14",
        "190111B",
        "190349K",
        now(),
        "pending",
        "ADD/DROP",
        "Dear Madam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    ),
    (
        "9a8de617-c9c6-40dc-b222-47b4064d0ca3",
        "190478E",
        "190093T",
        now(),
        "approved",
        "OTHER",
        "Dear Sir, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    ),
    (
        "87c475f6-10b5-43b1-8358-454f1c07cc71",
        "190564N",
        "190093T",
        now(),
        "rejected",
        "OTHER",
        "Dear Sir, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    );


-- table: replies
INSERT INTO `srms`.`replies` (`id`, `req_id`, `user_id`, `datetime`, `body`)
VALUES (
        "ca107b45-c909-4a35-b650-bff0d719acef",
        "43105633-0002-47f9-b8b9-1310ee4c5c14",
        "190349K",
        now(),
        "Dear Student, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    ),
    (
        "009695b9-5dc5-4a8c-9abd-37d93d0661c4",
        "87c475f6-10b5-43b1-8358-454f1c07cc71",
        "190093T",
        now(),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    ),
    (
        "ee515140-d7b5-4bd0-ad86-97c05e68f182",
        "87c475f6-10b5-43b1-8358-454f1c07cc71",
        "190564N",
        now(),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    ),
    (
        "b316c063-4c63-48ed-a46e-0ab7e0d5b763",
        "9a8de617-c9c6-40dc-b222-47b4064d0ca3",
        "190093T",
        now(),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    ),
    (
        "d2695357-32b7-4817-98e6-ed88b4695222",
        "9a8de617-c9c6-40dc-b222-47b4064d0ca3",
        "190478E",
        now(),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    );